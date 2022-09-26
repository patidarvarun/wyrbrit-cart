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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { doc, collection, getDocs } from "firebase/firestore";
import { db, database } from "../../../firebase/ firebaseConfig";
import Loader from "../../components/common/loader";
import Link from "next/link";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function singleProduct() {
  const router = useRouter();
  const { slug } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [showCart, setshowCart] = useState(false);
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const dbInstance = collection(database, "category_unit");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  function proDetail() {
    const products = productDetail(slug);
    products.then((data) => setProduct(data.data));
  }
  let products = [];

  function getProductInfo(pro) {
    const productData = { product: pro[0], quantity: quantity };
    const getLocalData = localStorage.getItem("data");
    if (!getLocalData) {
      products.push(productData);
      localStorage.setItem("data", JSON.stringify(products));
    } else {
      const alreadyProduct = JSON.parse(getLocalData);
      alreadyProduct.forEach((element) => {
        if (element.product.id === pro[0].id) {
          alert("Already in cart");
        } else {
          products.push(element);
          products.push(productData);
          localStorage.setItem("data", JSON.stringify(products));
        }
      });
    }
  }
  const addToCart = () => {
    getProductInfo(product);
    setshowCart(true);
  };
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
          product.map((data) => (
            <Grid container spacing={2} key={data.id}>
              <Grid item>
                <ButtonBase sx={{ width: 300, height: 300 }}>
                  <Img alt="complex" src={data?.images[0]?.src} />
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
                    {showCart === true ? (
                      <Link href="/viewCart">
                        <a>View cart</a>
                      </Link>
                    ) : (
                      <div>
                        <input
                          type="number"
                          style={{
                            width: "50px",
                            height: "46px",
                            textAlign: "center",
                            marginRight: "10px",
                          }}
                          defaultValue={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Button
                          size="large"
                          sx={{ mr: 3 }}
                          variant="contained"
                          onClick={addToCart}
                        >
                          Add to cart
                        </Button>{" "}
                      </div>
                    )}
                    &nbsp;
                    <Typography variant="body2" gutterBottom>
                      Categories :{" "}
                      {data.categories.map((cat) => (
                        <div key={cat.id}>{cat.name}</div>
                      ))}
                    </Typography>
                    <br />
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
          ))}
      </Paper>
    </>
  );
}

export default singleProduct;
