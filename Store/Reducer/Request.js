import * as Types from '../Types/Request';

const initialState={
    loaded:false,
    isError:false,
    errorMessage:"",
    request:{}
};

const requestReducer=(state=initialState,action)=>{

    switch(action.type)
    {
        case Types.REQUESTLOADEDWITHSUCCESS:
            return {
                ...state,
                loaded:true,
                isError:false,
                errorMessage:"",
                request:JSON.parse(JSON.stringify(action.payload.request))
            };
            break;

        case Types.REMOVEREQUEST:
            return {
                ...state,
                loaded:true,
                isError:true,
                errorMessage:"No Request Has Been Issued Yet",
                request:{}
            }
            break;

        case Types.ENDBUFFERING:
            return {
                ...state,
                loaded:false
            }
            break;

        case Types.REQUESTLOADEDWITHERROR:
            return {
                ...state,
                loaded:true,
                isError:true,
                errorMessage:action.payload.errorMessage,
                request:{}
            };
            break;

        case Types.STARTBUFFERING:
            return {
                ...state,
                loaded:false
            };
            break;



        case Types.UPDATEREQUEST:
            console.log("########################");
            console.log(action.payload.request);
            console.log("##########################");
            return {
                ...state,
                request:JSON.parse(JSON.stringify(action.payload.request)),
                loaded:true
            };
            break;



    }//switch statement ends here.....


    //.............
    return state;
}//........................

export default requestReducer;