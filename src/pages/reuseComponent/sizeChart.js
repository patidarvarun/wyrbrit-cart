import React, { useState } from "react";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SizeChart(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [addcss, setaddCss] = useState("");
  const [sizeObject, setSizeObject] = useState([]);

  function handleSelect(size, name, label) {
    setaddCss(name);
    setSelectedValue({ size, name, label });
    if (sizeObject.length === 0) {
      sizeObject.push({ size, name, label });
    } else {
      sizeObject &&
        sizeObject.find((data) => {
          return data.name === name
            ? data.name === name && ((data.size = size), true)
            : sizeObject.push({ size, name, label });
        });
    }
  }
  // console.log("sizeObject", sizeObject);
  // console.log("selectedValue", selectedValue);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {props?.chartData?.map((data) => {
        if (data.filter === props.labelName) {
          return (
            <>
              <style global jsx>{`
                .tickcss {
                  color: white;
                  background: #4545d7;
                }
              `}</style>
              <TabPanel value="1">{data.name} &emsp;&emsp;&emsp;</TabPanel>
              <TabPanel value="2">{data.name}&emsp;&emsp;&emsp;</TabPanel>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {data.values.map((val) => (
                  <Grid item xs={3} style={{ width: "25% !important" }}>
                    <Item
                      className={
                        selectedValue.name === data.name &&
                        selectedValue.size === val
                          ? "tickcss"
                          : ""
                      }
                      onClick={() =>
                        handleSelect(val, data.name, props.labelName)
                      }
                    >
                      {val}
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </>
          );
        }
      })}
      <div style={{ padding: "50px" }}>
        <DialogActions>
          <Button size="large" style={{ margin: "0 auto" }} variant="contained">
            APPLY TO SHIRT
          </Button>
        </DialogActions>
      </div>
    </Box>
  );
}

export default SizeChart;
