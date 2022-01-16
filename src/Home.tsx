// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View , Image, TouchableOpacity , Button } from 'react-native';
import * as Progress from 'react-native-progress';
import {songs} from './songs';

import { Audio, AVPlaybackStatus } from 'expo-av';

import { LinearGradient } from 'expo-linear-gradient';

import PreviousIcon from './assets/icons/previous.svg';
import PlayIcon from './assets/icons/play.svg';
import PauseIcon from './assets/icons/pause.svg'; 
import NextIcon from './assets/icons/next.svg';


import { timeConverter } from './utils/timeConverter';

export function Home() {

  const [actualSong, setActualSong] = useState(0);
  const [sound, setSound] = useState<Audio.Sound>()
  const [isPlaying, setIsPlaying] = useState(false);
  const [info, setInfo] = useState<any>()

  const [currentTime, setCurrentTime] = useState(0);

  async function playSound() {
    if (!sound) {
      console.log('Loading Sound');
      const { sound: newSound, status } = await Audio.Sound.createAsync(
         require('../public/songs/billie_jean.mp3'),
      );
  
      setInfo(status);

      await newSound.playAsync();

      console.log('Status', status)
  
      newSound.setOnPlaybackStatusUpdate((status: any) => setCurrentTime(status.positionMillis));
  
      setSound(newSound);
    }else{
      sound.playFromPositionAsync(currentTime);
      console.log('Resuming...');
    }
    
  }

  async function pauseSound() {
    if (sound){
      console.log('Pausing Sound');

      await sound.pauseAsync();
    }
  }

  async function togglePlayPause() {
    if(isPlaying){
      pauseSound();
      setIsPlaying(false);
    }else{
      playSound();
      setIsPlaying(true);
    }
   
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  return (
    <SafeAreaView style={styles.container}>
     <StatusBar animated={true} backgroundColor="#fff"  barStyle="dark-content" />
      <View style={styles.container}>
        
        <Text style = {styles.statusText}>Now playing</Text>
       
        <Image style = {styles.songImage} source = {require('./assets/songs/billie_jean.jpg')} />

        <View>
          <Text style = {styles.songTitle}>{songs[actualSong].title}</Text>
          <Text style = {styles.songArtist}>{songs[actualSong].artist}</Text>
        </View>
        
        <Progress.Bar style = {styles.progress} borderWidth={0}  unfilledColor = '#F2F2F2' progress={info? (currentTime / info.durationMillis): 0} width={300} />   
        
        <View style = {styles.controlBar}>
            <Text style = {styles.currentTime}>{timeConverter(currentTime)}</Text>

            <View style = {styles.buttons}>
                <TouchableOpacity activeOpacity={0.5} style= {{...styles.button, ...styles.previous, }} >
                    <PreviousIcon width={20} height={20} />
                    {/* <Image style = {{...styles.icon,}} source={require('./assets/icons/previous.png')}/> */}
                </TouchableOpacity >

                <TouchableOpacity onPress={togglePlayPause} activeOpacity={0.5} style= {{...styles.button, ...styles.play, }} >
                    <LinearGradient 
                        style = {styles.gradient}
                        colors={['#9570FF', '#E270FF', '#70F8FF', '#70FFB9', ]}
                        //'#E270FF', '#9570FF', '#70FFB9'

                        start={{x:1,y:1}}
                        end={{x:1,y:0}}
                        locations={[.1,0.35, 0.6, 0.85,]} 
                       >
                            {isPlaying? <PauseIcon color={'red'} width={25} height={25}/> : <PlayIcon  width={25} height={25} /> }

                    </LinearGradient>
                    
                    {/* <Image style = {{...styles.icon, }} source={require('./assets/icons/play.png')}/> */}
                </TouchableOpacity >
            
                
                <TouchableOpacity activeOpacity={0.5} style= {{...styles.button, ...styles.next}} >
                    <NextIcon width={20} height={20} />
                    {/* <Image style = {{...styles.icon,}} source={require('./assets/icons/next.png')}/> */}
                </TouchableOpacity >
            </View>

            <Text style = {styles.totalTime}>{timeConverter(info? info.durationMillis: 0)}</Text>
        </View>
       

      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    // justifyContent: 'center',
  },

  statusText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 50,
  },

  controlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  

  songImage: {
    width: 300,
    height: 300,
  },
  
  songTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333'
  },
  songArtist: {
    textAlign: 'center',
    fontSize: 20,
    color: '#828282',
  },

  currentTime: {
    color: '#9570FF',
    fontWeight: '700',
  },

  progress: {
    marginTop: 20,
  },

  totalTime: {
    color: '#BDBDBD',
    fontWeight: '700',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    // width: "100%",
    // justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 5,
    width: 50,
    height: 50,
    overflow: 'hidden',
    
    
  },

  gradient: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: "100%",
    height:  "100%",
    
  },

  previous: {
    marginRight: 20,
    
  },

 

  play: {
    marginRight: 20,
    padding: 0,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // height: "100%",
    // width: "100%",
  },

  next: {
    // height: "100%",
    // width: "100%",
  },

  icon: {
    width: 40,
    height: 40,
  },

  

});
