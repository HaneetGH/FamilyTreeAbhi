import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import PushController from './PushController';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.user._id != null && this.props.user._id != undefined) {
        this.props.navigation.replace('HomeScreen');
      } else {
        this.props.navigation.replace('Login');
      }
    }, 1000);
  }

  // checkPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   setTimeout(() => {
  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //       this.props.navigation.replace('Login');
  //       //this.getFcmToken();
  //     } else {
  //       Linking.openSettings();
  //       Toast.show('Please Enable Permission');
  //       console.log('Authorization no permission:', authStatus);
  //     }
  //   }, 1000);
  // };

  // requestPermission = async () => {
  //   try {
  //     await messaging().requestPermission();
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   } catch (error) {}
  // };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#537C67'}}>
        <GeneralStatusBarColor barStyle="light-content" />
        <Image
          style={{width: 250, height: 250, alignSelf: 'center'}}
          source={require('../assets/app_Logo.png')}
        />
      
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(SplashScreen);
