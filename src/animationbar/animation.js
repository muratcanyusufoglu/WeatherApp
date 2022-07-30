import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

export default function animation(prop) {

    console.log('prop', prop.data)
    
    if(prop.data == 'Sunny'){
    return (
    <Lottie
    source={require(`../assest/sunny.json`)}
    autoPlay
    loop
    style={{width: 200, height:200}}
    /> 
      )
    }

    else if (prop.data == 'Clear'){
        return (
        <Lottie
        source={require(`../assest/Rain.json`)}
        autoPlay
        loop
        style={{width: 200, height:200}}
    /> 
  )
}
}