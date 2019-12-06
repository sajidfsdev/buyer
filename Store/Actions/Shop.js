import * as TYPES from '../Types/Shop';
import axios from 'axios';
import API from '../../Constants/API';


//handle fetching all vendors products starts here.....
export const fetchAllVendorProducts=(vendorId,token)=>{

    //setting body....
    const body=JSON.stringify({
        vendorId:vendorId
    });

    //setting config...
    const config={
        headers:{
            'Content-Type':'application/json',
            'b-auth-humtoken':token
        }
    };



    return async dispatch=>{

        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/search/searchVendorProducts",body,config);

            if(res)
            {
                console.log("res has came");
                console.log(res.data.data);

                //extracting uniques cat starts....
                let cat=[];
                res.data.data.forEach((elem)=>{

                    if(cat.length===0)
                    {
                        cat.push(elem.cat);
                    }
                    else
                    {
                        let duplicate=false;
                        cat.forEach(c=>{
                            if(elem.cat===c)
                            {
                                duplicate=true;
                            }
                        });

                        if(duplicate===false)
                        {
                            cat.push(elem.cat);
                        }
                    }
                });
                //extracting unique cat ends here..
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-------data");
                console.log(res.data.data);
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---------cat");
                console.log(cat);
                return dispatch({
                    type:TYPES.PRODUCTSLOADINGSUCCEEDED,
                    payload:{
                        products:[...res.data.data],
                        cat:[...cat]
                    }
                });
            }
            else
            {
                return dispatch({
                    type:TYPES.PRODUCTSLOADINGFAILED,
                    payload:{
                        errorMessage:"Could Not Fetch Server Data. Please try again"
                    }
                });
            }
        }
        catch(err)
        {
            if(err.response)
            {
                return dispatch({
                    type:TYPES.PRODUCTSLOADINGFAILED,
                    payload:{
                        errorMessage:err.response.data.errorMessage
                    }
                });
            }
            else
            {
                return dispatch({
                    type:TYPES.PRODUCTSLOADINGFAILED,
                    payload:{
                        errorMessage:err.message
                    }
                });
            }
        }
        //try catch ends here.......

    }//dispatch method ends here....

}
//handle fetching all vendors products ends here.......