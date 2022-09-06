import React, { useEffect, useState } from "react";
import { MainNavbar } from "../../components/main-navbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import productDetail from "../../data/wooCommerce/productDetails";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

  console.log("product@@@@@@@@2", product);
  return (
    <>
      <MainNavbar />
      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <h3>Products</h3>
            </Item>
            {product &&
              product.map((data) => (
                <Grid container spacing={3}>
                  <>
                    <Grid item xs={4}>
                      {data &&
                        data.images.map((image) => (
                          <img
                            style={{ width: "400px", height: "400px" }}
                            src={image && image.src}
                            alt={product.name}
                            loading="lazy"
                          />
                        ))}
                      <p style={{ marginLeft: "93px", fontWeight: "600" }}>
                        {data.name}
                      </p>
                      <p style={{ marginLeft: "115px" }}>
                        {data.price ? `$${data.price}` : ""}
                      </p>
                    </Grid>
                  </>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default product;
