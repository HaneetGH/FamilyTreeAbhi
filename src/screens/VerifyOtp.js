import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

import Toast from 'react-native-simple-toast';
import ProgressDialog from '../components/ProgressDialog';
import service from '../Service';
import AsyncStorage from '@react-native-community/async-storage';
//import { connect } from "react-redux";
//import  {saveUserId} from '../store/action'

class VerifyOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      height: 100,
      loading: false,
      phone: props.route.params.phone,
      timer: 3
    };
  }

  getApiData = () => {
    if (this.state.code == '') {
      Toast.show('الرجاء إدخال رمز التحقق', Toast.SHORT);
    } else {
      Keyboard.dismiss();
      this.setState({loading: true});
      service
        .post('User/otpAuth', {otp: this.state.code, phone:this.state.phone})

        .then(response => {
          console.log(response.data);
          this.setState({loading: false});

          if (response.data.status == 1) {
            //Toast.show(response.data.message);
            console.log('mobilenumber', response.data.data.phone);

            this.props.navigation.replace('Registration', {
              phoneNo: response.data.data.phone,
              userID: response.data.data._id,
            });

            //this.storeUserId(response.data.data);
            //this.props.saveUserId(response.data.data);
          } else {
            Toast.show(response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  componentDidMount(){
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  componentDidUpdate(){
    if(this.state.timer === 0){ 
      clearInterval(this.interval);
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
   }  

   

   resendOTPApi=()=>{
     
    
      this.setState({loading: true});
      service
        .post('User/resendOtp', {phone:this.state.phone})

        .then(response => {
          console.log(response.data);
          this.setState({loading: false});

          if (response.data.status == 1) {
            Toast.show(response.data.message);
            //this.storeUserId(response.data.data);
            //this.props.saveUserId(response.data.data);
          } else {
            Toast.show(response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  

     
    
   }

  render() {
    let screenHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex: 1}}>
        <GeneralStatusBarColor barStyle="light-content" />
        <LinearGradient
          colors={['#319D5E', '#287B4B', '#23663E', '#1A452C']}
          style={{height: screenHeight}}>
          {/* <View style={{ height: (screenHeight - this.state.height) }}> */}

          <ScrollView
            contentContainerStyle={{height: screenHeight + 70}}
            showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.subview,
                {height: screenHeight - this.state.height},
              ]}>
              <View
                style={{
                  marginVertical: 20,
                  marginHorizontal: 16,
                  //height:200
                }}>
                <Image
                  style={{width: 100, height: 100, alignSelf: 'center'}}
                  source={require('../assets/imgBg/verifyimg.png')}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  التحقق
                </Text>
                <Text style={styles.txt}>
                  يرجى إدخال الرمز الذي تلقيته على هاتفك
                </Text>
                <ScrollView>
                  <View style={styles.login_cardView}>
                    <SmoothPinCodeInput
                      containerStyle={{alignSelf: 'center'}}
                      value={this.state.code}
                      onTextChange={text => this.setState({code: text})}
                      cellStyle={{
                        borderBottomWidth: 0.7,

                        borderColor: 'gray',
                        //fontSize: 14
                      }}
                      cellSize={35}
                      cellStyleFocused={{
                        borderColor: 'black',
                      }}
                      textStyle={{fontSize: 15}}
                      cellSpacing={20}
                    />

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.getApiData()}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#336D4A', '#53966C', '#73BB8D']}
                        style={styles.linearGradient}>
                        <Text style={styles.buttonText}>استمر</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
            <View style={{flexDirection:'row',alignSelf:"flex-start"}}>  
                <Text
                  style={{
                    color: '#3B7D57',
                    alignSelf: 'center',
                    
                    // padding: ,
                  }}>
                  ألم تحصل على الرمز؟ {"    "}
                </Text>

                <Text
                 onPress ={()=>this.resendOTPApi()}
                  style={{
                    color: '#3B7D57',
                    alignSelf: 'center',
                   marginEnd:25,
                   fontWeight:'bold',
                   padding:5,
                  
                    // padding: ,
                  }}>
                 {" "} إعادة إرسال
                  
                </Text>
                </View> 
              </View>
            </View>
          </ScrollView>
          {/* </View> */}
        </LinearGradient>
        <ProgressDialog loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subview: {
    marginHorizontal: 35,
    marginVertical: 35,
    //marginTop:35,
    borderRadius: 30,
    backgroundColor: '#F5F6FC',
    borderWidth: 0.6,
    justifyContent: 'center',
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
    padding: 9,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation: 8,
    borderRadius: 15,
    marginHorizontal: 20,
    //width: '78%',
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    width: '90%',
    marginTop: 25,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 14,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 9,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

// const mapStateToProps = state => ({
//   user: state.user
// });
// const mapDispatchToProps = { saveUserId };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(VerifyOtp);

export default VerifyOtp;
