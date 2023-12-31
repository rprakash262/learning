import { useState, useEffect } from "react";
import { Grid, Typography, Container } from "@mui/material";

import { TestSeriesCard } from "../components/testSeriesCard";
import { dataApi } from "../api/data";

export const TestSeries = () => {
  const [allTestSeries, setAllTestSeries] = useState([]);

  useEffect(() => {
    fetchTestSeries();
  }, []);

  const fetchTestSeries = async () => {
    const { data, error } = await dataApi.fetchAllTestSeries();

    if (data) {
      setAllTestSeries(data);
    }
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ height: "100%", width: "90%", paddingTop: "30px", paddingBottom: "30px" }}>
        <Typography variant="h5" textAlign="center" mb={3}>ALL TEST SERIES</Typography>
        <Typography width={"70%"} m={"auto"} mb={3}>
          We provide comprehensive General Studies Foundation Course, Prelims & Mains Test Series,
          One-to-One Mentorship, Current Affairs and much more to help you achieve your IAS Dream.
          Currently Test Series is available for below modules - 
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
                price={testSeries.price}
                url={testSeries.url}
                solutionUrl={testSeries.solution_url}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}