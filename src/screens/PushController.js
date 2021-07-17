import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
//import NavigationService from '../Service/NavigationService';
//import  {CommanActions}  from '@react-navigation/native';


export default class PushController extends Component {
 
   constructor(props){
     super(props)

   }

  componentDidMount() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      
      // const { data } = notification;
      // NavigationService.navigate("Wallet",{data:data})
      //  navigator.dispatch(
      //   NavigationService.navigate({routeName:'Chat',params:"123"})
      //   );
 
       // required on iOS only
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // onAction: function (notification) {
      //   console.log("ACTION:", notification.action);
      //   console.log("NOTIFICATION:", notification);
    
      //   // process the action
      // },
      
      // Android only
      senderID: '328235466524',
     // playSound: true, // (optional) default: true
      //soundName:'dingtone',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
       
      },
      popInitialNotification: true,
      requestPermissions: true,



      
    });
    // PushNotification.createChannel(
    //     {
    //       channelId: "23432xxxx",
    //       channelName: "FCM SERVICE ",
    //       channelDescription: "A custom channel to categorise your custom notifications",
    //       soundName: "soundnotification", 
    //       importance:4, // 4
    //       vibrate: true,
    //     },
    //     // (created) => console.log(`createChannel returned '${created}'`)created, false means it already existed.
    //   )
    
  }


  render() {
    return null;
  }
}


