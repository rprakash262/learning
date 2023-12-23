import ReactPlayer from 'react-player'
import { Stack, Slider } from '@mui/material';
import { PlayArrow, Pause, VolumeOff, VolumeDown, VolumeUp } from '@mui/icons-material';
import './styles.css';
import { useState } from 'react';

export const VideoPlayer = () => {
  const [volumeValue, setVolumeValue] = useState(30);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="videoPlayer">
      <ReactPlayer
        playing={playing}
        volume={volumeValue}
        controls={false}
        width="500px"
        height="350px"
        url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
            controls: false
          },
          facebook: {
            appId: '12345'
          }
        }}
      />
      <div className="videoPlayerControls">
        <div className="progress">
          <div className="progressTrack">
            <div className="loadPorgress"></div>
            <div className="liveProgress"></div>
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
                onClick={() => setVolumeValue(30)}
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