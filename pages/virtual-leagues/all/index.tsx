import VerifiedPage from "../../../components/virtual-leagues/VerifiedPage";
import { getVerifiedEntries, GetVerifiedEntriesResponse } from "../../../services/verified";
import { VerifiedType } from "../../../services/VerifiedType";

const Page = (verifiedEntriesResponse:GetVerifiedEntriesResponse) => {
  if(verifiedEntriesResponse.type === "SUCCESS")
    return <VerifiedPage 
        title="All verified accounts"
        description="This virtual league contains all verified accounts"
        verifiedEntries={verifiedEntriesResponse.data}
        relUrl="all"/>
    
   return <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
            Looks like something went wrong 🤕
          </p>
  
};

interface PageProps {
  res: GetVerifiedEntriesResponse,
  verifiedType : VerifiedType
}

Page.getInitialProps = async () => {
  return await getVerifiedEntries("all");
};

export default Page;