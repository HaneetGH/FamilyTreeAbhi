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
  Keyboard,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Iconss from 'react-native-vector-icons/AntDesign';
import RadioIcon from 'react-native-vector-icons/FontAwesome';
import ProgressDialog from '../components/ProgressDialog';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';

import Moment from 'moment';
import axios from 'axios';
import {connect }from 'react-redux';
import {saveUserData} from '../store/action' 
import FastImage from "react-native-fast-image";



class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      city: '',
      phone_no: '',
      modalVisible: false,
      radioBtnsData: ['الذكر', 'أنثى'],
      checked: 0,
      checkboxValue: '',
      loading: false,
      isDatePickerVisible: false,
      Dob: undefined,
      profilePic:'',
      fileData:'',
      setImagesUri:''
    };
  }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', Moment(date).format("YYYY-MM-DD"));
    this.setState({Dob: Moment(date).format("YYYY-MM-DD")});

    this.hideDatePicker();
  };

  componentDidMount() {
    this.getData();
    console.log(this.props.user.dob +" "+this.props.user.profilePic+" "+this.props.user._id)
  }

       getData = () => {
        this.setState({
          phone_no: this.props.user.phone,
          username: this.props.user.name,
          city: this.props.user.city,
          gender: this.props.user.gender, 
          Dob:this.props.user.dob,
          profilePic:this.props.user.profilePic
        });

        if (this.props.user.gender == 'أنثى') {
          this.setState({checked: 0});
        } else {
          this.setState({checked: 1});
        }
      }
    
  

  chooseImage=()=>{
    const options = {
      title: 'Select Image',
      //customButtons: [{ name: 'Camera', title: 'Choose Photo from Gallary' }],
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',};

       // console.log('source', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const file = {
          uri: response.uri,
          name: "imagename.jpg",
          type: response.type,
          size: response.fileSize,
          slice: () => new Blob(),
        };

        this.setState({
          profilePic: source,
          fileData: file,
          setImagesUri:response
        });

      }
    });
  }



  getSignUpApiData = () => {
    if (this.state.username == '') {
      Toast.show('الرجاء إدخال اسم المستخدم', Toast.SHORT);
    } else if (this.state.city == '') {
      Toast.show('الرجاء إدخال المدينة', Toast.SHORT);
    } else if(this.state.Dob == undefined){
      Toast.show('يرجى تحديد تاريخ الميلاد', Toast.SHORT);
    }  else {
      Keyboard.dismiss();
      this.setState({loading: true});

      var photo = {
        uri: this.state.setImagesUri.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
    };

      var formData = new FormData();
      formData.append('name', this.state.username);
      formData.append('profilePic', photo);
      formData.append('phone', this.state.phone_no);
      formData.append('gender', this.state.checked == 0 ? 'أنثى' : 'الذكر',);
      formData.append('city', this.state.city);
      formData.append('dob', Moment(this.state.Dob).format("YYYY-MM-DD"));
     

      console.log('formdata', formData);
      axios({
        method: 'PUT',
        url: "http://ec2-52-66-250-93.ap-south-1.compute.amazonaws.com:3000/User/signUp/"+this.props.user._id,
        data: formData,
        headers: {
         // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }) 

      .then((response)=> {
       console.log(response.data);
        this.setState({loading:false})
       if(response.data.status == 1){
        
         Toast.show("profile updated successfully");
       // this.storeData(response.data.data);
         this.props.saveUserData(response.data.data);

          setTimeout(() => {
            this.props.navigation.goBack(null);
            
           }, 800);
         
       }
  
      })
      .catch(function (error) {
        console.log(error);
       // Toast.show(error);
      });

     

    }
  };

  render() {
    let screenHeight = Dimensions.get('window').height;
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/04.png')}>
        <GeneralStatusBarColor
          backgroundColor="#557A68"
          barStyle="light-content"
        />

        <Header
          onPress={() => this.props.navigation.goBack(null)}
          headerTxt="تحديث الملف"
        />

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
                      {this.state.checked == key ? (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{flexDirection: 'row'}}>
                          <RadioIcon
                            style={{alignSelf: 'center'}}
                            name="dot-circle-o"
                            size={25}
                          />
                          <Text style={styles.RadioTxt}>{data}</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.setState({
                              checked: key,
                              modalVisible: !this.state.modalVisible,
                            });
                          }}
                          style={{flexDirection: 'row'}}>
                          <RadioIcon name="circle-thin" size={25} />
                          <Text style={{...styles.RadioTxt}}>{data}</Text>
                        </TouchableOpacity>
                      )}
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
             <View style={{flex: 1, marginBottom: 200}}>
              <TouchableOpacity onPress={()=> this.chooseImage()}
                activeOpacity={1}
                style={{justifyContent: 'center', flex: 1}}>
                <View
                  style={{
                    ...styles.imgView,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                  }}>
               <FastImage style = {{width:92,height:92,alignSelf:'center',borderRadius:92/2,position:'absolute'}} 
             
                 source={{uri:"https://familytrees12.s3.ap-south-1.amazonaws.com/"+this.props.user.profilePic}}
                 />     
                  <FastImage
                    style={styles.imgView}
                    source ={this.state.profilePic} 
                  />
               
                  <Feather
                  onPress={()=> this.chooseImage()}
                    name="edit"
                    size={22}
                    color="white"
                    style={{alignSelf: 'flex-end', marginTop: -10}}
                  />
                </View>
              </TouchableOpacity>

              <Text style={[styles.text_inputtxt, {marginTop: 45}]}>
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
                {this.state.checked == 0 ? (
                  <Text style={{fontWeight: 'bold'}}>الذكر</Text>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>أنثى</Text>
                )}
                <Iconss
                  style={{alignSelf: 'center'}}
                  name="caretdown"
                  size={15}
                />
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
                style={styles.txtinput}>
                 <Text style={{writingDirection:Platform.OS =='ios'? 'rtl':'ltr',fontWeight:"bold",alignSelf:'flex-start'}}>{this.state.phone_no}</Text>
              </View>

              <Text style={styles.text_inputtxt}>حدد تاريخ الميلاد</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.showDatePicker()}
                style={[
                  styles.txtinput,
                  {
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  },
                ]}>
                {this.state.Dob == undefined ? (
                  <Text style={{color: 'gray'}}>
                    يرجى تحديد تاريخ الميلاد
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>{ Moment(this.state.Dob).format("YYYY-MM-DD")}</Text>
                )}
                <Iconss
                  style={{alignSelf: 'center'}}
                  name="caretdown"
                  size={15}
                />

                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  // mode="date"
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.getSignUpApiData()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#336D4A', '#53966C', '#73BB8D']}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>تحديث الملف</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        <ProgressDialog loading={this.state.loading} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  text_inputtxt: {letterSpacing: 1, marginTop: 5, marginStart: 15},
  txtinput: {
    backgroundColor: 'white',
    height: 38,
    padding: 8,
    borderRadius: 5,
    textAlign: 'right',
    margin: 8,
    fontWeight: 'bold',
    writingDirection: 'rtl',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
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
    marginTop: 5,
    marginRight: 10,
    fontSize: 16,
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
  imgView: {
    width: 92,
    height: 92,
    borderRadius: 92 / 2,
    alignSelf: 'center',
    borderWidth: 0.2,
  },
});

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = {saveUserData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

