// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View , Image, TouchableOpacity , Button } from 'react-native';
import * as Progress from 'react-native-progress';
import {songs} from './songs';

import { SvgUri } from 'react-native-svg';

export default function App() {

  const [actualSong, setActualSong] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar animated={true} backgroundColor="#fff"  barStyle="dark-content" />
      <View style={styles.container}>
        
        <Text>Now playing</Text>
       
        <Image source = {require('./assets/songs/billie_jean.jpg')} />

        <View>
          <Text style = {styles.songTitle}>{songs[actualSong].title}</Text>
          <Text>{songs[actualSong].artist}</Text>
        </View>
        
        <Progress.Bar borderWidth={0}  unfilledColor = 'F2F2F2' progress={0.3} width={200} />   

        <View style = {styles.buttons}>
          <TouchableOpacity style= {styles.previous} >
            <Image style = {{...styles.icon,}} source={require('./assets/icons/previous.png')}/>
          </TouchableOpacity >

          <TouchableOpacity style= {styles.play} >
            <Image style = {{...styles.icon, }} source={require('./assets/icons/play.png')}/>
          </TouchableOpacity >
       
        
          <TouchableOpacity style= {styles.next} >
            <Image style = {{...styles.icon,}} source={require('./assets/icons/next.png')}/>
          </TouchableOpacity >
        </View>

      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  previous: {
    marginRight: 10,
    height: "100%",
    width: "100%",
  },

  play: {
    marginRight: 10,
    
    height: "100%",
    width: "100%",
  },

  next: {
    height: "100%",
    width: "100%",
  },

  icon: {
   
  },

  songTitle: {
    textAlign: 'center',
  },
  songArtist: {
    textAlign: 'center',
  }
});


