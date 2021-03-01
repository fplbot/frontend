import { NextPage, NextPageContext } from "next";
import VirtualLeaguePageContent from "../../components/virtual-leagues/VirtualLeaguePageContent";
import {
  getVerifiedEntries as getVirtualLeagues,
  GetVerifiedEntriesResponse,
} from "../../services/verified";
import { toVerifiedType, VerifiedType } from "../../services/VerifiedType";
import { getVerifiedExtraInformation } from "../../utils/verifiedTypeHelper";

interface PageProps {
  res: GetVerifiedEntriesResponse;
  verifiedType: VerifiedType;
}

const VirtualLeaguePage: NextPage<PageProps> = ({ res, verifiedType }) => {
  if (res.type === "SUCCESS") {

    const verifiedTypeInfo = getVerifiedExtraInformation(verifiedType);

    return (
      <VirtualLeaguePageContent
        title={verifiedTypeInfo.title}
        description={verifiedTypeInfo.description}
        verifiedEntries={res.data}
        relUrl={verifiedType}
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
  var res = await getVirtualLeagues(verifiedType);
  return {
    res: res,
    verifiedType: verifiedType,
  };
};

export default VirtualLeaguePage;
