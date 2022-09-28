import React, { useState, useEffect } from "react";
import { Box, Card, Divider, Typography } from "@mui/material";
import { CardHeader, IconButton, ThemeProvider, AppBar } from "@mui/material";
import { useSettings } from "../../src/hooks/use-settings";
import { Moon as MoonIcon } from "../../src/icons/moon";
import { Sun as SunIcon } from "../../src/icons/sun";
import { createTheme } from "../../src/theme";
import { CommonHeader } from "../components/commonHeader";
import { CardMedia, Grid } from "@mui/material";
import productss from "../data/wooCommerce/products";
import Link from "next/link";

const Shop = (props) => {
  const { element, name, ...other } = props;
  const { settings } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(settings.theme);
  const [product, setProduct] = useState("");
  const localData = localStorage.getItem("data");
  function prodDetail() {
    const prod = productss();
    prod.then((data) => setProduct(data.data));
  }

  useEffect(() => {
    prodDetail();
  }, []);
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
        {localData === null ? (
          ""
        ) : (
          <div className="carttt">
            <Link href="/viewCart">
              <a>Cart</a>
            </Link>
          </div>
        )}
        <Divider />
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: "background.default",
              minHeight: "100%",
              p: 3,
            }}
          >
            <Grid container spacing={3}>
              {product &&
                product.map((item) => (
                  <Grid item key={item.slug} md={4} xs={12}>
                    <Card>
                      <Box sx={{ p: 2 }}>
                        <Link href={"/singleProduct/" + item.slug}>
                          <a>
                            <CardMedia
                              image={
                                item?.images[0]?.src
                                  ? item.images[0]?.src
                                  : "/default.jpg"
                              }
                              sx={{
                                backgroundColor: "background.default",
                                height: 200,
                              }}
                            />
                          </a>
                        </Link>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            mt: 2,
                          }}
                        >
                          <Box sx={{ ml: 2 }}>
                            <Link
                              href={"/singleProduct/" + item.slug}
                              color="textPrimary"
                              variant="h6"
                            >
                              {item.name}
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          pb: 2,
                          px: 3,
                        }}
                      >
                        <Typography color="textSecondary" variant="body2">
                          {item.short_description.replace(/<(.|\n)*?>/g, "")}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          px: 3,
                          py: 2,
                        }}
                      >
                        <Grid
                          alignItems="center"
                          container
                          justifyContent="space-between"
                          spacing={3}
                        >
                          <Grid item>
                            <Typography variant="subtitle2">
                              {item?.price ? `$${item.price}` : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </ThemeProvider>
      </Card>
    </>
  );
};
export default Shop;
