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
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Iconss from 'react-native-vector-icons/AntDesign';
import RadioIcon from 'react-native-vector-icons/FontAwesome';
import ProgressDialog from '../components/ProgressDialog'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

import Toast from 'react-native-simple-toast';
import service from '../Service';
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import {saveUserData} from '../store/action' 
import messaging from '@react-native-firebase/messaging';
import PushController from './PushController';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      city: '',
      phone_no: props.route.params.phoneNo,
      modalVisible: false,
      radioBtnsData: ['الذكر', 'أنثى'],
      //radioBtnsData: ['Male', 'Female'], 
      checked: 0,
      checkboxValue:'',
      loading:false,
      userID:props.route.params.userID,
      DeviceToken:''
    };
  }
  //phone

  componentDidMount(){
    console.log(this.state.userID)
    this.getFcmToken();
    //this.setState({phone_no:this.state.phone_no})
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      this.setState({DeviceToken:fcmToken})
      console.log('fcmToken', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  getSignUpApiData=()=> {
    if(this.state.username == ''){
      Toast.show("الرجاء إدخال اسم المستخدم",Toast.SHORT);
    }else if(this.state.city == ''){
      Toast.show("الرجاء إدخال المدينة",Toast.SHORT);
    }  
    else{
      Keyboard.dismiss()
     this.setState({loading: true});

  
  
     service
     .put('User/signUp/'+this.state.userID,{
      name: this.state.username,
      phone:this.state.phone_no,
      gender:this.state.checked == 0 ? "أنثى":"الذكر",
      city:this.state.city,
      deviceToken: this.state.DeviceToken,
      //dob:'',
     // profilePic:''
    }
     )
   
     .then(response => {
       console.log(response);
       this.setState({loading: false});
       
       if (response.data.status == 1) {
           Toast.show("Registration successfully");
           this.props.navigation.replace('HomeScreen');

            this.props.saveUserData(response.data.data);
         //  this.storeData(response.data.data)


       }else{
         Toast.show(response.data.message);
       }
     })
     .catch(function(error) {
       console.log(error);
     });

 
   }
 }

  render() {
    let screenHeight = Dimensions.get('window').height;
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/04.png')}>
           <GeneralStatusBarColor backgroundColor="#557A68"
         barStyle="light-content"/>
        <SafeAreaView style={{marginHorizontal: 25}}>
       

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            // onRequestClose={() => {
            //   Alert.alert("Modal has been closed.");
            // }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, marginStart: 10}}>
                  حدد نوع الجنس
                </Text>

                {this.state.radioBtnsData.map((data, key) => {
                  return (
                    <View key={key} style={{marginTop: 20, marginStart: 20}}>
                      {this.state.checked == key ? 
                        <TouchableOpacity onPress={()=>{this.setState({checked: key,modalVisible:!this.state.modalVisible})}}  activeOpacity ={0.7} style={{flexDirection: 'row'}}>
                          <RadioIcon
                            style={{alignSelf: 'center'}}
                            name="dot-circle-o"
                            size={25}
                          />
                          <Text style={styles.RadioTxt}>{data}</Text>
                        </TouchableOpacity>
                      : 
                      
                        <TouchableOpacity activeOpacity ={0.7} 
                         onPress={()=>{this.setState({checked: key,modalVisible:!this.state.modalVisible})}} style={{flexDirection: 'row'}}>
                          <RadioIcon name="circle-thin" size={25} />
                         <Text style={{...styles.RadioTxt}}>{data}</Text>
                        </TouchableOpacity>
                      }
                    </View>
                  );
                })}

              
              </View>
            </View>
          </Modal>

          <ScrollView
            contentContainerStyle={
              {
                //height: screenHeight + 10,
                // marginVertical: 50,
              }
            }
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  alignSelf: 'center',
                  marginTop: 30,
                }}
                source={require('../assets/new-user.png')}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  padding: 6,
                  fontSize: 16,
                  letterSpacing: 2,
                  color: 'white',
                  alignSelf: 'center',
                }}>
                سجل
              </Text>

              <Text style={[styles.text_inputtxt, {marginTop: 12}]}>
               
                اسم المستخدم
              </Text>
              <TextInput
                style={styles.txtinput}
                underlineColorAndroid="transparent"
                numberOfLines={1}
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={text => this.setState({username: text})}
              />

              <Text style={styles.text_inputtxt}>جنس</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({modalVisible: true});
                }}
                style={[
                  styles.txtinput,
                  {
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  },
                ]}>
                {this.state.checked == 0 ? <Text style ={{fontWeight:'bold'}}>الذكر</Text> : <Text style ={{fontWeight:'bold'}} >أنثى</Text>}
                <Iconss style ={{alignSelf:'center'}} name="caretdown" size={15} />
              </TouchableOpacity>

              <Text style={styles.text_inputtxt}>مدينة</Text>
              <TextInput
                style={styles.txtinput}
                underlineColorAndroid="transparent"
                numberOfLines={1}
                //editable={false}
                autoCapitalize="none"
                value={this.state.city}
                onChangeText={text => this.setState({city: text})}
              />

              <Text style={styles.text_inputtxt}>رقم الهاتف.</Text>
              <View
                style={styles.txtinput}
                // underlineColorAndroid="transparent"
                // keyboardType="numeric"
                // maxLength= {10}
                // editable = {false}
                // numberOfLines={1}
                // autoCapitalize="none"
                // value={this.state.phone_no}
                // onChangeText={text => this.setState({phone_no: text})}
              >
                 <Text style={{fontWeight:"bold",flex:1,alignSelf:'flex-start'}}>{this.state.phone_no}</Text>
              </View>

             

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.getSignUpApiData()}
              >
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#336D4A', '#53966C', '#73BB8D']}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>سجل</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>

       

        </SafeAreaView>
        {/* <PushController/> */}
        <ProgressDialog loading ={this.state.loading} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  text_inputtxt: {letterSpacing: 1, marginTop: 5, marginStart: 15},
  txtinput: {
    backgroundColor: 'white',
    height: 37,
    padding: 8,
    borderRadius: 10,
    textAlign:'right',
    margin: 8,
    fontWeight:'bold',
    writingDirection: 'rtl'
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    width: '80%',
    marginTop: 25,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    margin: 9,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',

    //marginTop: 100
  },
  modalView: {
    width: 250,
    height: 160,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    //backgroundColor: '#F194FF',
   // borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop:5,
    marginRight:10,
    fontSize:16
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  RadioTxt: {
    textAlign: 'center',
    marginStart: 15,
    alignSelf: 'center',
    fontSize: 16,
  },
});
const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = {saveUserData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);

//export default Registration;
