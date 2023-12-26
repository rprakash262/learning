import ReactPlayer from 'react-player'
import { Stack, Slider } from '@mui/material';
import { PlayArrow, Pause, VolumeOff, VolumeDown, VolumeUp } from '@mui/icons-material';
import './styles.css';
import { useState } from 'react';

export const VideoPlayer = ({ url }) => {
  const [volumeValue, setVolumeValue] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [loadedDuration, setLoadedDuration] = useState(0);
  const [playedDuration, setPlayedDuration] = useState(0);

  const handleVideoProgress = (progData) => {
    console.log({progData})
    const {loadedSeconds, playedSeconds} = progData
    setLoadedDuration(loadedSeconds);
    setPlayedDuration(playedSeconds);
  }
  return (
    <div className="videoPlayer">
      <ReactPlayer
        playing={playing}
        volume={volumeValue}
        controls={false}
        width="500px"
        height="350px"
        progressInterval={1000}
        onDuration={(duration) => setVideoDuration(duration)}
        onProgress={(progData) => handleVideoProgress(progData)}
        // url="https://kspqufknwrxccpnhkpic.supabase.co/storage/v1/object/public/videos/HOW%20TO%20BULK%20UP%20REALLY%20FAST%20(%205%20TIPS%20WEIGHT%20GAIN%20KE%20LIYE%20)%20(1).mp4?t=2023-12-23T11%3A38%3A26.548Z"
        // url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
        url={url}
        // config={{
        //   youtube: {
        //     playerVars: { showinfo: 1 },
        //     controls: false
        //   },
        //   facebook: {
        //     appId: '12345'
        //   }
        // }}
      />
      <div className="videoPlayerControls">
        <div className="progress">
          <div className="progressTrack">
            <div className="loadPorgress" style={{ width: `${(loadedDuration / videoDuration) * 100}%` }}></div>
            <div className="liveProgress" style={{ width: `${(playedDuration / videoDuration) * 100}%` }}></div>
          </div>
        </div>
        <div className="leftSideControls">
          <div>
            {playing ? 
              <Pause
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={() => setPlaying(false)}
              /> :
              <PlayArrow
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={() => setPlaying(true)}
              />
            }
          </div>
          <div>
            {volumeValue > 0 ?
              <VolumeUp
                style={{ color: "#fff" }}
                onClick={() => setVolumeValue(0)}
              /> :
              <VolumeOff
                style={{ color: "#fff" }}
                onClick={() => setVolumeValue(1)}
              />}
          </div>
          <div style={{ width: "100px", paddingLeft: "10px" }}>
            <Slider
              style={{ color: "#fff" }}
              width="200px"
              aria-label="Volume"
              value={volumeValue}
              onChange={e => setVolumeValue(e.target.value)}
            />
          </div>
        </div>
        <div className="rightSideControls">
        </div>
      </div>
    </div>
  )
}