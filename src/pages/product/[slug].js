import React, { useEffect, useState, createContext } from "react";
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
import { Context } from "../context";
import InputForm from "../inputForm";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "../../../firebase/ firebaseConfig";
import SizeComponent from "../reuseComponent/sizeComponent";
const Practice = createContext();

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function product() {
  const router = useRouter();
  const { slug } = router.query;
  let catData = [];
  let slugArray = [];
  let measurementData = [];
  const [product, setProduct] = useState("");
  const dbInstance = collection(database, "category_unit");

  function proDetail() {
    const products = productDetail(slug);
    products.then((data) => setProduct(data.data));
  }

  // function prod() {
  //   product &&
  //     product.map((data) => {
  //       data.categories.map((cat) => {
  //         catData.push(cat.slug);
  //       });
  //     });
  // }

  const getNotes = async () => {
    const data = await getDocs(dbInstance);
    const getData = data.docs.map((doc) => doc.data());
    getData.map((cat) => {
      if (cat.slug === "shirts") {
        const docRef = doc(database, "measurement_unit", cat.reference.id);
        slugArray.push(docRef);
      }
    });
    for (var i = 0; i < slugArray.length; i++) {
      const docSnapp = await getDoc(slugArray[i]);

      if (docSnapp.exists()) {
        measurementData.push(docSnapp.data());
      } else {
        console.log("No such document!");
      }
    }
    console.log("measurementData", measurementData);
  };

  function handleDataSet(data) {
    localStorage.setItem("item", JSON.stringify(data.slug));
  }
  useEffect(() => {
    if (!slug) {
      return;
    }
    proDetail();
    // prod();
  }, [slug]);
  useEffect(() => {
    getNotes();
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
                        <Link href="/inputForm">
                          <Button
                            size="large"
                            sx={{ mr: 3 }}
                            variant="contained"
                            onClick={() => handleDataSet(cat)}
                          >
                            Select Size
                          </Button>
                        </Link>
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
                        <Context.Provider value={cat}>
                          <div key={cat.id}>{cat.name}</div>
                        </Context.Provider>
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
      </Paper>
    </>
  );
}
{
  /* <div style={{ display: "none" }}>
  <Practice.Provider value={"varunnn"}>
    <InputForm value={"varr"} />
  </Practice.Provider>
</div>; */
}

export default product;
export { Practice };
