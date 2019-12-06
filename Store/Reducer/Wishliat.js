import * as WishTypes from '../Types/WishTypes';

const initialState={
    wishlist:[],
    isError:false,
    errorMessage:""
};

const wishlistReducer=(state=initialState,action)=>{

    switch(action.type)
    {
        case WishTypes.ADDWISHLIST:
            return {
                wishlist:[...action.payload.wishlist],
                isError:false,
                errorMessage:""
            }
            break;

        case WishTypes.WISHERROR:
            return {
                wishlist:[],
                isError:true,
                errorMessage:action.payload.errorMessage
            }
            break;

    }
    return state;
}

export default wishlistReducer;

