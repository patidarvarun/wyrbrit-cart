import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SizeComponent from "./reuseComponent/sizeComponent";
import Loader from "../components/common/loader";
import { DataTransfer } from "./product/[slug]";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "../../firebase/ firebaseConfig";

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

function InputForm(props) {
  const [categoryData, setCategoryData] = useState("");
  const dbInstance = collection(database, "category_unit");
  const dbInstance1 = collection(database, "measurement_unit");
  const [loading, setLoading] = useState(false);
  let slugArray = [];
  console.log("propInpiyuu", props);
  let measurementData = [];
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
  // const getNo = async () => {
  //   const q = query(
  //     dbInstance1,
  //     where("name", "in", [
  //       "0VcvajAz44WRKX5JRe51,0sV3iggsDr24bCN08W5A,3KpK1uvZiM0lxjmoJCeh",
  //     ])
  //   );

  //   const docs = await getDocs(q);
  //   const docRef = doc(database, "measurement_unit", "PaBiA3pVc2YtpKngJx9j");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCategoryData(localStorage.getItem("item"));
    setOpen(true);
    getNotes();
    // getNo();
  }, []);

  return (
    <>
      <DataTransfer.Consumer>
        {(fname) => {
          return console.log("fname", fname);
        }}
      </DataTransfer.Consumer>
      <style global jsx>{`
        .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.css-bclhn9-MuiPaper-root-MuiDialog-paper {
          width: 50%;
        }
        .MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container {
          height: 32em;
        }
      `}</style>
      {/* {!loading ? ( */}
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
          {console.log("$$$$$$$$$$$$$$$$", measurementData)}

          <SizeComponent
            label1={
              categoryData.replace(/['"]+/g, "") === "shirts"
                ? ""
                : categoryData.replace(/['"]+/g, "")
            }
            lebel2={
              categoryData.replace(/['"]+/g, "") === "shirts"
                ? ""
                : categoryData.replace(/['"]+/g, "")
            }
            name1={categoryData.replace(/['"]+/g, "") === "shirts"}
            name2={categoryData.replace(/['"]+/g, "") === "shirts"}
            measurementData={measurementData && measurementData}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* ) : (
        <Loader />
      )} */}
    </>
  );
}

export default InputForm;
