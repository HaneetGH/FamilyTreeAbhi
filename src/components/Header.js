import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


 class Header extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity activeOpacity ={0.8}
          //onPress={() => props.navigation.goBack(null)}
          {...this.props}
          style={[{
            height: 45,
            flexDirection: 'row',
            justifyContent: 'space-between',
            letterSpacing: 2,
          },{...this.props.style}]}>
          <Ionicons
            style={{alignSelf: 'center', marginStart: 10, padding: 5}}
            name="md-arrow-back"
            size={20} 
            color="black"
          />
          <Text style={[styles.headertxt,{color:this.props.color}]}>{this.props.headerTxt}</Text>
          <Text>{this.props.headerTxt2}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  headertxt: {
    alignSelf: 'center',
    color: 'white',
  // fontFamily: 'MerriweatherSans-Bold',
    fontSize: 16,
    padding: 8,
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight:'bold'
  },
});
export default Header;
