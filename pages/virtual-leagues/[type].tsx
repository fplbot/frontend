import { NextPage, NextPageContext } from "next";
import VirtualLeaguePageContent from "../../components/virtual-leagues/VirtualLeaguePageContent";
import { getVerifiedHelpText } from "../../services/getVerifiedHelpText";
import {
  getVerifiedEntries as getVirtualLeagues,
  GetVerifiedEntriesResponse,
} from "../../services/verified";
import { toVerifiedType, VerifiedType } from "../../services/VerifiedType";

interface PageProps {
  res: GetVerifiedEntriesResponse;
  verifiedType: VerifiedType;
}

const VirtualLeaguePage: NextPage<PageProps> = ({ res, verifiedType }) => {
  if (res.type === "SUCCESS")
    return (
      <VirtualLeaguePageContent
        title={verifiedType}
        description={getVerifiedHelpText(verifiedType)}
        verifiedEntries={res.data}
        relUrl={verifiedType}
      />
    );

  return (
    <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
      Looks like something went wrong 🤕
    </p>
  );
};

VirtualLeaguePage.getInitialProps = async (ctx: NextPageContext) => {
  const verifiedType = toVerifiedType(ctx.query.type as string);
  var res = await getVirtualLeagues(verifiedType);
  return {
    res: res,
    verifiedType: verifiedType,
  };
};

export default VirtualLeaguePage;
