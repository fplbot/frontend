import VerifiedPage from "../../../components/virtual-leagues/VerifiedPage";
import { getVerifiedEntries, GetVerifiedEntriesResponse } from "../../../services/verified";

const Page = (verifiedEntriesResponse:GetVerifiedEntriesResponse) => {
  return(<>

    {verifiedEntriesResponse.type === "SUCCESS" ? (
      <VerifiedPage 
        title="All verified accounts"
        description="This virtual league contains all verified accounts"
        verifiedEntries={verifiedEntriesResponse.data}      
        relUrl="all"/>
    ) 
    : (
          <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
            Looks like something went wrong 🤕 : <pre>STUFF: '{JSON.stringify(verifiedEntriesResponse)}'</pre>
          </p>
      )}
  
  </>)
};

Page.getInitialProps = async () => {
  return await getVerifiedEntries();
};

export default Page;