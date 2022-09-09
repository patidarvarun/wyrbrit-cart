import React from "react";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SizeChart(props) {
  console.log("Size ", props);

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
    {
      values: ["12", "12.3", "13", "14"],
      name: "Stomach",
    },
    {
      values: ["12", "12.3", "13", "14"],
      name: "Seat",
    },
    {
      name: "Sleave(L)",
      values: ["12", "12.3", "13", "14"],
    },
    {
      name: "Front Waist Length",
      values: ["12", "12.3", "13", "14"],
    },
    {
      name: "Shoulder",
      values: ["12", "12.3", "13", "14"],
    },
    {
      values: ["12", "12.3", "13", "14"],
      name: "Waist",
    },
    {
      name: "Nape to waist",
      values: ["12", "12.3", "13", "14"],
    },
    {
      name: "Sleeve(R)",
      values: ["12", "12.3", "13", "14"],
    },
    {
      values: ["12", "12.3", "13", "14"],
      name: "Chest",
    },
  ];
  // console.log("measure", measure);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {measure.map((data) => (
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
              <Grid item xs={3} style={{ width: "25% !important" }}>
                <Item>{val}</Item>
              </Grid>
            ))}
            {/* <Grid item xs={3}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>4</Item>
        </Grid> */}
          </Grid>
        </>
      ))}
    </Box>
  );
}

export default SizeChart;
