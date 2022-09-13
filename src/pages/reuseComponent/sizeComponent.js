import React, { Component } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SizeChart from "./sizeChart";

const SizeComponent = (props) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={
                  props.label1.charAt(0).toUpperCase() + props.label1.slice(1)
                }
                value="1"
              />
              <Tab
                label={
                  props.label2.charAt(0).toUpperCase() + props.label2.slice(1)
                }
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SizeChart
              chartData={props.measurementData}
              labelName={props.label1}
            />
          </TabPanel>
          <TabPanel value="2">
            <SizeChart
              chartData={props.measurementData}
              labelName={props.label2}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default SizeComponent;
