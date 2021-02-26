import { NextPageContext } from "next";
import VerifiedPage from "../../components/virtual-leagues/VerifiedPage";
import { getVerifiedEntries as getVirtualLeagues, GetVerifiedEntriesResponse } from "../../services/verified";
import { VerifiedType } from "../../services/VerifiedType";

const Page = ({ res, verifiedType}:PageProps) => {
  if(res.type === "SUCCESS")
    return <VerifiedPage 
        title="All verified accounts"
        description="This virtual league contains all verified accounts"
        verifiedEntries={res.data}
        relUrl={verifiedType}/>
    
   return <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
            Looks like something went wrong 🤕
          </p>
  
};

interface PageProps {
  res: GetVerifiedEntriesResponse,
  verifiedType : VerifiedType
}

Page.getInitialProps = async (ctx : NextPageContext) => {
  const verifiedType = ctx.query.type as VerifiedType;
  console.log(verifiedType);
  var res = await getVirtualLeagues(verifiedType);
  return {
    res : res,
    verifiedType : verifiedType
  }
};

export default Page;