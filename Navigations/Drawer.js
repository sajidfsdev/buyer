import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5';

//constants import ....
import Color from '../Constants/Colors';

//Wishlist stack starts here......
import WishListScreen from '../Screens/wishlist';
import onlyProductDetailScreen from '../Reusable/onlyProdDetails';
import onlyVendorDetailsScreen from '../Reusable/onlyVendorDetails';

import CartScreen from '../Screens/cart';

//History stack starts here.......
import HistoryScreen from '../Screens/History/main';
import HistoryDetails from '../Screens/History/HistoryDetails';

//components inport....
import CatScreen from '../Screens/Cat';
import SubCatScreen from '../Screens/SubCat';
import SubSubCatScreen from '../Screens/SubSubCat';
import DecesionScreen from '../Screens/Decesion';
import CatSearchViewScreen from '../Screens/CatSearchView';
import ProdSearchViewScreen from '../Screens/ProdSerchView';
import ProductSearchByCatScreen from '../Screens/ProdSearchByCat';
import ProductDetailScreen from '../Reusable/ProductDetail';
import ProdSearchByProdScreen from '../Screens/prodSearchByProd';
import ProdByProdMapScreen from '../Screens/prodbyprodmap';
import ShopScreen from '../Screens/Shop';
import ShopSubCatScreen from '../Screens/shopSubCat';
import ShopSubSubCatScreen from '../Screens/shopSubSubCat';
import ShopProductListScreen from '../Screens/ShopProductsList';
import RequestScreen from '../Screens/Requests';

const CatStack=createStackNavigator({




    cat:{
        screen:CatScreen,
        navigationOptions:{
            headerTitle:"Categories",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    },

    subCat:{
        screen:SubCatScreen,
        navigationOptions:{
            headerTitle:"Sub-Categories",
            headerTintColor:"white",
            headerTitleStyle:{
                fontFamily:"roboto-regular",
                fontWeight:'200'
            },
            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },

    subSubCat:{
        screen:SubSubCatScreen,
        navigationOptions:{
            headerTitle:"Sub-Categories",
            headerTintColor:"white",
            headerTitleStyle:{

                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },


    decesion:{
        screen:DecesionScreen,
        navigationOptions:{
            headerTitle:"Search Criteria",
            headerTintColor:'white',
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },
            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },



    catsearchview:{
        screen:CatSearchViewScreen,
        navigationOptions:{
            headerTitle:"Category Search",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack,
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    },



    prodsearchview:{
        screen:ProdSearchViewScreen,
        navigationOptions:{
            headerTitle:"Product Search",
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    },



    prodsearchbycat:{
        screen:ProductSearchByCatScreen,
        navigationOptions:{
            headerTintColor:"white",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
                
            },
            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },




    productdetail:{
        screen:ProductDetailScreen,
        navigationOptions:{
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerTintColor:"white",
            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },





    prodsearchbyprod:{
        screen:ProdSearchByProdScreen,
        navigationOptions:{
            headerTitle:"Search Product",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },

            headerTitleStyle:{
                fontFamily:"roboto-regular",
                fontWeight:'200'
            }
        }
    },



    prodbyprodmap:{
        screen:ProdByProdMapScreen,
        navigationOptions:{
            headerTintColor:"white",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },
            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },


    shop:{
        screen:ShopScreen,
        navigationOptions:{
        headerTintColor:"white",
        headerTitleStyle:{
            fontFamily:'roboto-regular',
            fontWeight:'200'
        },

        headerStyle:{
            backgroundColor:Color.welcomeBack
        }
        }
    },



    shopSubCat:{
        screen:ShopSubCatScreen,
        navigationOptions:{
            headerTintColor:"white",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },



    shopSubSubCat:{
        screen:ShopSubSubCatScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },
            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },





    shopProductList:{
        screen:ShopProductListScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    }
});




///////////////////////////////////////////////////////////
///////////Stack navigator ends here.......
///////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////
/////////////////////////WISHLIST stack navigator
///////////////////////////////////////////////////////////
const WishStack=createStackNavigator({
    WishList:{
        screen:WishListScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"WishList",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },



    onlyProductDetail:{
        screen:onlyProductDetailScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Product Details",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }

    },





    onlyVendorDetail:{
        screen:onlyVendorDetailsScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Vendor Details",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }

    }
});



const CartStack=createStackNavigator({
    cart:{
        screen:CartScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Cart",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }
    },



    onlyVendorDetailCart:{
        screen:onlyVendorDetailsScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Vendor Details",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }

    },



    onlyProductDetailCart:{
        screen:onlyProductDetailScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Product Details",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }
        }

    }
});



//////////////////////////////////////////////////////
//////////Request stack starts here
//////////////////////////////////////////////////////

const requestStack=createStackNavigator({
    request:{
        screen:RequestScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Product Delivery Request",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }

        }
    }
});


////////////////////////////////////////////////////////
/////////////////HISTORY STACK STARTS HERE
////////////////////////////////////////////////////////
const HistoryStack=createStackNavigator({
    main:{
        screen:HistoryScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"History",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }

        }
    },

    purchasehistory:{
        screen:HistoryDetails,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Details",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }

        }
    }
});




//////////////////////////////////////////////////////////
///////////Drawer navigator starts here
//////////////////////////////////////////////////////////


const drawerNav=createDrawerNavigator({
    HOME:{
        screen:CatStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="home"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },




    WISHLIST:{
        screen:WishStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="heart"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },



    CART:{
        screen:CartStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="shopping-cart"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },





     REQUEST:{
        screen:requestStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="shopping-cart"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },


    HISTORY:{
        screen:HistoryStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="history"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },
    
},
////////////////////
{
    contentOptions: {
        // add your styling here 
        // activeTintColor: '#e91e63',
        activeTintColor:Color.success,
        itemsContainerStyle: {
          marginVertical: 2,
        },
        iconContainerStyle: {
          opacity: 1,
        },
      },
      drawerBackgroundColor:'#0086b3',
    //   drawerBackgroundColor: '#262A2C', // sets background color of drawer
}
/////////////////////
);


export default createAppContainer(drawerNav);