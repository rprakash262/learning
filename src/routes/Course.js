import { useEffect, useState } from "react";
import { Card, Container, Grid, Typography, Chip, Button } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import { initiatePayment } from "../payment";
import { dataApi } from "../api/data";
import { useStore } from "../store";
import VideoThumbnail from "../data/VideoThumbnail.webp";

export const Course = () => {
  const { selectedCourseId, setSelectedVideo } = useStore();
  const [course, setCourse] = useState({});
  const [courseVideos, setCourseVideos] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    fetchCourse(selectedCourseId);
    fetchCourseVideos();
  }, []);

  const fetchCourse = async () => {
    const { data, error } = await dataApi.fetchCourse(selectedCourseId);

    if (data) {
      setCourse(data[0]);
    }
  };

  const fetchCourseVideos = async () => {
    const { data, error } = await dataApi.fetchCourseVideos(selectedCourseId);

    if (data) {
      setCourseVideos(data);
    }
  };

  const startPayment = async () => {
    setLoadingPayment(true);
    const paymentOptions = {
      orderAmount: course?.price * 100,
      currencyType: "INR",
      paymentCapture: 1,
    };

    const response = await initiatePayment(paymentOptions);
    setLoadingPayment(false);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        width: "90%",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <Typography variant="h6">Course: {course?.title}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} lg={4} xl={4} p={1}>
          <div style={{ width: "100%", height: "auto" }}>
            <img
              src={VideoThumbnail}
              style={{ width: "100%", maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          {/* <Typography variant="h6">{course?.title}</Typography> */}
          <Typography variant="caption" display="block">
            Author: {course?.author}
          </Typography>
          <Typography variant="caption" display="block">
            Subject: {course?.subject}
          </Typography>
          <Typography variant="caption" display="block">
            Price: Rs.{course?.price}
          </Typography>
          <div style={{ marginTop: "10px" }}>
            {course?.tags?.map((tag) => (
              <Chip
                style={{ marginRight: "5px", marginBottom: "5px" }}
                label={tag}
              />
            ))}
          </div>
          <Button
            style={{ marginTop: "10px" }}
            onClick={startPayment}
            variant="contained"
            disabled={loadingPayment}
          >
            {loadingPayment ? "Please Wait.." : "Buy Course"} 
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} lg={8} xl={8} p={1}>
          <Typography variant="body2" mb={2}>
            {course?.description}
          </Typography>
          <div>
            {courseVideos.map((video, index) => (
              <Card
                style={{
                  marginBottom: "10px",
                  cursor: "pointer",
                  height: "60px",
                }}
                onClick={() => setSelectedVideo(video)}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={VideoThumbnail}
                      style={{ height: "60px", width: "60px" }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flex: 1, paddingLeft: "10px" }}
                  >
                    <Typography variant="body2">
                      {index + 1}. {video?.title}
                    </Typography>
                  </div>
                  <div style={{ paddingRight: "10px" }}>
                    <PlayCircleOutlineIcon />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
