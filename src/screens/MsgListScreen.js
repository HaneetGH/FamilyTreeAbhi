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
import { connect } from "react-redux";



class MsgListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchInput: '',
      isFetching: false,
      Data: [],
      MsgData:[]

    };

    
  }
componentDidMount(){
  //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  this.getApiData();
  
 
  this.didBlurSubscription = this.props.navigation.addListener('focus', () => {
    this.getMsgApiData();
  });

}
componentWillUnmount(){
 this.didBlurSubscription;
 //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

}
// handleBackButton(){
//   BackHandler.exitApp();
//   return true;
// }


  onRefresh=()=>{
    this.setState({isFetching: true,},() => {
      this.getApiData();
      this.getMsgApiData()});
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


  getMsgApiData= () =>{
    this.setState({loading:false})

    service.get('api/family/Chat/chat_user/'+this.props.user._id)

    .then((response)=> {
     console.log(response.data);
      this.setState({loading:false,isFetching: false})
     if(response.data.status == 1){
      
       this.setState({MsgData:response.data.data})

     }else{
      console.log(response.data.message);
     }

    })
    .catch(function (error) {
      console.log(error);
    });
  }



  SearchData=()=>{
    console.log(this.state.MsgData.length)


    if(this.state.MsgData.length != 0 && this.state.MsgData.length != undefined){
      if(this.state.MsgData != undefined){
        // console.log("SearchData",this.state.Data);
   
       return this.state.MsgData.filter(item =>
         (typeof item.name === 'string' && item.name.toLowerCase().includes(this.state.searchInput.toLowerCase())) 
         || (typeof item.name === 'number') && item.name === Number(this.state.searchInput))
   
        }else{
        
         console.log("somthing went wrong");
        }

    }else{

      if(this.state.Data != undefined){
        // console.log("SearchData",this.state.Data);
   
       return this.state.Data.filter(item =>
         (typeof item.name === 'string' && item.name.toLowerCase().includes(this.state.searchInput.toLowerCase())) 
         || (typeof item.name === 'number') && item.name === Number(this.state.searchInput))
   
        }else{
        
         console.log("somthing went wrong");
        }

   }

   
    
  
  }

  _renderItem = ({item, index}) => {
    return (
      
      item._id != this.props.user._id ?   
       <TouchableOpacity activeOpacity = {1} onPress = {()=>this.props.navigation.navigate('Chat',{senderID:item._id,deviceToken:item.deviceToken})}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 55 / 2,
              alignSelf: 'center',
              borderWidth: 0.6,
              borderColor: '#236840',
              backgroundColor:'white'
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

          <View style={{marginHorizontal: 14, alignSelf: 'center', flex: 1,backgroundColor:'#EFF0F3'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: 'MerriweatherSans-Bold',
                  fontSize: 13,
                  fontWeight: '300',
                }}>
                {item.name}
              </Text>
              <Text style={{...styles.flatTxt, color: 'gray', fontSize: 10}}>
              
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.flatTxt,
                  color: 'black',
                  fontSize: 12,
                  textAlign:'center',
                  width: '85%',
                  marginTop:6
                }}>
                {item.latest_message}
              </Text>

           {/*   <View
                style={{
                  backgroundColor:'#236840',
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                  alignSelf: 'center',
                }}>
                 <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    padding: 3,
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}>
                  {index}
                </Text> 
              </View>*/}
            </View>
          </View>
        </View>
        <View style={{height: 0.5, backgroundColor: 'gray', flex: 1}} />
      </TouchableOpacity> :null
    );
  };

  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/04.png')}>
    <GeneralStatusBarColor backgroundColor="#557A68"
      barStyle="light-content"/>

        <SafeAreaView style={{marginHorizontal: 10, flex: 1}}>
          <View style={styles.subview}>
            <View style={styles.searchMainview}>
              
              <Text style={styles.searchTxtInput}>Messages</Text>
           
              <TextInput
                style={{...styles.searchTxtInput,width:150}}
                placeholder="بحث.."
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                selectionColor={'black'}
                maxLength ={10}
                // numberOfLines={1}
                autoCapitalize="none"
                value={this.state.searchInput}
                onChangeText={text => this.setState({searchInput: text})}
              />

              <FontAwesome 
                style={{alignSelf: 'center'}}
                name="search"
                color="#236840"
                size={18}
              />
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
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
    marginVertical: 15,
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
    // backgroundColor: '#236640',
    // borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
    justifyContent: 'space-between',
    paddingStart: 14,
    paddingEnd: 20,
    flexDirection: 'row',
    padding: 8,
    elevation: 7,
  },
  searchTxtInput: {
    fontFamily: 'MerriweatherSans-Regular',
    alignSelf: 'center',

    // paddingStart: 30,
    paddingTop: 6,
    fontSize: 18,
    // paddingBottom: 0,
    //width: '80%',
  },
  flatTxt: {
    fontFamily: 'MerriweatherSans-Regular',
    fontSize: 13,
    fontWeight: '300',
    color: '#236840',
  },
});

const mapStateToProps = state => ({ user: state.user });


export default connect(
  mapStateToProps,
)(MsgListScreen);


