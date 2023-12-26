import { Container } from "@mui/material";

import { VideoPlayer } from "../components/videoPlayer";
import { Carousel } from "../components/carousel";
import { useEffect, useState } from "react";
import { dataApi } from "../api/data";

export const Home = () => {
  const [courseUrl, setCourseUrl] = useState();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await dataApi.fetchAllCourses();
    if (data) {
      setCourseUrl(data[0].course_url)
    }
    console.log({data, error})
  }

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          width: "90%",
          paddingTop: "30px",
          paddingBottom: "30px"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "450px",
            margin: "auto"
          }}
        >
          <Carousel />
        </div>
        <div>
          <VideoPlayer url={courseUrl} />
        </div>
      </Container>
    </div>
  )
}