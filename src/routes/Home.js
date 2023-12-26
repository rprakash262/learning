import { Container, Typography, Grid, Button } from "@mui/material";

import { VideoPlayer } from "../components/videoPlayer";
import { Carousel } from "../components/carousel";
import { useEffect, useState } from "react";
import { dataApi } from "../api/data";
import { CourseCard } from "../components/courseCard";
import { TestSeriesCard } from "../components/testSeriesCard";
import { Link } from "react-router-dom";

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
            margin: "auto",
            marginBottom: "30px"
          }}
        >
          <Carousel />
        </div>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "30px"
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3}>Courses</Typography>
          <Grid container spacing={10}>
            <Grid item xs={3}>
              <CourseCard />
            </Grid>
            <Grid item xs={3}>
              <CourseCard />
            </Grid>
            <Grid item xs={3}>
              <CourseCard />
            </Grid>
            <Grid item xs={3}>
              <CourseCard />
            </Grid>
          </Grid>
          <Link to="/courses">
            <Button style={{ marginTop: "20px" }}>See All</Button>
          </Link>
        </div>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "30px"
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3}>Test Series</Typography>
          <Grid container spacing={10}>
            <Grid item xs={3}>
              <TestSeriesCard />
            </Grid>
            <Grid item xs={3}>
              <TestSeriesCard />
            </Grid>
            <Grid item xs={3}>
              <TestSeriesCard />
            </Grid>
            <Grid item xs={3}>
              <TestSeriesCard />
            </Grid>
          </Grid>
          <Link to="/test-series">
            <Button style={{ marginTop: "20px" }}>See All</Button>
          </Link>
        </div>
        <div>
          <VideoPlayer url={courseUrl} />
        </div>
      </Container>
    </div>
  )
}