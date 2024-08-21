import React from 'react';
import LottieView from 'lottie-react-native';
import { Dimensions, View } from 'react-native';

const {width, height} = Dimensions.get('screen');
export default function Loading() {
  return (
    <View style={{height: height * 0.1, width: width, aspectRatio: 5}}>
        <LottieView style={{flex: 1}} source={require('../assets/images/loading.json')} autoPlay loop />
    </View>
  );
}