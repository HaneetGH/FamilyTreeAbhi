/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, I18nManager, BackHandler} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';

import {
  HomeScreen,
  Login,
  Registration,
  VerifyOtp,
  ReadMoreScreen,
  ContactScreen,
  MsgListScreen,
  SplashScreen,
  SearchedProfile,
  MyProfile,
  AddFamily,
  FamilyTree,
  Chat,
  EditProfile,
  CommentList,
} from './src';

import PushController from './src/screens/PushController';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
//import NavigationService from './src/Service/NavigationService';
//import firebase from 'react-native-push-notification';
//import { navigationRef } from './src/Service/NavigationService';

class App extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
  }

  componentDidMount() {}
  componentWillUnmount() {
    //this.unsubscribe;
    // this.backHandler
  }


  HomeStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="ReadMoreScreen"
          component={ReadMoreScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CommentList"
          component={CommentList}
        />
      </Stack.Navigator>
    );
  };

  Contactstack = () => {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="ContactScreen"
          component={ContactScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SearchedProfile"
          component={SearchedProfile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="FamilyTree"
          component={FamilyTree}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    );
  };

  ProfileStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="MyProfile"
          component={MyProfile}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="AddFamily"
          component={AddFamily}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="EditProfile"
          component={EditProfile}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="FamilyTree"
          component={FamilyTree}
        />
      </Stack.Navigator>
    );
  };

  MsgStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="MsgListScreen"
          component={MsgListScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    );
  };

  BottamTabView = () => {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator backBehavior ="none"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
              return <FontAwesome name={iconName} size={27} color={color} />;
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'wechat' : 'wechat';

              return <FontAwesome name={iconName} size={27} color={color} />;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
              return <FontAwesome name={iconName} size={27} color={color} />;
            } else if (route.name === 'Wallet') {
              iconName = focused ? 'contacts' : 'contacts';
            }
            return (
              <MaterialCommunityIcons name={iconName} size={27} color={color} />
            );
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: 'white',
          inactiveTintColor: 'white',

          labelStyle: {
            fontFamily: 'MerriweatherSans-Bold',
          },
          style: {
            backgroundColor: '#2E8451',
          },
          tabStyle: {borderColor: 'black', borderWidth: 0.5},
        }}>
        <Tab.Screen name="Home" component={this.HomeStack} />
        <Tab.Screen name="Bookings" component={this.MsgStack} />
        <Tab.Screen name="Profile" component={this.ProfileStack} />
        <Tab.Screen name="Wallet" component={this.Contactstack} />
      </Tab.Navigator>
    );
  };

  render() {
    const Stack = createStackNavigator();

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
          //ref={ (navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef); } }
          >
            <Stack.Navigator
              initialRouteName="SplashScreen"
              // backBehavior = {Platform.OS == 'android'?  'none':null }
            >
              <Stack.Screen
                options={{headerShown: false}}
                name="SplashScreen"
                component={SplashScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="Registration"
                component={Registration}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="VerifyOtp"
                component={VerifyOtp}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="HomeScreen"
                component={this.BottamTabView}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
        <PushController />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
