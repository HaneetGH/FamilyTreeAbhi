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
  ImageBackground,
  Animated,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import FastImage from "react-native-fast-image";
import Moment from 'moment';


export default class SearchedProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.route.params.rowData._id,
      RowData: props.route.params.rowData,
      name: props.route.params.rowData.name,
      city: props.route.params.rowData.city,
      gender: props.route.params.rowData.gender,
      Mobile: props.route.params.rowData.phone,
      ProfilePic: props.route.params.rowData.profilePic,
      //dob: Moment(props.route.params.rowData.dob).format("YYYY-MM-DD")
      dob:  props.route.params.rowData.dob
    };
  }

  componentDidMount() {
    if(this.state.dob != undefined){
      this.setState({dob:Moment(this.state.dob).format("YYYY-MM-DD") })
    }else{
      console.log("undefind")
    }

  
  }

  render() {
    console.log('userid++++++++++', this.state.id);
    var Data = [
      {
        id: 1,
        Txt: 'رقم الهاتف',
        txt: this.state.Mobile,
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
        txt:this.state.dob,
      },
    ];

    return (
      <SafeAreaView style={{flex: 1}}>
        <GeneralStatusBarColor barStyle="light-content" />
        <LinearGradient
          colors={['#319D5E', '#287F4C', '#1A5433']}
          style={styles.gradiantview}>
          <Header
            onPress={() => this.props.navigation.goBack(null)}
            headerTxt="الملف الشخصي الذي تم البحث عنه"
            //style= {{backgroundColor:'#2E8451'}}
          />
        </LinearGradient>

        <View style={styles.subview}>
          <View
            style={{flex: 1, marginHorizontal: 20, justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                //justifyContent: 'center',
                marginBottom: 30,
                justifyContent:"space-between"
              }}>
              <View style={styles.imgView}>
                {this.state.ProfilePic != undefined ? (
                  <FastImage
                    style={styles.imgView}
                    source={{
                      uri:
                        'https://familytrees12.s3.ap-south-1.amazonaws.com/' +
                        this.state.ProfilePic,
                    }}
                  />
                ) : (
                  <Image style={{...styles.imgView, borderWidth: 0.5}} />
                )}
              </View>

              <TouchableOpacity onPress ={()=> 
                Linking.openURL('whatsapp://send?phone=91'+this.state.Mobile)} style={{alignSelf: 'center', marginTop: 10}}>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/imgBg/whatsapp.png')}
                />
                <Text style={{color: '#4CAF50', alignSelf: 'center'}}>
                  CHAT
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{...styles.usernameView, marginTop: 10}}>
              {this.state.name}
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
                    {item.Txt}{' '}
                  </Text>
                  <Text
                    style={{
                      ...styles.usernameView,
                      color: 'black',
                      fontWeight: '500',
                      fontSize: 14,
                    }}>
                    {item.txt}{' '}
                  </Text>
                </View>
              );
            })}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                this.props.navigation.navigate('FamilyTree', {
                  user_Id: this.state.id,ProfilePic:this.state.ProfilePic,name:this.state.name
                })
              }>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#2B7D4E', '#2B7D4E', '#2B7D4E']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>عرض شجرة العائلة</Text>
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
    borderRadius: 30,
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
  imgView: {width: 92, height: 92, borderRadius: 92 / 2},
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
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    margin: 9,
    padding: 2,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 25,
    alignSelf: 'center',
    //elevation:3
    //borderWidth:0.6
  },
});

