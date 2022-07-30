/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Geolocation from '@react-native-community/geolocation';
//import {NetworkInfo} from 'react-native-network-info';
import Lottie from 'lottie-react-native';
import Animation from './src/animationbar/animation';
import BottomBar from './src/BottomBar/BottomBar';


const App = () => {

  const [city,setCity] = useState('London');
  const [image, setImage] = useState();
  const [temp,setTemp] = useState();
  const [airCondition, setAirCondition] = useState();
  const [hourProduction, setHourProduction] = useState();
  const [location, setLocation] = useState();
  const [openSearchBar, setSearchBar] = useState(false);

  const key = 'c143f1256a814043b37193945222207';
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`

  useEffect(()=>{
    
    // NetworkInfo.getIPV4Address().then(ipv4Address => {
    //   console.log('ipadress', ipv4Address);
    // });
    load();
  },[])

  const load = async () => {  
    //Geolocation.getCurrentPosition(info => console.log(info))
    await axios.get(url)
    .then(function(response){
      const imageurl = 'http:' + response.data.current.condition.icon;
      const hour = response.data.forecast.forecastday[0].hour;
      console.log('hour',hour)
      setTemp(response.data.current.temp_c)
      setImage(imageurl);
      setAirCondition(response.data.current.condition.text)
      setLocation(response.data.location.region)
      setHourProduction(hour)
    })
    .catch(error => {
      console.log(error);
    })
    await axios.get("https://ipinfo.io/176.88.81.248?token=74392c2e35e354")
          .then(function(response){
            console.log('currentlocation',response)
          })
          .catch(error => {console.log(error)})
          
  }

  const renderItem = (item) => (
    <BottomBar data={item}/>
  )

  return (
  <View style={styles.container}>

  <View style={styles.topbar}>
    <Icon
    style={{padding:5}} 
    name="search"
    size={25}
    color="gray"
    onPress={() => setSearchBar(!openSearchBar)}
    />
    <Icon
    style={{padding:5}} 
    name="map-marker"
    size={25}
    color="gray"
    onPress={load}
    />

  </View>

  {openSearchBar ?
  <View style={styles.searchbar}>
    <TextInput 
    style={styles.textinput}
    placeholder="Enter a city name"
    onChangeText={setCity}
    value={city}
    />
    <Icon 
    style={{padding:5}}
    name='search'
    size={20}
    color="gray"
    onPress={load}
    />
  </View>

  : null }

    <View style={{flex:7,alignItems:'center',marginTop:50}}>
    <Text style={{fontSize:30}}>{location}</Text>
    <View style={styles.topsection}>

    <Animation data={airCondition}/>
    <Text style={styles.tempstyle}>{temp}°C</Text>
    </View>
    <Text style={{fontSize:20}}>{airCondition}</Text>
    </View>

    
    <View style={{flex:2}}>
    
    <FlatList
    horizontal 
    data={hourProduction}
    renderItem={renderItem}
    />
    </View>

  </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginTop:10,
    backgroundColor:'white',
    flex:1,
    alignItems: 'center',
  },

  imagestyle:{
    height:128,
    width:128,
  },
  topsection: {
    alignItems:'center',
    flexDirection: 'row',
  },
  tempstyle:{
    fontSize:45,
  },
  textinput:{
    width:'80%',
    padding:5,
  },
  searchbar: {
    width:'80%',
    marginTop:40,
    backgroundColor:'#f2f2f2',
    borderBottomWidth:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:6,
    height:'7%'
  },
  topbar:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    width:'80%',
  }

});

export default App;
