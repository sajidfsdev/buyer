import * as TYPES from '../Types/cat';

const initialState={
    cats:{},
    loaded:false,
    error:false,
    errorMessage:'',
    cat:"",
    subCat:"",
    subSubCat:""
};

const cats=(state=initialState,action)=>{

    const type=action.type;

    //switch starts here....
    switch(type)
    {
        case TYPES.CATLOADINGSUCCESS:
            return {
                ...state,
                cats:JSON.parse(JSON.stringify(action.payload.cats)),
                loaded:true,
                error:false,
                errorMessage:action.payload.errorMessage
            };
            break;


        case TYPES.CATLOADINGFAILED:
            return {
                ...state,
                cats:{},
                loaded:true,
                error:true,
                errorMessage:action.payload.errorMessage
            };
            break;


        case TYPES.SETCAT:
            return {
                ...state,
                cat:action.payload.cat
            };
            break;

        case TYPES.SETSUBCAT:
            return {
                ...state,
                subCat:action.payload.subCat
            };
            break;

        case TYPES.SETSUBSUBCAT:
            return {
                ...state,
                subSubCat:action.payload.subSubCat
            };
            break;
    }
    //switch ends here......

    return state;
}//.......................................

export default cats;