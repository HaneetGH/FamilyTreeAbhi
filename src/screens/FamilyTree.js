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
  FlatList,
} from 'react-native';

import Header from '../components/Header';
import ProgressDialog from '../components/ProgressDialog';
import service from '../Service';
import Toast from 'react-native-simple-toast';
import FastImage from "react-native-fast-image";


export default class FamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      Family: [],
      Id: props.route.params.user_Id,
      ProfilePic:props.route.params.ProfilePic,
      name:props.route.params.name
    };
  }

  componentDidMount() {
    this.getFamilyTreeApiData();
    console.log(this.state.Id)
  }

  _renderItem = ({item}) => {
    return (
      <View style={{alignSelf:'center',flex:1}}>
        <View style={{...styles.verticalLine, height: 30}} />
        <View style={{...styles.boxView, marginTop: 0}}>
          {/* <ImageBackground style = {{width:40,height:40,alignSelf:'center'}} source = {require('../assets/imgBg/load.png')}>  */}
          <FastImage
            style={{
              width: 75,
              height: 75,
              borderWidth: 0.6,
              alignSelf: 'center',
            }}
            source={{
              uri:
                'https://familytrees12.s3.ap-south-1.amazonaws.com/' +
                item.profilePic,
            }}
          />
          {/* </ImageBackground>    */}
        </View>
        <Text
          style={{
            ...styles.nametxt,
            marginTop: 2,
            fontSize: 12,
            width: 100,
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>

        <Text
          style={{
            ...styles.nametxt,
            marginTop: 2,
            fontSize: 12,
            width: 100,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          ({item.relation})
        </Text>
      </View>
    );
  };

  getFamilyTreeApiData = () => {
    this.setState({loading: true});

    service
      .post('Member/showUserTree', {uid: this.state.Id})

      .then(response => {
        console.log('FamilyTree', response.data);
        this.setState({loading: false});
        if (response.data.status == 1) {
          this.setState({Family: response.data.data});
        } else {
          //Toast.show(response.data.message);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    console.log("FamilyTreePic",this.state.ProfilePic);
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/imgBg/02.png')}>
        <SafeAreaView style={{flex: 1,marginTop:20}}>
          {/* <Text style={styles.maintxt}>FAMILY TREE</Text> */}
          <Header
            onPress={() => this.props.navigation.goBack(null)}
            headerTxt="شجرة العائلة"
            // style= {{backgroundColor:'#2E8451'}}
          />

          <View style={{marginTop: 0,flex:1 ,marginBottom:160}}>
    <Text style={{...styles.nametxt}}>{this.state.name}</Text>
            <View style={{...styles.boxView, marginTop: 0}}>
          {/* <ImageBackground style = {{width:40,height:40,alignSelf:'center'}} source = {require('../assets/imgBg/load.png')}>  */}
          <FastImage
            style={{
              width: 75,
              height: 75,
              borderWidth: 0.6,
              alignSelf: 'center',
            }}
            source={{
              uri:
                'https://familytrees12.s3.ap-south-1.amazonaws.com/' +
                this.state.ProfilePic,
            }}
          />
          {/* </ImageBackground>    */}
        </View>
            <View style={styles.verticalLine} />

            <View
              style={{
                height: 1,
                width: '67%',
                backgroundColor: 'gray',
                alignSelf: 'center',
              }}
            />

           <View style ={{}}>
            <FlatList
             showsVerticalScrollIndicator ={false}
              data={this.state.Family}
               //has to be unique
              renderItem={this._renderItem} //method to render the data in the way you want using styling u need
             // horizontal={false}
              numColumns={3}
              keyExtractor={(item, index) => item.Utid}
            />
          </View>  
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
    width: 75,
    height: 75,
    marginTop: 5,
    marginHorizontal: 13,
  },
  verticalLine: {
    height: 40,
    width: 1,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  nametxt: {alignSelf: 'center', color: 'black', marginTop: 0},
});
