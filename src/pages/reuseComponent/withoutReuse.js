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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "../../../firebase/ firebaseConfig";

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

function WithoutReuse(props) {
  const [categoryData, setCategoryData] = useState("");
  const [measureD, setMeasureD] = useState("");
  const dbInstance = collection(database, "category_unit");
  const dbInstance1 = collection(database, "measurement_unit");
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [loading, setLoading] = useState(false);
  let slugArray = [];
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
    setMeasureD(measurementData);
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
  }, []);

  const measure = [
    {
      name: "Front Shoulder",
      values: ["12", "12.3", "13", "14"],
    },
    {
      name: "Bicep",
      values: ["12", "12.3", "13", "14"],
    },
    {
      values: ["12", "12.3", "13", "14"],
      name: "Back length",
    },
  ];
  return (
    <div className="">
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
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label={props.label1} value="1" />
                  <Tab label={props.lebel2} value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  {measureD &&
                    measureD.map((data) => (
                      <>
                        <TabPanel value="1">
                          {data.name} &emsp;&emsp;&emsp; <a>{props.name2}</a>
                        </TabPanel>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          {data.values.map((val) => (
                            <Grid
                              item
                              xs={3}
                              style={{ width: "25% !important" }}
                            >
                              <Item>{val}</Item>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    ))}
                </Box>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
          </Box>
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

export default WithoutReuse;
