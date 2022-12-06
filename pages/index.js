import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Player, FS_SDK_EVENTS_NAME } from 'furioos-sdk';
import { useEffect } from 'react';


export default function Home() {
  const options = {
    whiteLabel: true,
    hideToolbar: false,
    hideTitle: true,
    hidePlayButton: true,
    inactiveTimeout: 60000,
  };

  let player = null

  useEffect(() => {
    player = new Player("vqanXF2Z2tMv8xnt2" ,"furioos_container", options);
  }, [])
  
  if (player !== null ) {
  
    document.getElementById('button_setUserActive').addEventListener("click", () => {
      console.log("Call setUserActive");
      player.setUserActive();
    });
    
    document.getElementById('button_maximize').addEventListener("click", () => {
      console.log("Call maximize");
      player.maximize();
    });
    
    document.getElementById('button_minimize').addEventListener("click", () => {
      console.log("Call minimize");
      player.minimize();
    });
    
    let value = 1;
    document.getElementById('button_sendSDKMessage').addEventListener("click", () => {
      console.log("SDK Example: Call sendSDKMessage", new Date());
      player.sendSDKMessage({
        uniqueName: "Test",
        value: ++value
      });
    });
    
    document.getElementById('button_getServerAvailability').addEventListener("click", () => {
      console.log("Call getServerAvailability");
      player.getServerAvailability((data) => {
        console.log("Response getServerAvailability", data);
      }, (error) => {
        console.log("ERROR getServerAvailability", error);
      });
    });
    
    document.getElementById('button_start').addEventListener("click", () => {
      console.log("Call start");
      player.start()
    });
    
    document.getElementById('button_stop').addEventListener("click", () => {
      console.log("Call stop");
      player.stop()
    });
    
    document.getElementById('button_restartStream').addEventListener("click", () => {
      console.log("Call restart stream");
      player.restartStream()
    });
    
    document.getElementById('button_setThumb').addEventListener("click", () => {
      console.log("Call setThumb");
      player.setThumbnailUrl("https://images.unsplash.com/photo-1599499462686-3ed0badee8c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3302&q=80");
    });
    
    document.getElementById('button_getServerMetadata').addEventListener("click", () => {
      console.log("Call getServerMetadata");
      player.getServerMetadata((data) => {
        console.log("Response getServerMetadata", data);
      }, (error) => {
        console.log("ERROR getServerMetadata", error);
      });
    });
    
    document.getElementById('button_quality_auto').addEventListener("click", () => {
      player.setQuality(FS_QUALITY_VALUES.AUTO);
    });
    document.getElementById('button_quality_low').addEventListener("click", () => {
      player.setQuality(FS_QUALITY_VALUES.LOW);
    });
    document.getElementById('button_quality_medium').addEventListener("click", () => {
      player.setQuality(FS_QUALITY_VALUES.MEDIUM);
    });
    document.getElementById('button_quality_high').addEventListener("click", () => {
      player.setQuality(FS_QUALITY_VALUES.HIGH);
    });
    
    var slider = document.getElementById('volume_range');
    slider.oninput = function() {
      console.log('volume', this.value/100);
      player.setVolume(this.value/100);
    }
    
    // EVENTS
    player.on(FS_SDK_EVENTS_NAME.LOAD, () => {
      console.info("Do something on load");
    });
    
    player.on(FS_SDK_EVENTS_NAME.ON_STATS, (stats) => {
      //console.log("SDK client FIRED: Stats received", stats);
    });
    
    // Bind SDK messages
    player.on(FS_SDK_EVENTS_NAME.ON_SDK_MESSAGE, function (data) {
      console.log("SDK Message Received:", data);
    });
    
    // Bind application install progress
    player.on(FS_SDK_EVENTS_NAME.ON_APP_INSTALL_PROGRESS, function (value) {
      console.log("SDK client FIRED: App install progress", value);
    });
    
    // Bind application install success
    player.on(FS_SDK_EVENTS_NAME.ON_APP_INSTALL_SUCCESS, function () {
      console.log("SDK client FIRED: App install success");
    });
    
    // Bind application install fail
    player.on(FS_SDK_EVENTS_NAME.ON_APP_INSTALL_FAIL, function () {
      console.log("SDK client FIRED: App install fail");
    });
    
    // Bind application start
    player.on(FS_SDK_EVENTS_NAME.ON_APP_START, function () {
      console.log("SDK client FIRED: App start");
    });
    
    // Bind stream start
    player.on(FS_SDK_EVENTS_NAME.ON_STREAM_START, function () {
      console.log("SDK client FIRED: Stream start");
    });
    
    // Bind user active
    player.on(FS_SDK_EVENTS_NAME.ON_USER_ACTIVE, function () {
      console.log("SDK client FIRED: User Active");
    });
    
    // Bind user inactive
    player.on(FS_SDK_EVENTS_NAME.ON_USER_INACTIVE, function () {
      console.log("SDK client FIRED: User Inactive");
    });
    
    // Bind session stoppeds
    player.on(FS_SDK_EVENTS_NAME.ON_SESSION_STOPPED, function () {
      console.log("SDK client FIRED: Session Stopped");
    });
    
    player.on(FS_SDK_EVENTS_NAME.ON_CRASH_APP, (data) => {
      console.warn("SDK client FIRED: crash app", data);
    });
    
    player.on(FS_SDK_EVENTS_NAME.ON_RESUME_SESSION, (data) => {
      console.warn("SDK client FIRED: session can be resumed", data);
    });
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id='container' className='w-[80vw] h-[80vh]'/>
        <div id="furioos_container"  className='w-[80vw] h-[80vh]'></div>
        <button id="button_start">Start session</button>
        <button id="button_stop">Stop session</button>
        <button id="button_restartStream">Restart stream</button>
        <button id="button_sendSDKMessage">Send SDK message</button>
        <button id="button_maximize">Maximize</button>
        <button id="button_minimize">Minimize</button>
        <button id="button_setUserActive">Set user active</button>
        <button id="button_getServerAvailability">Get server availability</button>
        <button id="button_getServerMetadata">Get server metadata</button>
        <button id="button_setThumb">Set Thumbnail</button>
        <button id="button_quality_auto">Quality Auto</button>
        <button id="button_quality_low">Quality Low</button>
        <button id="button_quality_medium">Quality Medium</button>
        <button id="button_quality_high">Quality High</button>
        <div class="slidecontainer">
          <input type="range" min="0" max="100" value="100" class="slider" id="volume_range"/>
        </div>
      </main>
    </div>
  )
}
