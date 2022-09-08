import React, { useEffect, useState } from "react";
import productDetail from "../../data/wooCommerce/productDetails";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { CommonHeader } from "../../components/commonHeader";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";
import Link from "next/link";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function product() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState("");

  function proDetail() {
    const products = productDetail(slug);
    products.then((data) => setProduct(data.data));
  }

  useEffect(() => {
    if (!slug) {
      return;
    }
    proDetail();
  }, [slug]);

  return (
    <>
      <CommonHeader />
      <br />
      <br />
      <br />
      <br />
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          width: "100%",
          maxWidth: 800,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        {product &&
          product.map(
            (data) => (
              console.log("############data", data),
              (
                <Grid container spacing={2} key={data.id}>
                  <Grid item>
                    <ButtonBase sx={{ width: 300, height: 300 }}>
                      <Img alt="complex" src={data?.images[0].src} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {data.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Price : {data.price === "" ? "" : `$${data.price}`}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {data.short_description.replace(/<(.|\n)*?>/g, "")}
                        </Typography>
                        <br />
                        <Button size="large" sx={{ mr: 3 }} variant="contained">
                          Add to cart
                        </Button>{" "}
                        &nbsp;
                        {/* {data?.categories?.map((cat) => ( */}
                        <>
                          <Link href="/inputForm">
                            <Button
                              size="large"
                              sx={{ mr: 3 }}
                              variant="contained"
                            >
                              Select Size
                            </Button>
                          </Link>
                        </>
                        {/* ))} */}
                        <br />
                        <br />
                        <Typography variant="body2" gutterBottom>
                          SKU : {data.sku}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Categories :{" "}
                          {data.categories.map((cat) => (
                            <div key={cat.id}>{cat.name}</div>
                          ))}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          Description
                        </Typography>
                        <Typography sx={{ cursor: "pointer" }} variant="body2">
                          {data.description.replace(/<(.|\n)*?>/g, "")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            )
          )}
      </Paper>
    </>
  );
}

export default product;
