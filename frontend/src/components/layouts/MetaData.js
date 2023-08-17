import { Helmet } from "react-helmet-async";

function MetaData({title}){
    return(
        <Helmet>
            <title>{`${title} | ShopCart`}</title>
        </Helmet>
    )
}

export default MetaData;