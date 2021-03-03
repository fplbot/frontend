import { NextPage, NextPageContext } from "next";
import VirtualLeaguePageContent from "../../components/virtual-leagues/VirtualLeaguePageContent";
import { getVerifiedEntries, GetVerifiedEntriesError, VerifiedEntry } from "../../services/verified";
import { toVerifiedType, VerifiedType } from "../../services/VerifiedType";
import { getVerifiedExtraInformation } from "../../utils/verifiedTypeHelper";

interface LegalVerifiedType  {
  data: VerifiedEntry[],
  verifiedType: VerifiedType
  type: "LEGALVERIFIEDTYPE"
};

interface IllegalVerifiedType {
  illegalVerifiedType: string,
  type: "ILLEGALVERIFIEDTYPE"
};

type VirtualLeaguePageProps = LegalVerifiedType | IllegalVerifiedType | GetVerifiedEntriesError;

const VirtualLeaguePage: NextPage<VirtualLeaguePageProps> = props => {
  if (props.type === "LEGALVERIFIEDTYPE") {

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

  if (props.type === "ILLEGALVERIFIEDTYPE") {
    return (
      <p className="pb-16 text-lg∆ md:text-xl text-fpl-purple text-center">
        The virtual league {props.illegalVerifiedType} does not exist 🤷‍♂️
      </p>
    )
  }

  return (
    <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
      Looks like something went wrong 🤕
    </p>
  );
};

VirtualLeaguePage.getInitialProps = async (ctx: NextPageContext) => {

  const verifiedType =  toVerifiedType(ctx.query.type as string);

  if(verifiedType == null){

    if (ctx.res)
      ctx.res.statusCode = 404;

    return {
      illegalVerifiedType: ctx.query.type as string,
      type: 'ILLEGALVERIFIEDTYPE'
    }
  }

  const res = await getVerifiedEntries(verifiedType);
  if(res.type == "SUCCESS"){
    return {
      data: res.data,
      verifiedType: verifiedType,
      type: "LEGALVERIFIEDTYPE"
    }
  }
  return res;
};

export default VirtualLeaguePage;
