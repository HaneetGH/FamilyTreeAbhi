//import {NavigationContainer} from '';
//import  {NavigationActions,useNavigation}  from '@react-navigation/native';
  let _navigator;
  
    function setTopLevelNavigator(navigatorRef) {
        _navigator = navigatorRef;
    }
    
    // function navigate(routeName, params) {
    //   _navigator.dispatch(
    //     NavigationActions.navigate({
    //       routeName,
    //       params
    //     })
    //   );
    // }
    
    
 
export default {
    navigate,
    setTopLevelNavigator
  };

//navigator.dispatch(CommanActions.navigate({name:'Wallet',params:{}}));
