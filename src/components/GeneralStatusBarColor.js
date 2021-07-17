import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './GeneralStatusBarColorStyles';

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
<View style={[styles.statusBar, { backgroundColor }]}>
<StatusBar translucent backgroundColor= "#557A68" />
</View>
);
export default GeneralStatusBarColor;