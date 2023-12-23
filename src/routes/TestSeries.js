import { Grid, Typography, Paper, Container } from "@mui/material";
import { styled } from '@mui/material/styles';

import { TestSeriesCard } from "../components/testSeriesCard";

export const TestSeries = () => {
    return (
      <div>
        <Container maxWidth="xl" sx={{ height: "100%", width: "90%", paddingTop: "30px", paddingBottom: "30px" }}>
          <Typography variant="h5" textAlign="center" mb={3}>Available Test Series</Typography>
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