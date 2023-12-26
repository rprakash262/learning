import { Grid, Typography, Paper, Container } from "@mui/material";
import { styled } from '@mui/material/styles';

import { TestSeriesCard } from "../components/testSeriesCard";

export const TestSeries = () => {
    return (
      <div>
        <Container maxWidth="xl" sx={{ height: "100%", width: "90%", paddingTop: "30px", paddingBottom: "30px" }}>
          <Typography variant="h5" textAlign="center" mb={3}>TEST SERIES</Typography>
          <Typography width={"70%"} m={"auto"} mb={3}>
            We provide comprehensive General Studies Foundation Course, Prelims & Mains Test Series,
            One-to-One Mentorship, Current Affairs and much more to help you achieve your IAS Dream.
            Currently Test Series is available for below modules - 
          </Typography>
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
        </Container>
      </div>
    )
  }