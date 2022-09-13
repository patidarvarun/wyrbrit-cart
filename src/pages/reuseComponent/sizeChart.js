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

  const handleClick = () => {
    console.log("sizeobject", sizeObject);
  };

  function handleSelect(itemIndex, size, name, label) {
    setaddCss(name);
    var sizeData = {};
    setSelectedValue({ size, name, label });
    sizeData = { itemIndex, size, name, label };
    var index = sizeObject.findIndex((std) => std.name === name);

    if (index === -1) {
      sizeObject.push(sizeData);
    } else {
      sizeObject.splice(index, 1, sizeData);
    }
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {props?.chartData?.map((data) => {
        if (data.filter === props.labelName) {
          return (
            <>
              <TabPanel value="1">{data.name} &emsp;&emsp;&emsp;</TabPanel>
              <TabPanel value="2">{data.name}&emsp;&emsp;&emsp;</TabPanel>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {data.values.map((val, itemIndex) => {
                  var index = sizeObject.findIndex(
                    (std) =>
                      std.itemIndex === itemIndex && std.name === data.name
                  );

                  return (
                    <Grid
                      item
                      xs={3}
                      style={{
                        width: "25% !important",
                      }}
                    >
                      <Item
                        style={{
                          background: index === -1 ? "white" : "#3832A0",
                          color: index === -1 ? "#6c6c6c" : "white",
                          border: "1px solid rgb(108, 108, 108)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleSelect(
                            itemIndex,
                            val,
                            data.name,
                            props.labelName
                          )
                        }
                      >
                        {val}
                      </Item>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          );
        }
      })}
      <div style={{ padding: "50px" }}>
        <DialogActions>
          <Button
            onClick={handleClick}
            size="large"
            style={{ margin: "0 auto" }}
            variant="contained"
          >
            APPLY TO {props?.labelName?.toUpperCase()}
          </Button>
        </DialogActions>
      </div>
    </Box>
  );
}

export default SizeChart;
