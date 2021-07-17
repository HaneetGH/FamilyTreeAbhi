import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import ProgressDialog from '../components/ProgressDialog';
import service from '../Service';
import FastImage from "react-native-fast-image";
import {connect} from 'react-redux';


class ContactScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchInput: '',
      isFetching: false,
      
    };
  }

  componentDidMount(){
   // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.getApiData();

  //  this.unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  }

  componentWillUnmount(){
  // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

  // this.unsubscribe;
  }

  getApiData= () =>{
    this.setState({loading:true})

    service.get('User/UserAllList')

    .then((response)=> {
     console.log(response.data);
      this.setState({loading:false,isFetching: false})
     if(response.data.status == 1){
      
       this.setState({Data:response.data.data})
     }else{
      console.log(response.data.message);
     }

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onRefresh=()=>{
    this.setState({isFetching: true,},() => {this.getApiData();});
  }
  
  SearchData=()=>{
       
    if(this.state.Data != undefined){
     // console.log("SearchData",this.state.Data);

    return this.state.Data.filter(item =>
      (typeof item.name === 'string' && item.name.toLowerCase().includes(this.state.searchInput.toLowerCase())) 
      || (typeof item.name === 'number') && item.name === Number(this.state.searchInput))

     }else{
     
      console.log("somthing went wrong");
     }
  }

  handleBackButtonClick() {
    //this.props.navigation.goBack(null);
    BackHandler.exitApp();
    return true;
}

  _renderItem = ({item}) => {
    return (
     
    item._id != this.props.user._id ?  <View>
        
          <View style={{flexDirection: 'row', padding: 10}}>
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 55 / 2,
                alignSelf: 'center',
                borderWidth: 0.6,
                borderColor: '#236840',
                backgroundColor: 'white',
              }}
            >
              <FastImage style = {{ width: 55,
                height: 55,
                borderRadius: 55 / 2,
                alignSelf: 'center',
                borderWidth: 0.6,
                borderColor: '#236840',
                backgroundColor: 'white',}} source = {{uri:"https://familytrees12.s3.ap-south-1.amazonaws.com/"+item.profilePic}}/>
            </View>

            <View style={{marginHorizontal: 14, alignSelf: 'center', flex: 1}}>
              <Text
                style={{
                  fontFamily: 'MerriweatherSans-Regular',
                  fontSize: 13,
                  fontWeight: '300',
                  alignSelf: 'flex-end',
                }}>
                {item.name}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text onPress ={()=>this.props.navigation.navigate('Chat',{senderID:item._id,deviceToken:item.deviceToken})} style={{...styles.flatTxt,fontWeight:'bold',padding:8}}>رسالة</Text>
                <Text
                  onPress={() =>
                    this.props.navigation.navigate('SearchedProfile',{rowData:item})
                  }
                  style={{
                    ...styles.flatTxt,
                    color: 'black',
                   // backgroundColor:'black',
                    fontSize: 12,
                    marginTop: 4,
                  }}>
                  زيارة الملف الشخصي
                </Text>
              </View>
            </View>
          </View>
       
        
          <View style={{height: 0.5, backgroundColor: 'gray', flex: 1}} />
        
      </View> :null
    );
  };

  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/04.png')}>
        <SafeAreaView style={{marginHorizontal: 10, flex: 1}}>
          <GeneralStatusBarColor barStyle="light-content" />

          <Text style={styles.maintxt}>جهات الاتصال</Text>

          <View style={styles.subview}>
            <LinearGradient
              colors={['#339059', '#2A7E4E', '#20613C']}
              style={styles.searchMainview}>
              <TextInput
                style={styles.searchTxtInput}
                placeholder="بحث.."
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                selectionColor={'black'}
                // numberOfLines={1}
                autoCapitalize="none"
                value={this.state.searchInput}
                onChangeText={text => this.setState({searchInput: text})}
              />
              <FontAwesome
                style={{alignSelf: 'center'}}
                name="search"
                color="white"
                size={18}
              />
            </LinearGradient>

            <FlatList
              showsVerticalScrollIndicator={false}

            //   initialNumToRender={3}
            //  // refreshing={this.state.refreshing}
            //   onEndReachedThreshold={0.5}
            //   onEndReached={({ distanceFromEnd }) => {
            //     console.log('on end reached ', distanceFromEnd);
            //   }}
             
              data={this.SearchData()}
              extraData={this.state}
             onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
        <ProgressDialog loading={this.state.loading} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  subview: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: '#F5F6FC',
    // borderWidth:1,
    // justifyContent: 'center',
  },
  maintxt: {
    fontFamily: 'MerriweatherSans-ExtraBold',
    fontSize: 16,
    letterSpacing: 1,
    // marginVertical: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  searchMainview: {
    backgroundColor: '#236640',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-between',
    paddingStart: 14,
    paddingEnd: 14,
    flexDirection: 'row',
    padding: 8,
    elevation: 7,
  },
  searchTxtInput: {
    fontFamily: 'MerriweatherSans-Bold',
   // alignSelf: 'center',
    paddingStart: 10,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign:'right',
    color: 'white',
    width: '80%',
  },
  flatTxt: {
    fontFamily: 'MerriweatherSans-Regular',
    fontSize: 13,
    fontWeight: '300',
    color: '#236840',
  },
});

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(ContactScreen);

