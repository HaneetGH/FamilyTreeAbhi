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
  Platform,
  Dimensions,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import service from '../Service';
import ProgressDialog from '../components/ProgressDialog';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

class ReadMoreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      Data: props.route.params.rowData,
      images: props.route.params.img,
      post_id: props.route.params.postId,
      userId: '',
      likesCount: 0,
      likeStatus: false,
      _ALL_LikesData:[]
    };
  }

  componentDidMount() {
    this.ToatalLikesCountApi();
    console.log(this.props.user._id)
  //  this._getData();
  }

  addLikesApi = () => {
    this.setState({loading: true});

    service
      .post('Likes/userLikes', {
        user_id: this.props.user._id,
        post_id: this.state.post_id,
        // liked_status: this.state.likeStatus,
      })

      .then(response => {
        console.log('Likes/userLikes', response.data);
        this.setState({loading: false});
        if (response.data.status == 1) {
          Toast.show(response.data.message);
          this.ToatalLikesCountApi();

          if (response.data.message == 'Likes successfully ') {
            this.setState({liked_status: true});
            this._storeData('true');
          } else {
            this.setState({liked_status: false});
            this._storeData('false');
          }
        } else {
          Toast.show(response.data.message);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  ToatalLikesCountApi = () => {
    this.setState({loading: false});

    service
      .post('Likes/allLikes', {
        post_id: this.state.post_id,
      })

      .then(response => {
        this.setState({loading: false});
        console.log('all likes');
        this.setState({likesCount: response.data.data.length});

         this.setState({_ALL_LikesData:response.data.data})

        // if (this.props.user._id == response.data.data._id) {
        //   console.log('true');
        // } else {
        //   console.log('false');
        // }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  _storeData = async value => {
    try {
      await AsyncStorage.setItem('@LikeStatus', value);
    } catch (error) {
      console.log('store error');
    }
  };

  _getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@LikeStatus');
      if (value !== null) {
        console.log('async+++', value);
      }
    } catch (error) {
      console.log('get error');
    }
  };

  render() {
    let screenHeight = Dimensions.get('window').height;
    console.log();

    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/imgBg/04.png')}>
        <SafeAreaView style={{marginHorizontal: 20, flex: 1}}>
          <GeneralStatusBarColor barStyle="light-content" />

          <Header
            onPress={() => this.props.navigation.goBack(null)}
            headerTxt="قراءة المزيد"
            //style= {{backgroundColor:'#2E8451'}}
          />

          <View style={{marginHorizontal: 8}}>
            <View
              style={{
                //padding: 20,
                backgroundColor: 'white',
                width: '90%',
                marginTop: 20,
                height: 120,
                alignSelf: 'center',
                borderWidth: 0.6,
                marginBottom: 10,
              }}>
              <Image
                style={{width: '100%', height: 120, alignSelf: 'center'}}
                source={{
                  uri:
                    'https://familytrees12.s3.ap-south-1.amazonaws.com/' +
                    this.state.images,
                }}
              />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
                <Text style={{...styles.txt}}>{this.state.Data}</Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>

        <SafeAreaView style={{height: 50, marginHorizontal: 30}}>
          <View style={{flexDirection: 'row'}}>

      
            {this.state.liked_status == true ? (
              <FontAwesome
                onPress={() => this.addLikesApi()}
                name="thumbs-up"
                size={28}
                color="black"
              />
            ) : (
              <FontAwesome
                onPress={() => this.addLikesApi()}
                name="thumbs-o-up"
                size={28}
                color="black"
              />
            )}
            <Text
              style={{
                alignSelf: 'center',
                marginStart: 7,
                color: 'black',
                fontFamily: 'MerriweatherSans-Bold',
                fontSize: 15,
              }}>
              {this.state.likesCount}
            </Text>
            <FontAwesome
              onPress={() =>
                this.props.navigation.navigate('CommentList', {
                  postId: this.state.post_id,
                })
              }
              name="commenting-o"
              size={28}
              color="black"
              style={{marginStart: 50}}
            />
          </View>
        </SafeAreaView>

        <ProgressDialog loading={this.state.loading} />
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  txt: {
    textAlign: Platform.OS == 'ios' ? 'justify' : 'justify',
    fontSize: 14,
    fontFamily: 'MerriweatherSans-Regular',
    marginVertical: 20,
    color: 'white',
    fontWeight: '600',
    padding: 4,
    lineHeight: 23,
    marginBottom: 190,
  },
});
const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(ReadMoreScreen);
