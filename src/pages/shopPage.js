import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import categories from "../data/wooCommerce/category";
import productss from "../data/wooCommerce/products";
import { MainNavbar } from "../components/main-navbar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ShopPage = () => {
  const cat = categories();
  const prod = productss();
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  cat.then((data) => setCategory(data.data));
  prod.then((data) => setProduct(data.data));

  return (
    <div>
      <MainNavbar />
      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <h3>Categories</h3>
              <nav aria-label="main mailbox folders">
                {category &&
                  category.map((data) => (
                    <>
                      <List>
                        <ListItem>
                          <ListItemButton>
                            <p>{data.name}</p>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </>
                  ))}
              </nav>
            </Item>
          </Grid>
          <Grid item xs={9}>
            <Item>
              <h3>Products</h3>
            </Item>
            {/* <h1>Shop Page</h1> */}
            <Grid container spacing={3}>
              {product &&
                product.map((item) => (
                  <>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "260px", height: "180px" }}
                        src={`${
                          item?.images[0]?.src
                            ? item.images[0]?.src
                            : "/default.jpg"
                        }`}
                        alt={item?.images[0]?.name ? item.images[0]?.name : ""}
                        loading="lazy"
                      />
                      <p style={{ marginLeft: "93px", fontWeight: "600" }}>
                        {item?.name}
                      </p>
                      <p style={{ marginLeft: "115px" }}>
                        {item?.price ? `$${item.price}` : ""}
                      </p>
                    </Grid>
                  </>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ShopPage;
