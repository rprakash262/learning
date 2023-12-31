import { useEffect, useState } from "react";
import { Grid, Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CourseCard } from "../components/courseCard";
import { dataApi } from "../api/data";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export const Courses = () => {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await dataApi.fetchAllCourses();

    if (data) {
      setAllCourses(data);
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
        <Typography variant="h5" textAlign="center" mb={3}>
          ALL COURSES
        </Typography>
        <Typography width={"70%"} m={"auto"} mb={3}>
          We provide comprehensive General Studies Foundation Course, Prelims & Mains Test Series,
          One-to-One Mentorship, Current Affairs and much more to help you achieve your IAS Dream.
          Currently Test Series is available for below modules - 
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
      </Container>
    </div>
  );
};
