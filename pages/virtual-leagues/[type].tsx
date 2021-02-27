import { NextPageContext } from "next";
import VerifiedPage from "../../components/virtual-leagues/VerifiedPage";
import { getVerifiedHelpText } from "../../services/getVerifiedHelpText";
import { getVerifiedEntries as getVirtualLeagues, GetVerifiedEntriesResponse } from "../../services/verified";
import { toVerifiedType, VerifiedType } from "../../services/VerifiedType";

const Page = ({ res, verifiedType }: PageProps) => {
  if (res.type === "SUCCESS")
    return <VerifiedPage
      title={verifiedType}
      description={getVerifiedHelpText(verifiedType)}
      verifiedEntries={res.data}
      relUrl={verifiedType} />

  return <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
    Looks like something went wrong 🤕
          </p>

};

interface PageProps {
  res: GetVerifiedEntriesResponse,
  verifiedType: VerifiedType
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const verifiedType = toVerifiedType(ctx.query.type as string)
  var res = await getVirtualLeagues(verifiedType);
  return {
    res: res,
    verifiedType: verifiedType
  }
};

export default Page;