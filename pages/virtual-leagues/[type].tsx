import { NextPage, NextPageContext } from "next";
import VirtualLeaguePageContent from "../../components/virtual-leagues/VirtualLeaguePageContent";
import { getVerifiedEntries, GetVerifiedEntriesResponse, } from "../../services/verified";
import { toVerifiedType, VerifiedType } from "../../services/VerifiedType";
import { getVerifiedExtraInformation } from "../../utils/verifiedTypeHelper";

type LegalVerifiedType = {
  res: GetVerifiedEntriesResponse;
  verifiedType: VerifiedType
  type: "LEGALVERIFIEDTYPE"
};

type IllegalVerifiedType = {
  illegalVerifiedType: string,
  type: "ILLEGALVERIFIEDTYPE"
};

type VirtualLeaguePageProps = LegalVerifiedType | IllegalVerifiedType;

const VirtualLeaguePage: NextPage<VirtualLeaguePageProps> = props => {
  if (props.type === "LEGALVERIFIEDTYPE" && props.res.type == "SUCCESS") {

    const verifiedTypeInfo = getVerifiedExtraInformation(props.verifiedType);

    return (
      <VirtualLeaguePageContent
        title={verifiedTypeInfo.title}
        description={verifiedTypeInfo.description}
        verifiedEntries={props.res.data}
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
  let verifiedType: VerifiedType = 'Unknown';

  try {
    verifiedType = toVerifiedType(ctx.query.type as string);
  } catch {

    if (ctx.res)
      ctx.res.statusCode = 404;

    return {
      illegalVerifiedType: ctx.query.type as string,
      type: 'ILLEGALVERIFIEDTYPE'
    }
  }

  var res = await getVerifiedEntries(verifiedType);
  return {
    res: res,
    verifiedType: verifiedType,
    type: "LEGALVERIFIEDTYPE"
  };
};

export default VirtualLeaguePage;
