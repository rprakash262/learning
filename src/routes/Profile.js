import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";

import { useAuth } from "../auth";
import { authApi } from "../api/auth";

export const Profile = () => {
  const { user } = useAuth();
  const [otp, setOtp] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  console.log({user});

  const sendOtp = async () => {
    const res = await axios.post("https://learning-server-gel6.onrender.com/send-otp", {
      phoneNo: `+91${phoneNo}`
    });

    const data = res?.data;
    const response = data?.response;
    if (response.status === "pending") {
      setOtpSent(true)
    }
    console.log({res})
  }

  const confirmOtp= async () => {
    const res = await axios.post("http://localhost:5000/confirm-otp", {
      phoneNo: `+91${phoneNo}`,
      otp
    });

    const data = res?.data;
    const response = data?.response;
    if (response.status === "approved") {
      setOtpSent(false)
    }
    console.log({res})
  }

  return (
    !user ? <Navigate to="/login" /> :
    <div>
      <Container maxWidth="xl" sx={{ height: "100%", width: "90%", paddingTop: "30px", paddingBottom: "30px" }}>
        <Typography>Profile Picture:</Typography>
        <Box mb={5}>
          <div style={{
            width: "100px",
            height: "100px",
            border: "1px solid gray",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}>Image</div>
        </Box>
        <Typography>Personal Details:</Typography>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
          <TextField size="small" label="Email" value={user.email} variant="outlined" />
          {/* <Button variant="contained">Update</Button> */}
        </Box>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
          <TextField size="small" label="Name" variant="outlined" />
          <Button variant="contained">Update</Button>
        </Box>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          mb={5}
        >
          {otpSent ? 
            <TextField size="small" value={otp} onChange={(e) => setOtp(e.target.value)} label="OTP" variant="outlined" /> :
            <TextField size="small" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} label="Phone Number" variant="outlined" />
          }
          {otpSent ?
            <Button variant="contained" onClick={confirmOtp}>Submit</Button> :
            <Button variant="contained" onClick={sendOtp}>Update</Button>
          }
        </Box>
        <Typography>Security Details:</Typography>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          mb={5}
        >
          <TextField size="small" type="password" label="New Password" variant="outlined" />
          <TextField size="small" type="password" label="Confirm Password" variant="outlined" />
          <Button variant="contained">Update</Button>
        </Box>
        <Button variant="contained" onClick={authApi.signOut}>Logout</Button>
      </Container>
    </div>
  )
}