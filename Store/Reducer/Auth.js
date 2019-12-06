import * as ActionTypes from '../Types/Auth';

const initialState={
    appLoaded:false,
    appAuth:false,//temporary. please change it to false
    token:null,//change back to null
    id:null
};

const AuthReducer=(state=initialState,action)=>{

    const Types=action.type;

    //switch starts here....
    switch(Types)
    {
        case ActionTypes.APPLOADED:
            return {
                ...state,
                appLoaded:true
            }
            break;



        case ActionTypes.APPAUTHENTICATED:
            return {
                ...state,
                appAuth:true,
                token:action.payload.token,
                id:action.payload.id
            }
            break;
    }
    //switch ends here......

    //default state return...
    return state;
}//..............................................

export default AuthReducer;