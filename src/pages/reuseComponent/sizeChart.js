import React from "react";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SizeChart(props) {
  console.log("Size ", props);
  return (
    <Box sx={{ width: "95%", typography: "body1" }}>
      <TabPanel value="1">
        {props.name1} &emsp;&emsp;&emsp; <a>{props.name2}</a>
      </TabPanel>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        
      >
        <Grid item xs={3} style={{ width: "25% !important" }}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SizeChart;
