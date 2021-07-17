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
  Keyboard,
  Platform,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import service from '../Service';
import ProgressDialog from '../components/ProgressDialog';
import axios from 'axios';
import Header from '../components/Header';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import { StackActions } from '@react-navigation/native';

class AddFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      phone_no: '',
      relation: '',
      addData: [0],
      profilePic: '',
      value: 0,
      username: '',
      loading: false,
      userId: '',
      fileData: '',
      setImagesUri: '',
    };
  }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  // }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   
      
  //    }
   
  //    handleBackButtonClick() {
  //     this.props.navigation.goBack(null)
      

  //      return true;
  //  }
   

  addFamillyDetails = async () => {
    if (this.state.username == '') {
      Toast.show('الرجاء إدخال اسم المستخدم');
    } else if (this.state.relation == '') {
      Toast.show('الرجاء إدخال العلاقة');
    } else if (this.state.city == '') {
      Toast.show('الرجاء إدخال المدينة');
    } else if (this.state.phone_no == '') {
      Toast.show('الرجاء إدخال رقم الهاتف');
    } else if (isNaN(this.state.phone_no)) {
      Toast.show('الرجاء إدخال رقم الهاتف صحيح');
    }
    //  else if (this.state.profilePic == '') {
    //   Toast.show('Please Add photo ');
    // }
     else {
      Keyboard.dismiss();
      this.setState({loading: true});

      var photo = {
        uri: this.state.setImagesUri.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };

      var formData = new FormData();
      formData.append('uid', this.props.user._id);
      formData.append('profilePic', photo);
      formData.append('name', this.state.username);
      formData.append('relation', this.state.relation);
      formData.append('city', this.state.city);
      formData.append('contact', this.state.phone_no);

      console.log('formdata', formData);

      axios({
        method: 'POST',
        url:
          'http://ec2-52-66-250-93.ap-south-1.compute.amazonaws.com:3000/api/family/Member/addMember',
        data: formData,
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log(response.data);
          this.setState({loading: false});
          if (response.data.status == 1) {
            Toast.show('member added successfully');

            setTimeout(() => {
              this.props.navigation.goBack(null);
              this.setState({
                username: '',
                relation: '',
                city: '',
                phone_no: '',
                fileData: '',
              });
            }, 800);
          }
        })
        .catch(function(error) {
          console.log(error);
          // Toast.show(error);
        });
    }
  };

  chooseImage = () => {
    const options = {
      title: 'Select Image',
      //customButtons: [{ name: 'Camera', title: 'Choose Photo from Gallary' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
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
        const source = {uri: response.uri};

        console.log('source', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const file = {
          uri: response.uri,
          name: 'imagename.jpg',
          type: response.type,
          size: response.fileSize,
          slice: () => new Blob(),
        };

        this.setState({
          profilePic: source,
          fileData: file,
          setImagesUri: response,
        });

        // console.log("file",file);
      }
    });
  };

  render() {
    let screenHeight = Dimensions.get('window').height;

    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/imgBg/06.png')}>
        <GeneralStatusBarColor barStyle="light-content" />

        <SafeAreaView style={{}}>
          <Header
            onPress={() => this.props.navigation.goBack(null)}
            headerTxt="إضافة عائلة"
            //style= {{backgroundColor:'#2E8451'}}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{height: screenHeight + 10}}>
            <View style={{...styles.subview}}>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.txtinput}
                  underlineColorAndroid="transparent"
                  placeholder="اسم المستخدم"
                  placeholderTextColor="#2B7D4E"
                  numberOfLines={1}
                  autoCapitalize="none"
                  value={this.state.username}
                  onChangeText={text => this.setState({username: text})}
                />
              </View>

              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.txtinput}
                  placeholder="علاقة"
                  placeholderTextColor="#2B7D4E"
                  underlineColorAndroid="transparent"
                  numberOfLines={1}
                  autoCapitalize="none"
                  value={this.state.relation}
                  onChangeText={text => this.setState({relation: text})}
                />
              </View>

              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.txtinput}
                  placeholder="مدينة "
                  placeholderTextColor="#2B7D4E"
                  underlineColorAndroid="transparent"
                  numberOfLines={1}
                  autoCapitalize="none"
                  value={this.state.city}
                  onChangeText={text => this.setState({city: text})}
                />
              </View>

              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.txtinput}
                  underlineColorAndroid="transparent"
                  placeholder="رقم الهاتف."
                  placeholderTextColor="#2B7D4E"
                  keyboardType="numeric"
                  maxLength={10}
                  numberOfLines={1}
                  autoCapitalize="none"
                  value={this.state.phone_no}
                  onChangeText={text => this.setState({phone_no: text})}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  marginHorizontal: 2,
                }}>
                <View style={styles.imgView}>
                  <FastImage
                    style={styles.imgView}
                    source={this.state.profilePic}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.chooseImage()}
                  activeOpacity={1}
                  style={{
                    ...styles.txtinput,
                    flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      letterSpacing: 1,
                      color: '#2B7D4E',
                      alignSelf: 'center',
                    }}>
                    إضافة صورة
                  </Text>
                  <AntDesign
                    name="pluscircle"
                    size={20}
                    color="green"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => this.addFamillyDetails()}
                activeOpacity={1}
                style={{
                  ...styles.txtinput,
                  width: 130,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  borderRadius: 2,
                  height: 35,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    letterSpacing: 1,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    padding: 4,

                    fontSize: 13,
                  }}>
                  أضف المزيد
                </Text>
                <AntDesign
                  name="plus"
                  size={13}
                  color="black"
                  style={{alignSelf: 'center', padding: 5}}
                />
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
    borderRadius: 10,
    margin: 8,

    letterSpacing: 1,
    borderWidth: 0.3,
    textAlign: 'right',
    writingDirection: 'rtl',
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
    width: 84,
    height: 84,
    borderRadius: 84 / 2,
    borderWidth: 0.3,
    backgroundColor: 'white',
  },
  maintxt: {
    //marginVertical: 20,
    fontWeight: '500',
    // padding: 6,
    fontSize: 18,
    letterSpacing: 2,
    alignSelf: 'center',
  },
  subview: {
    //flex: 1,
    //width:'90%',
    marginHorizontal: 20,
    padding: 10,
    marginTop: 30,
    //borderRadius: 15,
    // backgroundColor: '#F5F6FC',
    // borderWidth: 0.6,
  },
});

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(AddFamily);
