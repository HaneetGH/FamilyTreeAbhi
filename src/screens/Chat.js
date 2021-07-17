import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  Alert,
  BackHandler
} from 'react-native';
//import io from 'socket.io-client';
import Header from '../components/Header';
import Icons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import service from '../Service';
import ProgressDialog from '../components/ProgressDialog';
import messaging from '@react-native-firebase/messaging';
import PushController from './PushController';
import axios from 'axios';

class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
      height: 0,
      fontSize: 16,
      reciverId: props.route.params.senderID,
      deviceToken: props.route.params.deviceToken,
      checkStatus: false,
        size: 0,
         price: 0,
         id: 0,
        
         reachToEnd: false
    };
  }

  componentDidMount() {
    this.socket = io(
      'http://ec2-52-66-250-93.ap-south-1.compute.amazonaws.com:3000',
      {
        transports: ['websocket'],
        jsonp: false,
      },
    );
    this.socket.connect();
    this.socket.on('connect', socket => {
      console.log('connected to socket server', socket);
    });

    this.timer = setInterval(()=> this.getChatApiData(), 2000)
   this.getChatApiData();

    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  componentWillUnmount() {
    // this._unsubscribe();
  }
  // handleBackButton(){
  //   this.props.navigation.navigate("MsgListScreen");
  //    return true;
  //  }

 

  fcmApiData = (data) => {
    this.setState({loading: false});
    service
      .post('firebase/notification', {
      // registrationToken: "eQIn2qy6SZCMu_a2fCkdYz:APA91bG6yC_XvCyg-Y-NRy83s5PIbjT9bUu5P5GC1KWhlUwZKNLvxRJxSGkBSO8_wskYkuO35oDkPym6Y0tgw41mc-lzNz6_8fCdIBuhay6ZHWm9gsZhnbyGnikx_xnFhvTVWNhTiPNz",
      // message: data,
      // title: this.props.user.name,
      // images:this.props.user.profilePic

  "registrationToken":this.state.deviceToken,
	 "message":data,
	 "title" :this.props.user.name,
	 "images":""
      }
      )

      .then(response => {
        this.setState({loading: false});
        // if (response.data.successCount == 1) {
        //   console.log(response.data.successCount)
        //   // Toast.show(response.data.message)
        //   //this.setState({chatMessages: response.data.data});
        // } else {
        //   console.log(response.data.failureCount)
        
        // }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getChatApiData = () => {
    this.setState({loading: false});
    service
      .post('Chat/user_message', {
        receiverChatID: this.state.reciverId,
        senderChatID: this.props.user._id,
       
      })

      .then(response => {
        this.setState({loading: false});
        if (response.data.status == 1) {
          // Toast.show(response.data.message)
          this.setState({chatMessages: response.data.data});
        } else {
           Toast.show(response.data.message);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  submitChatMessage() {
    if (this.state.chatMessage == '') {
      Toast.show('Please Enter Message....');
    } else {
      this.socket.emit('send_mess', {
        content: this.state.chatMessage,
        receiverChatID: this.state.reciverId,
        senderChatID: this.props.user._id,
      });
       this.getChatApiData();
       this.fcmApiData(this.state.chatMessage);

      this.setState({chatMessage: ''});
    }
  }

  onChangeText(event) {
    this.setState({
      fontSize: event.nativeEvent.text.length > 6 ? 16 : 16,
      chatMessage: event.nativeEvent.text,
    });
  }

  _renderItem = ({item}) => {
  
    return (
      <View style={{marginTop: 5, marginHorizontal: 13}}>
        <View
          style={{
            marginVertical: 5,
            //  borderRadius: 10,
            // alignSelf: 'flex-start',
          }}>
          {item.senderChatID == this.props.user._id ? (
            <View
              style={{
                //marginVertical: 8,
                borderRadius: 10,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  backgroundColor: 'white',
                  fontFamily: 'MerriweatherSans-Bold',
                  padding: 9,
                  textAlign: 'left',
                  //margin: 3,
                }}>
                {item.content}
              </Text>
            </View>
          ) : (
            <View
              style={{
                // marginVertical: 8,
                borderRadius: 10,
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  backgroundColor: '#2E8451',
                  fontFamily: 'MerriweatherSans-Bold',
                  // fontWeight:'bold',
                  padding: 9,
                  color: 'white',
                  textAlign: 'right',
                }}>
                {item.content}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  render() {


    return (
      <SafeAreaView style={styles.container}>
        <Header
          onPress={() => this.props.navigation.goBack(null)}
          headerTxt="رسالة"
          style={{backgroundColor: '#2E8451', marginTop: 20}}
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
              ref={ref => {
                this.flatListRef = ref;
              }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={this.state.chatMessages}
              //extraData={this.state.data}
              renderItem={this._renderItem} //method to render the data in the way you want using styling u need
              keyExtractor={(item, index) => item._id}
            />
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginBottom: 20,
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
              placeholder="اكتب رسالة .."
              value={this.state.chatMessage}
              onChange={event => this.onChangeText(event)}
            />
          </View>
          <Icons
            onPress={() => this.submitChatMessage()}
            style={{alignSelf: 'center', marginLeft: 20}}
            name="md-send"
            size={30}
            color={'green'}
          />
        </View>
        <ProgressDialog loading={this.state.loading} />

        {/* <PushController/> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F5FCFF',
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
    textAlign: 'right',
  },
});

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(Chat);
