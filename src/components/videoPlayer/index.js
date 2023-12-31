import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import { Slider } from '@mui/material';
import { PlayArrow, Pause, VolumeOff, VolumeUp, Fullscreen } from '@mui/icons-material';

import './styles.css';

export const VideoPlayer = ({ url }) => {
  const [volumeValue, setVolumeValue] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [loadedDuration, setLoadedDuration] = useState(0);
  const [playedDuration, setPlayedDuration] = useState(0);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const parentElm = useRef(null);

  const handleVideoProgress = (progData) => {
    const {loadedSeconds, playedSeconds} = progData;

    setLoadedDuration(loadedSeconds);
    setPlayedDuration(playedSeconds);
  }

  useEffect(() => {
    const w = parentElm?.current.clientWidth;
    const h = parentElm?.current.clientHeight;
    setWidth(w);
    setHeight(h);
    console.log({width})
  }, [parentElm?.current])

  return (
    <div className="videoPlayer" ref={parentElm}>
      <ReactPlayer
        playing={playing}
        volume={volumeValue}
        controls={false}
        width={width}
        height={height}
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
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={() => setVolumeValue(0)}
              /> :
              <VolumeOff
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={() => setVolumeValue(0.3)}
              />}
          </div>
          <div style={{ width: "100px", paddingLeft: "10px" }}>
            <Slider
              style={{ color: "#fff" }}
              width="200px"
              aria-label="Volume"
              value={volumeValue}
              min={0}
              max={1}
              step={0.1}
              onChange={e => setVolumeValue(e.target.value)}
            />
          </div>
        </div>
        <div className="rightSideControls">
          <Fullscreen style={{ color: "#fff", cursor: "pointer" }} />
        </div>
      </div>
    </div>
  )
}