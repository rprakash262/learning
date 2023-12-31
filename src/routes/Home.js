import { useEffect, useState } from "react";
import { Container, Typography, Grid, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { Carousel } from "../components/carousel";
import { dataApi } from "../api/data";
import { CourseCard } from "../components/courseCard";
import { TestSeriesCard } from "../components/testSeriesCard";
import BannerImg from '../data/mainbanner.jpg';

export const Home = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [allTestSeries, setAllTestSeries] = useState([]);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  useEffect(() => {
    fetchCourses();
    fetchTestSeries();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await dataApi.fetchAllCourses();

    if (data) {
      const slicedCourses = data.slice(0, 4);
      setAllCourses(slicedCourses);
    }
  };

  const fetchTestSeries = async () => {
    const { data, error } = await dataApi.fetchAllTestSeries();
    
    if (data) {
      const slicedTestSeries = data.slice(0, 4);
      setAllTestSeries(slicedTestSeries);
    }
  };

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          width: "90%",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <div style={{ border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "4px" }}>
          <img src={BannerImg} style={{ borderRadius: "4px", width: "100%" }} />
        </div>
        {/* <div
          style={{
            width: "100%",
            height: "450px",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          <Carousel />
        </div> */}
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3} mt={5}>
            Courses
          </Typography>
          <Grid container spacing={2}>
            {allCourses.map((course) => (
              <Grid id={course.id} item xs={12} sm={6} lg={4} xl={3}>
                <CourseCard
                  id={course.id}
                  createdAt={course.created_at}
                  title={course.title}
                  description={course.description}
                  tags={course.tags}
                  subject={course.subject}
                  author={course.author}
                  price={course.price}
                />
              </Grid>
            ))}
          </Grid>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/courses">
              <Link to="/courses">
                <Button style={{ marginTop: "20px" }}>See All Courses</Button>
              </Link>
            </Link>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3} mt={5}>
            Test Series
          </Typography>
          <Grid container spacing={2}>
            {allTestSeries.map((testSeries) => (
              <Grid id={testSeries.id} item xs={12} sm={6} lg={4} xl={3}>
                <TestSeriesCard
                  id={testSeries.id}
                  createdAt={testSeries.created_at}
                  title={testSeries.title}
                  description={testSeries.description}
                  tags={testSeries.tags}
                  subject={testSeries.subject}
                  nQuestions={testSeries.n_questions}
                  price={testSeries.price}
                  url={testSeries.url}
                  solutionUrl={testSeries.solution_url}
                />
              </Grid>
            ))}
          </Grid>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/test-series">
              <Button style={{ marginTop: "20px" }}>
                See All Test Series
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
