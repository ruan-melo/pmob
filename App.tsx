// import { StatusBar } from 'expo-status-bar';
import { Home } from './src/Home';
// import TrackPlayer from 'react-native-track-player';

import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

// const folder = './src/services/TrackPlayerService.ts';

// console.log(folder)

// TrackPlayer.registerPlaybackService(() => require( folder));


export default function App() {


  return (
   <Home/>
  );
}