import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  Link
} from "@mui/material";
import axios from "axios";

import { useAuth } from "../auth";
import { authApi } from "../api/auth";
import { dataApi } from "../api/data";
import { useStore } from "../store";

export const Profile = () => {
  const { user } = useAuth();
  const { setSelectedCourseId } = useStore();
  const [otp, setOtp] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [profile, setProfile] = useState({});
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [showPhoneTextBox, setShowPhoneTextBox] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [myTestSeries, setMyTestSeries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await dataApi.fetchProfile(user?.id);

    if (data) {
      const prof = data[0];
      setProfile(prof);

      const courses = prof.courses;
      const testSeries = prof.test_series;

      const { data: coursesResp, error: cooursesErr } = await dataApi.fetchCourses(courses);
      const { data: testSeriesResp, error: testSeriesErr } = await dataApi.fetchTestSeries(testSeries);

      if (coursesResp) {
        setMyCourses(coursesResp)
      }
      if (testSeriesResp) {
        setMyTestSeries(testSeriesResp);
      }
    }
  };

  const sendOtp = async () => {
    setLoadingOtp(true);
    const res = await axios.post(
      "https://learning-server-gel6.onrender.com/send-otp",
      {
        phoneNo: `+91${phoneNo}`,
      }
    );

    const data = res?.data;
    const response = data?.response;
    if (response.status === "pending") {
      setOtpSent(true);
      setLoadingOtp(false);
    }
  };

  const confirmOtp = async () => {
    setLoadingOtp(true);
    const res = await axios.post(
      "https://learning-server-gel6.onrender.com/confirm-otp",
      {
        phoneNo: `+91${phoneNo}`,
        otp,
      }
    );

    const data = res?.data;
    const response = data?.response;
    
    if (response.status === "approved") {
      setProfile({ ...profile, phone: phoneNo });
      setShowPhoneTextBox(false);
      setOtpSent(false);

      const profileUpdateResponse = await dataApi.updateProfile(profile?.id, {
        ...profile,
        phone: phoneNo,
      });
      setLoadingOtp(false);
    }
  };

  const viewCourse = (courseId) => {
    setSelectedCourseId(courseId);
    navigate("/course")
  }

  return !user ? (
    <Navigate to="/login" />
  ) : (
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={4} xl={4}>
            <Typography  textAlign={"center"} mb={2}>Personal Details:</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid gray",
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={profile?.picture} style={{ width: "100%" }} />
              </div>
              <div>
                <Typography variant="body2" mt={2} mb={2}>
                  Name: {profile?.name}
                </Typography>
                <Typography variant="body2" mb={2}>
                  Email: {profile?.email}
                </Typography>
                <Typography variant="body2" mb={1}>
                  Phone:{" "}
                  {profile?.phone ?? (
                    <Button onClick={() => setShowPhoneTextBox(true)}>
                      Add Phone
                    </Button>
                  )}
                </Typography>
              </div>
              <div>
                {showPhoneTextBox && (
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <TextField
                        size="small"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        label="Phone Number"
                        variant="outlined"
                      />
                    </div>
                    {otpSent && (
                      <TextField
                        size="small"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        label="OTP"
                        variant="outlined"
                      />
                    )}
                    <div>
                      <Button
                        onClick={otpSent ? confirmOtp : sendOtp}
                        disabled={loadingOtp}
                      >
                        {otpSent ? "Submit OTP" : "Send OTP"}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowPhoneTextBox(false);
                          setOtpSent(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                <Button onClick={authApi.signOut}>
                  Logout
                </Button>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                marginBottom: "30px"
              }}
            >
              <Typography mb={2} textAlign={"center"}>Change Password:</Typography>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ marginBottom: "20px" }}>
                  <TextField
                    size="small"
                    type="password"
                    label="New Password"
                    variant="outlined"
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <TextField
                    size="small"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                  />
                </div>
                <Button>Update</Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} lg={8} xl={8}>
            <div style={{ marginBottom: "20px" }}>
              <Typography mb={1}>My Courses:</Typography>
              <div>
                <Grid container spacing={2}>
                  {myCourses?.map((course) => (
                    <Grid item xs={12} sm={6} lg={4} xl={4} >
                      <Card style={{ padding: "10px" }}>
                        <Typography textAlign={"center"}>{course?.title}</Typography>
                        <Typography variant="caption" display="block">Author: {course?.author}</Typography>
                        <Typography variant="caption" display="block">Subject: {course?.subject}</Typography>
                        {/* <Typography variant="caption" display="block">Price: Rs.{course?.price}</Typography> */}
                        <Typography variant="body2" mt={1}>{course?.description}</Typography>
                        <Button onClick={() => viewCourse(course?.id)}>Go To Course</Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <div>
              <Typography mb={1}>My Test Series:</Typography>
              <div>
                <Grid container spacing={2}>
                  {myTestSeries?.map((testSeries) => (
                    <Grid item xs={12} sm={6} lg={4} xl={4} >
                      <Card style={{ padding: "10px" }}>
                        <Typography textAlign={"center"}>{testSeries?.title}</Typography>
                        {/* <Typography variant="caption" display="block">Author: {testSeries?.author}</Typography> */}
                        <Typography variant="caption" display="block">Subject: {testSeries?.subject}</Typography>
                        <Typography variant="caption" display="block">No. of Questions: {testSeries?.n_questions}</Typography>
                        <Typography variant="body2" mt={1}>{testSeries?.description}</Typography>
                        <Link href={testSeries?.url} target="_blank">
                          <Button size="small">          
                            Download
                          </Button>
                        </Link>
                        <Link href={testSeries?.solution_url} target="_blank">
                          <Button size="small">          
                            Download Solution
                          </Button>
                        </Link>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
