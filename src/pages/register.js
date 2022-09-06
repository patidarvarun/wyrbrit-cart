import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { MainNavbar } from "../components/main-navbar";
import wooCredential from "../data/wooCommerce/wooCredentialKey";
import { CardHeader, IconButton, ThemeProvider, AppBar } from "@mui/material";
import { useSettings } from "../../src/hooks/use-settings";
import { Moon as MoonIcon } from "../../src/icons/moon";
import { Sun as SunIcon } from "../../src/icons/sun";
import { createTheme } from "../../src/theme";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import country from "../data/wooCommerce/countries";
import Select from "@mui/material/Select";
import { useSnackbar, VariantType } from "notistack";

function register(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { element, name, ...other } = props;
  const { settings } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(settings.theme);
  const wooapi = wooCredential();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [countryy, setCountryy] = useState("");
  const [state, setState] = useState("");
  const [stateData, setStateData] = useState("");
  const [stateDatas, setStateDatas] = useState("");
  const [phone, setPhone] = useState("");

  function countr() {
    const countries = country();
    countries.then((data) => setCountry(data.data));
  }

  function handleCountry(data) {
    setStateData(data);
    setCountryy(data.name);
  }
  function handleState(data) {
    setStateDatas(data.name);
  }
  useEffect(() => {
    countr();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      username: email,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address1,
        address_2: address2,
        city: city,
        state: stateDatas === "" ? state : stateDatas,
        country: countryy,
        email: email,
        phone: phone,
      },
    };

    const response = await wooapi.post("customers", handleData).then((data) => {
      if (data?.status === 201) {
        enqueueSnackbar("User Register Successfully!", {
          VariantType: "success",
        });
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      } else if (data?.status === 400) {
        console.log("error");
        enqueueSnackbar("Something went wrong!", "error");
      }
    });
  };

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
                      <Typography variant="h4">Register</Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ mt: 1 }}
                        variant="body2"
                      >
                        Register on the internal platform
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
                        label="First Name"
                        margin="normal"
                        name="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        name="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                      />
                      {/* <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                      /> */}
                      <TextField
                        fullWidth
                        label="Address 1"
                        margin="normal"
                        name="address1"
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Address 2"
                        margin="normal"
                        name="address2"
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="City"
                        margin="normal"
                        name="City"
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <InputLabel id="demo-select-small">Country</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={countryy}
                        label="Country"
                        //  onChange={(e) => setCountryy(e.target.value)}
                      >
                        {Country &&
                          Country.map((data) => (
                            <>
                              <MenuItem value=""></MenuItem>
                              <MenuItem
                                value={data.name}
                                onClick={() => handleCountry(data)}
                              >
                                {data.name}
                              </MenuItem>
                            </>
                          ))}
                      </Select>
                      <InputLabel id="demo-select-small">State</InputLabel>
                      {stateData && stateData?.states?.length === 0 ? (
                        <TextField
                          fullWidth
                          label=""
                          margin="normal"
                          name="state"
                          onChange={(e) => setState(e.target.value)}
                        />
                      ) : (
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={stateDatas}
                          label="Country"
                          // onChange={(e) => setState(e.target.value)}
                        >
                          {stateData &&
                            stateData?.states?.map((data) => (
                              <>
                                <MenuItem value=""></MenuItem>
                                <MenuItem onClick={() => handleState(data)}>
                                  {data.name}
                                </MenuItem>
                              </>
                            ))}
                        </Select>
                      )}
                      <TextField
                        fullWidth
                        label="Phone"
                        margin="normal"
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          ml: -1,
                          mt: 2,
                        }}
                      >
                        <Checkbox name="policy" />
                        <Typography color="textSecondary" variant="body2">
                          I have read the{" "}
                          <Link href="#">Terms and Conditions</Link>
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Register
                        </Button>
                      </Box>
                    </form>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  <Link color="textSecondary" href="/login" variant="body2">
                    Already having an account
                  </Link>
                </CardContent>
              </Card>
            </Container>
          </Box>
        </ThemeProvider>
      </Card>
    </>
  );
}

export default register;
