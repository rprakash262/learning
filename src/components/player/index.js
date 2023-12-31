import ClearIcon from "@mui/icons-material/Clear";

import { VideoPlayer } from "../videoPlayer";
import { useStore } from "../../store";

export const Player = () => {
  const { selectedVideo, setSelectedVideo } = useStore();

  console.log({ selectedVideo });
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundColor: "#00000063",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 12,
          cursor: "pointer",
        }}
        onClick={() => setSelectedVideo(null)}
      >
        <ClearIcon />
      </div>
      <div style={{ width: "70%", height: "70%" }}>
        <VideoPlayer url={selectedVideo?.url} />
      </div>
    </div>
  );
};
