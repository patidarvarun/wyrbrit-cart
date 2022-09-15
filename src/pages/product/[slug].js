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
import SizeComponent from "../reuseComponent/sizeComponent";
import Loader from "../../components/common/loader";

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

function product() {
  const router = useRouter();
  const { slug } = router.query;
  let slugArray = [];
  let catArray = [];
  let measurementValue = [];
  const [tabArray, setTabArray] = useState([]);
  let measurementData = [];
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const dbInstance = collection(database, "category_unit");
  const [measurementDataa, setMeasurementDataa] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  function proDetail() {
    const products = productDetail(slug);
    products.then((data) => setProduct(data.data));
  }

  const getMeasurementData = async () => {
    const data = await getDocs(dbInstance);
    const getData = data.docs.map((doc) => doc.data());
    getData.map((cat) => {
      if (!tabArray.includes(cat.slug) && cat.slug) {
        tabArray.push(cat.slug);
      }
      measurementValue.push(cat.reference.id);
      const docRef = doc(database, "measurement_unit", cat.reference.id);
      slugArray.push(docRef);
      catArray.push(cat.slug);
    });
    const sizeData = await getSizeChartData(measurementValue);
    for (var i = 0; i < sizeData.length; i++) {
      measurementData.push({
        filter: catArray[i],
        name: sizeData[i].name,
        values: sizeData[i].values,
      });
    }
    setMeasurementDataa(measurementData);
  };
  async function getSizeChartData(postIds = []) {
    const promises = postIds.map(async (postId) => {
      const docSnapshot = await db
        .collection("measurement_unit")
        .doc(postId)
        .get();
      const docData = docSnapshot.data();
      return docData;
    });
    const sizeData = await Promise.all(promises);
    return sizeData;
  }

  function handleDataSet(data) {
    setCategory(data.slug);
    if (measurementDataa.length !== 0) {
      setOpen(true);
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(true);
      }, 3000);
    }
  }

  useEffect(() => {
    if (!slug) {
      return;
    }
    proDetail();
  }, [slug]);

  useEffect(() => {
    getMeasurementData();
  }, []);

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
                    {data?.categories?.map((cat) => (
                      <>
                        {!loading ? (
                          <Button
                            size="large"
                            sx={{ mr: 3 }}
                            variant="contained"
                            onClick={() => handleDataSet(cat)}
                          >
                            Select Size
                          </Button>
                        ) : (
                          <Loader />
                        )}
                      </>
                    ))}
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
          ))}
        <style global jsx>{`
          .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.css-bclhn9-MuiPaper-root-MuiDialog-paper {
            width: 50%;
          }
          .MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container {
            height: 32em;
          }
        `}</style>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          ></BootstrapDialogTitle>
          <DialogContent dividers>
            {measurementDataa && (
              <SizeComponent
                label1={
                  category && category === "shirts"
                    ? "shirts"
                    : category === "suits"
                    ? "jacket"
                    : ""
                }
                label2={
                  category && category === "shirts"
                    ? ""
                    : category === "suits"
                    ? "trouser"
                    : ""
                }
                measurementData={measurementDataa}
              />
            )}
          </DialogContent>
        </BootstrapDialog>
      </Paper>
    </>
  );
}

export default product;
