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
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import {connect} from 'react-redux';
import Moment from 'moment';
import FastImage from 'react-native-fast-image';

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      phoneNo: '',
      city: '',
      gender: '',
      username: '',
      dob: '',
      profilPic: '',
    };
   // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  getData = () => {
    console.log('jsonValue get daata');
    this.setState({
      phoneNo: this.props.user.phone,
      username: this.props.user.name,
      city: this.props.user.city,
      gender: this.props.user.gender,
      dob: this.props.user.dob,
      profilPic: this.props.user.profilePic,
    });
  };

  componentDidMount() {
    //this.getData();
   //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.didBlurSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getData();
      },
    );
  }

componentWillUnmount() {
 //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.didBlurSubscription();
  }

  handleBackButtonClick() {
   // BackHandler.exitApp();
   //this.props.navigation.goBack(null)
    return true;
}

  render() {
    var Data = [
      {
        id: 1,
        Txt: 'رقم الهاتف.',
        txt: this.state.phoneNo,
      },
      {
        id: 2,
        Txt: 'مدينة',
        txt: this.state.city,
      },
      {
        id: 3,
        Txt: 'جنس',
        txt: this.state.gender,
      },
      {
        id: 4,
        Txt: 'تاريخ الولادة',
        txt: Moment(this.state.dob).format('YYYY-MM-DD'),
      },
    ];

    return (
      <SafeAreaView style={{flex: 1}}>
        <GeneralStatusBarColor barStyle="light-content" />
        <LinearGradient
          colors={['#319D5E', '#287F4C', '#1A5433']}
          style={styles.gradiantview}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1,
              //marginTop:20
              //marginVertical: 20,
            }}>
            الملف الشخصي
          </Text>
        </LinearGradient>

        <View style={styles.subview}>
          <View
            style={{flex: 1, marginHorizontal: 25, justifyContent: 'center'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('EditProfile')}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <Feather
                    name="edit"
                    size={18}
                    color="white"
                    style={{alignSelf: 'center'}}
                  />
                </View>
                {this.state.profilPic != null ? (
                  <View style={styles.imgView}>
                    <FastImage
                      style={styles.imgView}
                      source={{
                        uri:
                          'https://familytrees12.s3.ap-south-1.amazonaws.com/' +
                          this.state.profilPic,
                      }}
                    />
                  </View>
                ) : (
                  <View style={{...styles.imgView, borderWidth: 0.5}}>
                    <FastImage
                      style={styles.imgView}
                      //source={require('../assets/bg.jpg')}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#2B7D4E', '#2B7D4E', '#2B7D4E']}
                style={{alignSelf: 'center', borderRadius: 5, marginTop: 10}}>
                {/* <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/imgBg/whatsapp.png')}
                />
                 */}

                <Text
                  onPress={() =>
                    this.props.navigation.navigate('FamilyTree', {
                      user_Id: this.props.user._id,
                      ProfilePic: this.state.profilPic,
                      name: this.state.username

                    })
                  }

                  // user_Id: this.state.id,ProfilePic:this.state.ProfilePic,name:this.state.name
                 
                 
                 style={{padding: 5, color: 'white', fontWeight: '600'}}>
                    

                  شجرة العائلة
                </Text>
              </LinearGradient>
            </View>

            <Text style={{...styles.usernameView, marginTop: 10}}>
              {this.state.username}
            </Text>

            <View style={styles.horizontalView} />

            {Data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 30,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      ...styles.usernameView,
                      color: '#1A5433',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    {item.Txt}
                  </Text>
                  <Text
                    style={{
                      ...styles.usernameView,
                      color: 'black',
                      fontWeight: '500',
                      fontSize: 14,
                    }}>
                    {item.txt}
                  </Text>
                </View>
              );
            })}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('AddFamily')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#2B7D4E', '#2B7D4E', '#2B7D4E']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>إنشاء شجرة عائلة</Text>
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color="white"
                  style={{alignSelf: 'center', marginStart: 10}}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subview: {
    flex: 1,
    marginHorizontal: 20,
    //marginVertical:  35,
    //marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F5F6FC',
    // backgroundColor: 'red',
    borderWidth: 0.6,
    justifyContent: 'center',
    // marginTop: -250,

    position: 'absolute',
    bottom: 30,
    width: '90%',
    height: '85%',
  },
  gradiantview: {
    height: '45%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    //elevation: 8,
  },
  imgView: {width: 92, height: 92, borderRadius: 92 / 2, borderWidth: 0.3},
  horizontalView: {
    height: 0.5,
    width: '60%',
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 10,
  },
  usernameView: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 17,
    letterSpacing: 1,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    margin: 9,
    padding: 2,
    color: '#ffffff',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginHorizontal: 30,
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 30,
    alignSelf: 'center',
    flexDirection: 'row',

    //elevation:3
    //borderWidth:0.6
  },
});

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(MyProfile);
