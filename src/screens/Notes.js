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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';



let CopyaddData =  [0]

class AddFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      city: '',
      phone_no: '',
      relation: '',
      addData:[0],
      profilePic: '',
      value:0,
    //   username:this.addData.map((item,index)=>{
    //     return item;
    // }),
    username:''
    };
  }

  // addMoreComponent = () => {
  //   const {addData} = this.state;
  //    var i = addData.length;

  //       this.setState({addData: [...addData, i]}, () =>
  //       console.log('updated state', addData),
        
  //     );
      
  // };

  // removeComponent=(id)=>{
  //   const {addData} = this.state;
  //   let allItems = [...addData];
  //   let filteredItems = allItems.filter(item => item!= id);
  //   this.setState({addData: filteredItems} , () =>
  //   console.log('updated state after delete', addData));
  // }

  chooseImage=()=>{
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

        this.setState({
          profilePic: source,
        });
      }
    });
  }


  _renderAddFamilyData=()=>{
      var i = this.state.addData[this.state.addData.length -1 ]

     { return this.state.addData.map((item,index) => {
        return (
          <View  key ={index} style={{...styles.subview,marginBottom:80}}>
           
          {index != 0 && <Icons onPress ={()=> this.removeComponent(item)} name ="squared-cross" size ={23} style ={{alignSelf:'flex-end'}} /> }
           
            <View style={{marginTop: 5}}>
                <TextInput
                style={styles.txtinput}
                underlineColorAndroid="transparent"
                placeholder="USERNAME "
                placeholderTextColor="#2B7D4E"
                numberOfLines={1}
                autoCapitalize="none"
                value={this.state.username[index]}
                onChangeText={text => this.setState({ ...this.state.username.slice(0, index), text, ...this.state.username.slice(index+1, this.state.username.length)})}
              />
            </View>

            <View style={{marginTop: 5}}>
              <TextInput
                style={styles.txtinput}
                placeholder="RELATION "
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
                placeholder="CITY "
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
                placeholder="PHONE NO."
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
                <Image
                  style={styles.imgView}
                  source={this.state.profilePic}
                />
              </View>
              <TouchableOpacity 
              onPress={()=> this.chooseImage()}
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
                  ADD PHOTO
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
              onPress={() => this.addMoreComponent()}
              activeOpacity={1}
              style={{
                ...styles.txtinput,
                width: 110,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderRadius: 0,
                height: 35,
                marginTop: 20,
                
              }}>
              <Text
                style={{
                  letterSpacing: 1,
                  //fontWeight:'bold',
                  alignSelf: 'center',
                  padding: 2,
                  fontSize: 15,
                }}>
                Add More
              </Text>
              <AntDesign
                name="plus"
                size={13}
                color="black"
                style={{alignSelf: 'center', padding: 5}}
              />
            </TouchableOpacity>
          </View>
        );
      })}
  }

  render() {
    let screenHeight = Dimensions.get('window').height;
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/06.png')}>
        <SafeAreaView style={{}}>
        <GeneralStatusBarColor
         barStyle="light-content"/>
        <Ionicons
        onPress ={()=>this.props.navigation.goBack(null)}
            style={{marginHorizontal:15,marginTop:20}}
            name="md-arrow-back"
            size={20} 
            color="black"
          />

          <Text style={styles.maintxt}>ADD FAMILY</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}>

                { this._renderAddFamilyData()}
            
          </ScrollView>
        </SafeAreaView>
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
    //fontWeight:'bold'
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
    marginVertical: 20,
    fontWeight: '500',
    padding: 6,
    fontSize: 18,
    letterSpacing: 2,
    alignSelf: 'center',
  },
  subview: {
  // flex: 1,
    //width:'90%',
    marginHorizontal:20,
    padding:10,
    borderRadius: 15,
    backgroundColor: '#F5F6FC',
    borderWidth: 0.6,
  
  },
});

export default AddFamily;












import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList
} from 'react-native';

import Header from '../components/Header';
import ProgressDialog from '../components/ProgressDialog';
import service from '../Service';
import Toast from 'react-native-simple-toast';

export default class FamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Family:[],
       Id:props.route.params.user_Id
     
    };
  }
 
  componentDidMount(){
    this.getFamilyTreeApiData();
  }

  getFamilyTreeApiData=()=>{
    this.setState({loading:true})

    service.post('/showUserTree',{uid:this.state.Id})

    .then((response)=> {
      console.log("FamilyTree",response.data);
      this.setState({loading:false})
     if(response.data.status == "1"){
       this.setState({Family:response.data.data.Family_List})
     }else{
      Toast.show(response.data.message)
     }

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    console.log(this.state.Id)
    return (
      <ImageBackground
        style={{width:'100%', height: '100%'}}
        source={require('../assets/imgBg/02.png')}>
        <SafeAreaView style={{flex: 1}}>
          {/* <Text style={styles.maintxt}>FAMILY TREE</Text> */}
          <Header
            onPress={() => this.props.navigation.goBack(null)}
            headerTxt="شجرة العائلة"
            // style= {{backgroundColor:'#2E8451'}}
          />

          
            <View style ={{marginTop:30}}>
              <Text style={{...styles.nametxt}}>أنا</Text>
              <View style={styles.boxView} />
              <View style={styles.verticalLine} />

              <View
                style={{
                  height: 1,
                  width: '80%',
                  backgroundColor: 'gray',
                  alignSelf: 'center',
                }}
              />
            
          <ScrollView showsHorizontalScrollIndicator ={false} >
              <View 
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {this.state.Family.map((item,index) => {
                  return (
                    <View key={index} style={{}}>
                    
                      <View style={{...styles.verticalLine, height: 30}} />
                      <View style={{...styles.boxView, marginTop: 0}} >
                        {/* <ImageBackground style = {{width:40,height:40,alignSelf:'center'}} source = {require('../assets/imgBg/load.png')}>  */}
                      <Image style ={{width:70,height:70,borderWidth:0.6,alignSelf:'center'}} source = {{uri:"https://familytrees12.s3.ap-south-1.amazonaws.com/"+item.ProfilePic}}/>
                      {/* </ImageBackground>    */}
                      </View>
                      <Text
                        style={{
                          ...styles.nametxt,
                          marginTop: 2,
                          fontSize: 12,
                          width:100,
                          alignSelf:'center',
                          textAlign:'center',
                          fontWeight:'bold'
                        }}>
                       {item.Name}
                      </Text>

                      <Text
                        style={{
                          ...styles.nametxt,
                          marginTop: 2,
                          fontSize: 12,
                          width:100,
                          alignSelf:'center',
                          textAlign:'center',
                          
                        }}>
                       ({item.Relation})
                      </Text>
                     
                      {/* {item.data.map(subitem => {
                        return (
                          <View>
                            <View
                              style={{
                                ...styles.verticalLine,
                                height: 30,
                                marginTop: 2,
                              }}
                            />
                            <View style={{...styles.boxView, marginTop: 0}} />
                            <Text
                              style={{
                                ...styles.nametxt,
                                marginTop: 2,
                                fontSize: 12,
                              }}>
                              {subitem.relation}
                            </Text>
                          </View>
                        );
                      })} */}
                    </View>
                  );
                })}
              </View>
              </ScrollView>
            </View>
         
        </SafeAreaView>
        <ProgressDialog loading={this.state.loading} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  maintxt: {
    marginVertical: 20,
    fontWeight: '500',
    padding: 6,
    fontSize: 18,
    letterSpacing: 2,
    alignSelf: 'center',
  },
  boxView: {
    //padding: 5,
    backgroundColor: 'white',
    borderWidth: 0.6,
    alignSelf: 'center',
    width: 70,
    height: 70,
    marginTop: 5,
    marginHorizontal:13,
  },
  verticalLine: {
    height: 40,
    width: 1,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  nametxt: {alignSelf: 'center', color: 'black', marginTop: 40},
});
