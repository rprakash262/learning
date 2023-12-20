import { useState } from "react";
import { Typography, Card, CardContent, Container, TextField, Stack, Button } from "@mui/material"
import { useStore } from "../store";

export const Login = () => {
  const { setShowSnackbar } = useStore();
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const login = () => {
    if (!email) {
      setShowSnackbar('Enter email', 'error');
      return;      
    }
    if (!password) {
      setShowSnackbar('Enter password', 'error');
      return;
    }

    console.log({email, password})
  }

  const signup = () => {
    if (!name) {
      setShowSnackbar('Enter name', 'error');
      return;      
    }
    if (!email) {
      setShowSnackbar('Enter email', 'error');
      return;
    }
    if (!password) {
      setShowSnackbar('Enter password', 'error');
      return;
    }
    if (!confirmPassword) {
      setShowSnackbar('Enter confirm password', 'error');
      return;
    }
    if (password !== confirmPassword) {
      setShowSnackbar("Passwords don't match", 'error');
      return;
    }

    console.log({name, email, password, confirmPassword})
  }

  return (
    <Container maxWidth="xs" sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: 50,
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
      <Card sx={{ width: "370px" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography align="center">
              {formType === "login" ? "Please signin using your email and password." : "Please fill all the details to register."}
            </Typography>
            {formType === "signup" && (
              <TextField
                required
                id="name"
                label="Name"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              required
              id="email"
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              id="password"
              label="Password"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formType === "signup" && (
              <TextField
                required
                id="confirmPassword"
                label="Confirm Password"
                size="small"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button
              variant="contained"
              size="medium"
              onClick={formType === "login" ? login : signup}
              type="submit"
            >
              {formType === "login" ? "Login" : "Sign Up"}
            </Button>
          </Stack>
          <Typography mt={2}>
            {formType === "login" ? "Not registered? " : "Already registered? "}
            <Button
              variant="text"
              onClick={() => setFormType(formType === "login" ? "signup" : "login")}>
              {formType === "login" ? "SignUp Here" : "Login Here"}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}