import { Container } from "@mui/material";

import { VideoPlayer } from "../components/videoPlayer";
import { Carousel } from "../components/carousel";

export const Home = () => {
  return (
    <div>
      <Container maxWidth="xl" sx={{ height: "100%", width: "90%", paddingTop: "30px", paddingBottom: "30px" }}>
        <div style={{ width: "100%", height: "450px", margin: "auto" }}>
          <Carousel />
        </div>
        <div>
          <VideoPlayer />
        </div>
      </Container>
    </div>
  )
}