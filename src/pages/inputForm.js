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
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "../../firebase/ firebaseConfig";
import { Context } from "./context";

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

function inputForm(props) {
  const [categoryData, setCategoryData] = useState("");
  const dbInstance = collection(database, "category_unit");
  const dbInstance1 = collection(database, "measurement_unit");

  const [catIdd, setCatIdd] = useState("");
  const getNotes = async () => {
    const data = await getDocs(dbInstance);
    const getData = data.docs.map((doc) => doc.data());
    getData.map((cat) => {
      if (cat.slug === "shirts") {
        setCatIdd(cat.reference.id);
        console.log("***********newData", cat.reference.id);
      }
    });

    console.log("category_unit", getData);
  };
  console.log("catIdd", catIdd);
  const getNo = async () => {
    const q = query(
      dbInstance1,
      where("name", "in", [
        "PaBiA3pVc2YtpKngJx9j,vce8sijD9bRzI99dzQmq,wKXnjq3G8eomTo9xl3H3",
      ])
    );
    console.log("@@@@@@@@@@@@@qqq", q);
    const docRef = doc(database, "measurement_unit", "MblDRE1llxBQcpXzbgoj");
    console.log("@@@@@@@@docRef", docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

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
    getNo();
  }, []);
  console.log("$$$$$$$$$$$", categoryData.replace(/['"]+/g, ""));

  const counter = useContext(Context);
  // console.log("!!!!!!!!!!!!!", counter);
  return (
    <div className="">
      <style global jsx>{`
        .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.css-bclhn9-MuiPaper-root-MuiDialog-paper {
          width: 50%;
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
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default inputForm;
