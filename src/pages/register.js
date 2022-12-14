import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Loader from "../components/common/loader";
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
import { CommonHeader } from "../components/commonHeader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function register(props) {
  const { element, name, ...other } = props;
  const { settings } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(settings.theme);
  const wooapi = wooCredential();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [countryy, setCountryy] = useState("");
  const [state, setState] = useState("");
  const [stateData, setStateData] = useState("");
  const [stateDatas, setStateDatas] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);

  function countr() {
    const countries = country();
    countries.then((data) => setCountry(data.data));
  }

  function handleState(e) {
    setStateDatas(e.target.value);
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

  const handleCountry = (e) => {
    setCountryy(e.target.value);
    Country.filter((item) =>
      item.name === e.target.value ? setStateData(item.states) : ""
    );
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
      password: password,
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
    if (
      (email === "",
      firstName === "",
      lastName === "",
      email === "",
      password === "",
      address1 === "",
      address2 === "",
      city === "")
    ) {
      setOpenWarning(true);
    } else {
      try {
        setLoading(true);
        const response = await wooapi
          .post("customers", handleData)
          .then((data) => {
            if (data.status === 201) {
              setLoading(false);
              setOpen(true);
              setTimeout(() => {
                window.location.replace("/login");
              }, 2000);
            } else {
              console.log("data", data);
            }
          });
      } catch (error) {
        console.log("error", error.response);
        setOpenError(true);
        setLoading(false);
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpen(false);
    setOpenWarning(false);
  };

  return (
    <>
      <CommonHeader />
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
                      <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                      <FormControl
                        fullWidth
                        className="filter ml-0 w-100 country"
                      >
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={countryy}
                          label="country"
                          onChange={handleCountry}
                        >
                          {Country &&
                            Country.map((item) => {
                              return (
                                <MenuItem key={item.name} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <InputLabel id="demo-select-small">State</InputLabel>
                      {stateData && stateData.length === 0 ? (
                        <TextField
                          fullWidth
                          label=""
                          margin="normal"
                          name="state"
                          onChange={(e) => setState(e.target.value)}
                        />
                      ) : (
                        <FormControl
                          fullWidth
                          className="filter ml-0 w-100 country"
                        >
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={stateDatas}
                            label="country"
                            onChange={handleState}
                          >
                            {stateData &&
                              stateData.map((item) => {
                                return (
                                  <MenuItem key={item.name} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
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
                        {!loading ? (
                          <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            Register
                          </Button>
                        ) : (
                          <Loader />
                        )}
                      </Box>
                    </form>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  <Link color="textSecondary" href="/login" variant="body2">
                    Already having an account
                  </Link>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      User Register Successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={openError}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Something went wrong...
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={openWarning}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="warning"
                      sx={{ width: "100%" }}
                    >
                      All fields are required!
                    </Alert>
                  </Snackbar>
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
