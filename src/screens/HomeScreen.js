import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  Image,
  ToastAndroid,
  BackHandler
} from 'react-native';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import service from '../Service'
import ProgressDialog from '../components/ProgressDialog';
import PushController from './PushController';
import Toast from 'react-native-simple-toast';



class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      Data:[],
      loading:false,
      clickcount:0
    };
  }

   componentDidMount(){

    this.getApiData();
    
  
}

componentWillUnmount() {
 
}


getApiData=()=>{

  this.setState({loading:true})

  service.get('News/usernewsfeedList')

  .then((response)=> {
   console.log(response.data);
    this.setState({loading:false,isFetching: false})

   if(response.data.status == "1"){
    console.log("%%%%%%%%%%%%");
     this.setState({Data:response.data.data})
   }

  })
  .catch(function (error) {
    console.log(error);
  });
}




onRefresh=()=>{
  this.setState({isFetching: true,},() => {this.getApiData();});
}


  _renderItem = ({item, index}) => {
    console.log("%%%%%%%%%%%%",item._id);
  return (
     
  
     <View>
        {index % 2 == 0 ? (
          <View style={styles.flatlist_mainView}>
            <View style={styles.subView}>
              <Image style ={{width:'100%',height:80,borderRadius:10}} source = {{uri:"https://familytrees12.s3.ap-south-1.amazonaws.com/"+item.image}}/>
            </View>
            <View style={{...styles.textView, marginStart: '2%'}}>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{...styles.txt}}>
                {item.text}
              </Text>

              <Text
                onPress={() => this.props.navigation.navigate('ReadMoreScreen',{rowData:item.text,img:item.image,postId:item._id})}
                style={styles.readMoretxt}>
                قراءة المزيد
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.flatlist_mainView}>
            <View style={styles.textView}>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{...styles.txt}}>
                {item.text}
              </Text>
              <Text
                onPress={() => this.props.navigation.navigate('ReadMoreScreen',{rowData:item.text,img:item.image,postId:item._id})}
                style={styles.readMoretxt}>
                قراءة المزيد
              </Text>
            </View>

            <View style={{...styles.subView, marginStart: '2%'}}>
              <Image style ={{width:'100%',height:80,borderRadius:10}} source = {{uri:"https://familytrees12.s3.ap-south-1.amazonaws.com/"+item.image}}/>
            </View>
          </View>
        )}
      </View>
   );
  };

  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/04.png')}>
        <SafeAreaView style={{marginHorizontal: 10, flex: 1}}>
          <GeneralStatusBarColor barStyle="light-content" />

          <Text
            style={{
              fontFamily: 'MerriweatherSans-ExtraBold',
              fontSize: 16,
              letterSpacing: 1,
              marginVertical: 10,
              textAlign: 'center',
            }}>
            الصفحة الرئيسية
          </Text>
          <View
            style={{
              height: 0.6,
              backgroundColor: 'black',
              marginHorizontal: 40,
            }}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.Data}
            renderItem={this._renderItem}
            extraData={this.state}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            
          />
        </SafeAreaView>
       <ProgressDialog loading = {this.state.loading}/>
       <PushController/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  flatlist_mainView: {flexDirection: 'row', height: 80, marginVertical: 15},
  subView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '25%',
    //height:90,
    borderWidth: 0.7,
  },
  textView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '73%',
    borderWidth: 0.7,
    // marginStart:'3%'
  },
  txt: {
    textAlign: 'justify',
    paddingTop: 10,
    paddingStart: 10,
    paddingRight: 10,
    fontSize: 10,
    fontFamily: 'MerriweatherSans-Regular',
  },
  readMoretxt: {
    color: '#4F8066',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'MerriweatherSans-ExtraBold',
  },
});

export default HomeScreen;
