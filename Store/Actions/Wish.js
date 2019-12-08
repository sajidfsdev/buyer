import * as wishTypes from '../Types/WishTypes';

export const handleAddOneWish=(productInfo)=>{

    return (dispatch,getState)=>{
        let list=getState().wish.wishlist;

        
        console.log("hi hi hi ?????????????????????????????????????????????????????");
        console.log(list);
        console.log("product info supplied was");
        console.log(productInfo)
        let wishlist=[...list];
        wishlist.push(productInfo);

        dispatch({
            type:wishTypes.ADDWISHLIST,
            payload:{
                wishlist:wishlist
            }
        });
    }

}//handle add one wish ends here..............