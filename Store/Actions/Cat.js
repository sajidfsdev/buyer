import axios from 'axios';
import * as ActioTypes from '../Types/cat';
import API from '../../Constants/API';

export const handleFetchAllCats=(token)=>{

    return async dispatch=>{

        //first forming config...
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token
            }
        };


        //body formation starts here...
        const body=JSON.stringify({
            action:'allcats'
        });
        //body formation ends here.....


        //try catch starts here...
        try
        {
            const res=await axios.post(API.server+"/buyer/cats/allcats",body,config);

            if(res)
            {
                console.log("All Cats Have been fetched successfully");
                console.log(res.data.data);
                return dispatch({
                    type:ActioTypes.CATLOADINGSUCCESS,
                    payload:{
                        cats:res.data.data
                    }
                });
            }
            else
            {
                return dispatch({
                    type:ActioTypes.CATLOADINGFAILED,
                    payload:{
                        errorMessage:"Could Not Fetch Categories due to network error"
                    }
                });
            }
        }
        catch(err)
        {
            if(err.response)
            {
                return dispatch({
                    type:ActioTypes.CATLOADINGFAILED,
                    payload:{
                        errorMessage:err.response.data.errorMessage
                    }
                });
            }
            else
            {
                return dispatch({
                    type:ActioTypes.CATLOADINGFAILED,
                    payload:{
                        errorMessage:err.message
                    }
                });
            }
        }
        //try catch ends here.....
        

    }//dispatch returns here...

}//......................handle fetch all ends here...