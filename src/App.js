import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Activities from "./View/Activities";
import LogIn from "./View/LogIn";
import Settings from "./View/Settings";
import SingUp from "./View/SingUp";
import Statistics from "./View/Statistics";
import LogOut from "./View/Statistics";
import "./App.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [loged, setLoged] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              width: "25%",
            }}
            label="Home"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              width: "25%",
            }}
            label="Statistics"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              width: "25%",
            }}
            label="Settings"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              width: "25%",
            }}
            label={loged ? "Log Out" : "Sing In / Log In"}
            // label="test"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Activities></Activities>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Statistics></Statistics>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Settings></Settings>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LogOut></LogOut>
        <LogIn></LogIn>
        <SingUp></SingUp>
      </TabPanel>
    </Box>
  );
}
