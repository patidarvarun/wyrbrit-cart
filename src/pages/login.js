import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { MainNavbar } from "../components/main-navbar";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import { CardHeader, IconButton, ThemeProvider, AppBar } from "@mui/material";
import { useSettings } from "../../src/hooks/use-settings";
import { Moon as MoonIcon } from "../../src/icons/moon";
import { Sun as SunIcon } from "../../src/icons/sun";
import { createTheme } from "../../src/theme";

const Login = (props) => {
  const { element, name, ...other } = props;
  const { settings } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(settings.theme);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setSelectedTheme(settings.theme);
  }, [settings.theme]);

  const handleSwitch = () => {
    setSelectedTheme((prevSelectedTheme) => {
      return prevSelectedTheme === "light" ? "dark" : "light";
    });
  };

  const theme = createTheme({
    ...settings,
    mode: selectedTheme,
  });

  const LOGIN_DATA = gql`
    mutation login($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
        user {
          id
          name
          firstName
        }
        authToken
      }
    }
  `;

  const [loginUser, { data }] = useMutation(LOGIN_DATA);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser({
      variables: {
        username,
        password,
      },
    });
  };
  if (data && data.login !== null) {
    localStorage.setItem("data", JSON.stringify(data));
    Router.push("/accountPage");
  } else {
    console.log("%%%%%%%%%%%%%%undefined", data);
  }
  return (
    <>
      <MainNavbar />
      <br />
      <br />
      <Card variant="outlined" sx={{ mb: 8 }} {...other}>
        <CardHeader
          action={
            <IconButton onClick={handleSwitch}>
              {selectedTheme === "light" ? (
                <MoonIcon fontSize="small" />
              ) : (
                <SunIcon fontSize="small" />
              )}
            </IconButton>
          }
          title={name}
        />
        <Divider />
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: "background.default",
              minHeight: "100%",
              p: 3,
            }}
          >
            <Container maxWidth="sm">
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 400,
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="h4">Log in</Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ mt: 1 }}
                        variant="body2"
                      >
                        Log in on the internal platform
                      </Typography>
                    </div>
                    <img
                      alt="Amplify"
                      src="/static/icons/amplify.svg"
                      style={{
                        maxWidth: "53.62px",
                        width: "100%",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      mt: 3,
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        name="email"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Box sx={{ mt: 2 }}>
                        <Button
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Log In
                        </Button>
                      </Box>
                    </form>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  <Link color="textSecondary" href="#" variant="body2">
                    Create new account
                  </Link>
                </CardContent>
              </Card>
            </Container>
          </Box>
        </ThemeProvider>
      </Card>
    </>
  );
};
export default Login;
