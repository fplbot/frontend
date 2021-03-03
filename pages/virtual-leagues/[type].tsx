import { NextPage, NextPageContext } from "next";
import VirtualLeaguePageContent from "../../components/virtual-leagues/VirtualLeaguePageContent";
import { getVerifiedEntries, VerifiedEntry, GetVerifiedEntriesError} from "../../services/verified";
import { toVerifiedType, VerifiedType } from "../../services/VerifiedType";
import { getVerifiedExtraInformation } from "../../utils/verifiedTypeHelper";

interface VerifiedEntriesSucces {
  type: 'SUCCESS';
  verifiedType: VerifiedType;
  data: VerifiedEntry[];
}

interface IllegalVerifiedType {
  type: "ILLEGAL_VERIFIED_TYPE";
  illegalVerifiedType: string;
};

type VirtualLeaguePageProps = VerifiedEntriesSucces | IllegalVerifiedType | GetVerifiedEntriesError;

const VirtualLeaguePage: NextPage<VirtualLeaguePageProps> = props => {

  if (props.type === 'ILLEGAL_VERIFIED_TYPE') {
    return (
      <p className="pb-16 text-lg∆ md:text-xl text-fpl-purple text-center">
        The virtual league {props.illegalVerifiedType} does not exist 🤷‍♂️
      </p>
    );
  }

  if (props.type === "SUCCESS") {

    const verifiedTypeInfo = getVerifiedExtraInformation(props.verifiedType);

    return (
      <VirtualLeaguePageContent
        title={verifiedTypeInfo.title}
        description={verifiedTypeInfo.description}
        verifiedEntries={props.data}
        relUrl={props.verifiedType}
      />
    );
  }

  return (
    <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
      Looks like something went wrong 🤕
    </p>
  );
};

VirtualLeaguePage.getInitialProps = async (ctx: NextPageContext) => {
  const verifiedType = toVerifiedType(ctx.query.type as string);

  if (verifiedType === null) {
    return {
      type: 'ILLEGAL_VERIFIED_TYPE',
      illegalVerifiedType: ctx.query.type as string,
    }
  }

  const res = await getVerifiedEntries(verifiedType);

  if (res.type === 'SUCCESS') {
    return {
      type: 'SUCCESS',
      data: res.data,
      verifiedType: verifiedType
    }
  }

  return {
    type: 'ERROR',
  }
};

export default VirtualLeaguePage;
