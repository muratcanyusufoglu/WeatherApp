import { View, Text ,StyleSheet, Image} from 'react-native'
import React, {useState} from 'react'

export default function BottomBar(prop) {

  const timedata = prop.data.item.time.slice(11,16);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{timedata}</Text>
      <Text>{prop.data.item.condition.text}</Text>
      <Image
      style={styles.image}
      source={{uri : `http:${prop.data.item.condition.icon}`}}
      />
      <Text style={styles.text1}>{prop.data.item.temp_c}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
    },
    image:{
      height:64,
      width:64
    },
    text1: {
      fontSize:15,
    }
})

