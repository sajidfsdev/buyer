import * as TYPES from '../Types/Shop';

const initialState={
    products:[],
    cat:[],
    loaded:false,
    error:false,
    errorMessage:''
};

const Shop=(state=initialState,action)=>{

    const ActionType=action.type;

    //switch starts here.....
    switch(ActionType)
    {
        case TYPES.PRODUCTSLOADINGSUCCEEDED:
            return {
                ...state,
                products:[...action.payload.products],
                cat:[...action.payload.cat],
                loaded:true,
                error:false,
                errorMessage:''
            }
            break;





        case TYPES.PRODUCTSLOADINGFAILED:
                return {
                    ...state,
                    products:[],
                    cat:[],
                    loaded:true,
                    error:true,
                    errorMessage:action.payload.errorMessage
                }
            break;


        
        case TYPES.STARTBUFFERING:
            return {
                ...state,
                loaded:false
            };
            break;
    }
    //switch ends here.......

    //default state returning....
    return state;
}//................

export default Shop;