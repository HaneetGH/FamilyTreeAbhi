import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Toast from 'react-native-simple-toast';
import ProgressDialog from '../components/ProgressDialog';
import service from '../Service';
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification from "react-native-push-notification";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mobile: '', 
      isvalid: false,
      loading:false
    };
  }

  validate = () => {
    if (this.state.mobile == '') {
      Toast.show('يرجى إدخال رقم الهاتف المحمول ');
    } else if (isNaN(this.state.mobile)) {
      Toast.show('الرجاء إدخال رقم هاتف صحيح');
    } else if(this.state.mobile.length < 10 ){
      Toast.show('لا يمكن أن يكون الرقم أقل من 10');
    }
    else {
      Keyboard.dismiss()
      this.setState({isvalid: true});
      this.setState({loading: true});
    

      service
        .post('User/Login',{phone:this.state.mobile})

        .then(response => {
          console.log(response.data);
          this.setState({loading: false});
          
          if (response.data.status == 1) {
             // console.log('%%%%%%%%%%%%',response.data.message);
            // Toast.show(response.data.message);
             Toast.show("أرسل OTP بنجاح");
              this.props.navigation.replace('VerifyOtp',{phone:this.state.mobile});
           // this.setState({Data: response.data.data});
          }else{
            Toast.show(response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };


  render() {
    return (
      <SafeAreaView>
        <GeneralStatusBarColor barStyle="light-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../assets/imgBg/01.jpg')}>
            <View style={styles.loginview}>
              <Text
                style={{
                  fontFamily: 'MerriweatherSans-ExtraBold',
                  fontSize: 16,
                  letterSpacing: 1,
                }}>
                تسجيل الدخول
              </Text>
              <Text style={styles.txt}>
                يرجى إدخال رقم الهاتف لتسجيل الدخول إلى حسابك
              </Text>

              <View style={styles.login_cardView}>
                <View style={{flexDirection: 'row'}}>
                  

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,

                      alignSelf: 'center',
                      marginStart: 1,
                    }}>

                 {this.state.isvalid == true ? (
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          alignSelf: 'center',
                          padding: 10,
                          marginEnd: 3,
                          marginStart: 20,
                        }}
                        source={require('../assets/check.png')}
                      />
                    ) : null}     
                    <TextInput
                      style={{
                        paddingBottom: 0,
                        height: 35,
                        flex: 1,
                        marginBottom: 8,
                        writingDirection: 'rtl',
                        textAlign: 'right',
                        fontWeight: 'bold',
                        marginRight:3
                      }}
                      underlineColorAndroid="transparent"
                      numberOfLines={1}
                      placeholder="أدخل رقم الهاتف"
                      keyboardType="numeric"
                      maxLength={10}
                      autoCapitalize="none"
                      value={this.state.mobile}
                      onChangeText={text => this.setState({mobile: text})}
                    />

                 
                  </View>
                 
                 
                  <View style={styles.horizontalLine} />
                  <Text
                    style={{
                      color: '#3B7D57',
                      alignSelf: 'center',
                      padding: 10,
                     
                    }}>
                    + 966
                  </Text>

                  
               
                </View>

                <View
                  style={{
                    width: '95%',
                    height: 0.5,
                    backgroundColor: 'gray',
                    alignSelf: 'center',
                  }}
                />

                <TouchableOpacity
                  activeOpacity={0.9}
                 
                 onPress={() => this.validate()}
                // onPress={() => this.handleButtonPress()}
                 >
                  <LinearGradient
                    colors={['#339D5E', '#36724E', '#3C7C56']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>الحصول على OTP</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
        {/* <PushController/> */}
    <ProgressDialog loading = {this.state.loading}/>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  loginview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    //fontFamily:'Amiri-Bold'
  },
  txt: {
    // fontFamily: 'MerriweatherSans-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.4,
  },
  login_cardView: {
    marginVertical: 20,
    backgroundColor: 'white',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation: 8,
    borderRadius: 15,
    width: '78%',
  },
  horizontalLine: {
    width: 0.6,
    height: 25,
    alignSelf: 'center',
    backgroundColor: 'gray',
    marginStart: 0,
    marginEnd: 2,
  },
  linearGradient: {
    paddingLeft: 10,
    paddingRight: 10,
    //paddingTop:3,
    // paddingBottom:3,
    borderRadius: 15,
    width: 170,
    //height:40,
    marginTop: 15,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default Login;
