import { Grid, Typography, Paper, Container } from "@mui/material";
import { styled } from '@mui/material/styles';

import { CourseCard } from "../components/courseCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Courses = () => {
    return (
      <div>
        <Container maxWidth="xl" sx={{ height: "100%", width: "90%", paddingTop: "30px", paddingBottom: "30px" }}>
          <Typography variant="h5" textAlign="center" mb={3}>Available Courses</Typography>
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
        </Container>
      </div>
    )
  }