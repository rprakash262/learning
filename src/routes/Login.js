import { useState } from "react";
import { Typography, Card, CardContent, Container, TextField, Stack, Button } from "@mui/material"

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log({userName, password})
  }

  return (
    <Container maxWidth="xs" sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ minWidth: 275, maxWidth: "sm" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography align="center">Please signin using your email and password</Typography>
            <TextField
              required
              id="userName"
              label="User Name"
              size="small"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              required
              id="password"
              label="Password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={login}
            >
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}