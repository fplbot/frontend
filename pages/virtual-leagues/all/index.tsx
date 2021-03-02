import { NextPage } from "next";
import VirtualLeaguePageContent from "../../../components/virtual-leagues/VirtualLeaguePageContent";
import { getVerifiedEntries, GetVerifiedEntriesResponse } from "../../../services/verified";

interface AllVerifiedPageProps {
  res: GetVerifiedEntriesResponse
}

const AllVerifiedPage: NextPage<AllVerifiedPageProps> = ({ res }) => {
  if (res.type === "SUCCESS")
    return <VirtualLeaguePageContent
      title="All verified accounts"
      description="This virtual league contains all verified accounts"
      verifiedEntries={res.data}
      relUrl="all" />

  return (
    <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
      Looks like something went wrong 🤕
    </p>
  )
};

AllVerifiedPage.getInitialProps = async () => {
  var allEntriesRes = await getVerifiedEntries("all");
  return {
    res: allEntriesRes
  }
};

export default AllVerifiedPage;