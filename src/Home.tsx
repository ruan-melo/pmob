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

  const [sound, setSound] = useState<Audio.Sound>()
  const [info, setInfo] = useState<any>()

  const [song, setSong] = useState(songs[0]); //Música atual
  const [isPlaying, setIsPlaying] = useState(false);
  

  const [currentTime, setCurrentTime] = useState(0);

  async function loadSong(file: any){
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      file
   );

   newSound.setOnPlaybackStatusUpdate((status: any) => setCurrentTime(status.positionMillis));

   setSound(newSound);
   setInfo(status);

   console.log('loaded status', status);

  }
  

  useEffect(() => {
    loadSong(song.file);
  }, [])

  async function playSound(file?: any) {
    setIsPlaying(false);

    if (file) {

      if(sound){
        
        await sound.stopAsync();
        // await sound.unloadAsync();
        // setCurrentTime(0);
        // return;
      }
      
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        file
      );

      setSound(newSound);
      setInfo(status);

      await newSound.playAsync();

      // await newSound.unloadAsync();

      
  
      newSound.setOnPlaybackStatusUpdate((status: any) => setCurrentTime(status.positionMillis));
  
    }else{
      sound?.playFromPositionAsync(currentTime);
      console.log('Resuming...');
    }

    setIsPlaying(true);
    
  }

  async function pauseSound() {
    setIsPlaying(false);
    if (sound){
      console.log('Pausing Sound');

      await sound.pauseAsync();
    }
  }

  async function togglePlayPause() {
    if(isPlaying){
      pauseSound();
      
    }else{
      playSound();
    }
   
  }

  useEffect(() => {
    isPlaying ? playSound(song.file) : loadSong(song.file);
  
  }, [song]);

  const handleNext = () => {
    const index = songs.findIndex(s => s.id === song.id);
    const nextSong = songs[index + 1];

    console.log('Next Song', nextSong)

    if(nextSong){
      setSong({...nextSong});
    }else{
      setSong({...songs[0]});  
    }
  }

  const handlePrevious = () => {
    const index = songs.findIndex(s => s.id === song.id);

    const previousSong = songs[index - 1];

    if(previousSong){
      setSong(previousSong);
    }else{
      setSong(songs[songs.length - 1]);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar animated={true} backgroundColor="#fff"  barStyle="dark-content" />
      <View style={styles.container}>
        
        <Text style = {styles.statusText}>Now playing</Text>
       
        <Image style = {styles.songImage} source = {song.image} />

        <View>
          <Text style = {styles.songTitle}>{song.title}</Text>
          <Text style = {styles.songArtist}>{song.artist}</Text>
        </View>
        
        <Progress.Bar style = {styles.progress} borderWidth={0}  unfilledColor = '#F2F2F2' progress={info? (currentTime / info.durationMillis): 0} width={300} />   
        
        <View style = {styles.controlBar}>
            <Text style = {styles.currentTime}>{timeConverter(currentTime)}</Text>

            <View style = {styles.buttons}>
                <TouchableOpacity onPress = {handlePrevious} activeOpacity={0.5} style= {{...styles.button, ...styles.previous, }} >
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
            
                
                <TouchableOpacity onPress={handleNext}  activeOpacity={0.5} style= {{...styles.button, ...styles.next}} >
                    <NextIcon width={20} height={20} />
                    {/* <Image style = {{...styles.icon,}} source={require('./assets/icons/next.png')}/> */}
                </TouchableOpacity >
            </View>

            <Text style = {styles.totalTime}>{timeConverter(info? info.durationMillis: 0)}</Text>
        </View>

        <View style = {styles.containerMoreInfo} >
          <Text style = {styles.moreInfoTitle}>More Info</Text>

          <View style = {styles.moreInfo}>
            <Text style = {styles.songYear}>Year: {song.year}</Text>
            <Text style = {styles.songAlbum} >Album: {song.album}</Text>
            <Text style = {styles.songGenre}>Genre: {song.genre}</Text>
            
          </View>
          
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
    width: '100%',
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
    color: '#333333',
    marginTop: 40,
  },
  songArtist: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    color: '#828282',
  },

  currentTime: {
    color: '#9570FF',
    fontWeight: '700',
  },

  progress: {
    marginTop: 40,
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

  containerMoreInfo: {
    display: 'flex',
    flex: 1,
    width: "100%",
    overflow: 'hidden',
    marginTop: 30,
  },

  moreInfo: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap : 'wrap',
    lineHeight: 20,
  },

  moreInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    display: 'flex',
    // textAlign: 'center',
    
  },
  songYear: {
    marginRight: 20,
  },

  songAlbum: {
    marginRight: 20,
  },

  songGenre: {
    margin: 0,
  }


});
