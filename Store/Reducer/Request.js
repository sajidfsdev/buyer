import * as Types from '../Types/Request';

const initialState={
    loaded:false,
    isError:false,
    errorMessage:"",
    request:{},
    latitude:null,
    longitude:null
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
            console.log("########################");
            console.log(action.payload.request);
            console.log("##########################");
            console.log("##########################");
            return {
                ...state,
                request:JSON.parse(JSON.stringify(action.payload.request)),
                loaded:true
            };
            break;

        case Types.SET_MY_PERSONAL_LAT_LONG:
            return {
                ...state,
                latitude:parseFloat(action.payload.lat),
                longitude:parseFloat(action.payload.long)
            };
            break;

        case Types.NOTHING:
            return {
                ...state
            };
            break;

        case Types.CLEAR_ALL_LOGS:
            return {
                ...state,
                request:{}
            };
            break;



    }//switch statement ends here.....


    //.............
    return state;
}//........................

export default requestReducer;