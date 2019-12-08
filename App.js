import React,{ useState } from 'react';

import * as fonts from 'expo-font';

//redux imports....
import { combineReducers,createStore,applyMiddleware } from 'redux';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//Reducers...
import AuthReducer from './Store/Reducer/Auth';
import CatReducer from './Store/Reducer/Cat';
import ShopReducer from './Store/Reducer/Shop';
import wishReducer from './Store/Reducer/Wishliat';
import RequestReducer from './Store/Reducer/Request';

import Grid from './Grid/grid';
import TestingNav from './Navigations/Testing';
import requestReducer from './Store/Reducer/Request';


//Redux related tasks starts here....
const RootReducer=combineReducers({
    auth:AuthReducer,
    cat:CatReducer,
    shop:ShopReducer,
    wish:wishReducer,
    request:requestReducer
});

const Store=createStore(RootReducer,applyMiddleware(thunk));
//Redux related tasks ends here......


//fetching the custom fonts starts here....
const fetchFonts=()=>{
    return fonts.loadAsync({
        "opensans-regular":require('./fonts/opensans-regular.ttf'),
        "opensans-thin":require('./fonts/opensans-thin.ttf'),
        "roboto-regular":require('./fonts/roboto-regular.ttf'),
        "roboto-thin":require('./fonts/roboto-thin.ttf')
    });
}
//fetching the custom fonts ends here......

const App=(props)=>{

    //state management starts here....
    const [loadingState,setLoadingState]=useState(false);  
    ///state management ends here.....

    if(loadingState===false)
    {
        return <AppLoading startAsync={fetchFonts} onFinish={()=>{setLoadingState(true)}} />;
    }

    




    //return starts here....
    return (
      
        <Provider store={Store}>
            <Grid />
            {/* <TestingNav /> */}
        </Provider>
        
    );
    //return ends here......

}//..................



export default App;