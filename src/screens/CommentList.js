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
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Header from '../components/Header';
import ProgressDialog from '../components/ProgressDialog';
import service from '../Service';
import Toast from 'react-native-simple-toast';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      loading: false,
      postId: props.route.params.postId,
      height: 0,
      fontSize: 16,
      userId: '',
      comment: '',
    };
  }

  componentDidMount() {
    this.getCommentApiData();
    this.setState({userId: this.props.user._id});
    // this.getUserId();
  }

  getCommentApiData = () => {
    this.setState({loading: true});
    service
      .post('Comment/userCommentList', {post_id: this.state.postId})

      .then(response => {
        console.log('userCommentList', response.data);
        this.setState({loading: false});
        if (response.data.status == 1) {
          // Toast.show(response.data.message)
          this.setState({Data: response.data.data});
        } else {
          //Toast.show(response.data.message);
          console.log(response.data.message)
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  writeCommentApi = () => {
    if (this.state.comment == '') {
      Toast.show('please write comment..');
    } else {
      this.setState({loading: true});

      service
        .post('Comment/userComments', {
          user_id: this.state.userId,
          post_id: this.state.postId,
          comment: this.state.comment,
        })

        .then(response => {
          console.log('userComment', response.data);
          this.setState({loading: false});
          if (response.data.status == 1) {
            Toast.show(response.data.message);
            this.getCommentApiData();
            this.setState({comment: ''});
          } else {
            Toast.show(response.data.comment);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  _renderItem = ({item}) => {
    //console.log("https://familytrees12.s3.ap-south-1.amazonaws.com/"+item.user_id.profilePic)
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          //  elevation: 9,
          //padding:5,
          //shadowColor: '#000',
          // shadowOffset: {width: 0, height: 1},
          // shadowOpacity: 0.5,
          //shadowRadius: 1,
          // borderRadius: 8,
          //marginVertical: 10,
          // marginHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <View style={{flexDirection: 'row', padding: 10, marginHorizontal: 20}}>
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 55 / 2,
              alignSelf: 'center',
              borderWidth: 0.6,
              borderColor: '#236840',
              backgroundColor: 'white',
            }}>
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 55 / 2,
                alignSelf: 'center',
                borderWidth: 0.6,
                borderColor: '#236840',
                backgroundColor: 'white',
              }}
              source={{
                uri:
                  'https://familytrees12.s3.ap-south-1.amazonaws.com/' +
                  item.user_id.profilePic,
              }}
            />
          </View>

          <View style={{marginHorizontal: 30, alignSelf: 'center'}}>
            <Text style={styles.txtsty1}>{item.user_id.name}</Text>
            <Text style={styles.txtsty2}>{item.comment}</Text>
          </View>
        </View>

        <View style={{height: 0.5, backgroundColor: 'gray'}} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginTop: 20, flex: 1}}>
          <Header
            onPress={() => this.props.navigation.goBack(null)}
            headerTxt="قائمة التعليقات"
            style= {{backgroundColor:'#2E8451'}}
          />
          <ScrollView
            ref="scrollView"
            onContentSizeChange={(width, height) =>
              this.refs.scrollView.scrollTo({y: height})
            }>
            <View
              style={{
                marginHorizontal: 20,
                borderRadius: 10,
                flex: 1,
                marginTop: 10,
              }}>
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={this.state.Data}
                renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                keyExtractor={(item, index) => item.id}
              />
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginBottom: 20,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <View style={styles.styleInput}>
              <TextInput
                style={[
                  styles.txtinput,
                  {
                    fontSize: this.state.fontSize,
                    height: Math.max(30, this.state.height),
                  },
                ]}
                multiline
                onContentSizeChange={event => {
                  this.setState({height: event.nativeEvent.contentSize.height});
                }}
                placeholder="اكتب تعليق .."
                value={this.state.comment}
                // onChange={event => this.onChangeText(event)}
                onChangeText={text => this.setState({comment: text})}
              />
            </View>

            <Icons
              onPress={() => this.writeCommentApi()}
              style={{alignSelf: 'center', marginLeft: 20}}
              name="insert-comment"
              size={30}
              color={'#1B4C30'}
            />
          </View>

          <ProgressDialog loading={this.state.loading} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ongoingtxt: {
    fontFamily: 'MerriweatherSans-Bold',
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
  },
  mybokingheader: {
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: 'MerriweatherSans-Bold',
    fontSize: 16,
    padding: 8,
    marginHorizontal: 20,
  },
  txtsty1: {
    fontSize: 15,
    color: '#1B4C30',
    textAlign:'left',
    fontFamily: 'MerriweatherSans-Bold',
  },
  txtsty2: {
    marginTop: 5,
    fontSize: 13,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'MerriweatherSans-Regular',
  },
  styleInput: {
    // flex: 1,
    width: '80%',
    alignSelf: 'flex-end',
    elevation: 3,
    padding: 5,
    borderWidth: 0.3,
    borderRadius: 30,
    borderColor: 'green',

    backgroundColor: '#ffffff',
  },
  txtinput: {
    height: 35,
    fontSize: 13,
    marginStart: 10,
    fontFamily: 'MerriweatherSans-Regular',
    padding: 6,
    textAlign:'right'
  },
});
const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(CommentList);
