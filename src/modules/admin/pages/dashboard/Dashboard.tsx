import { Fragment } from "react";

import {Box, Typography} from "@mui/material";
import {options} from "../../../../shared/models/Option";
import CardModule from "./CardModule";


const Dashboard = () => {
  return (
    <Fragment>
      <Typography variant="h3" align="center" style={{marginTop: '0'}}>
        Inicio
      </Typography>
      <Box style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "35px", flexWrap: "wrap"}}>
        {
          options.map(option => (

            <CardModule option={option} key={option.title} />
          ))
        }
      </Box>
    </Fragment>
  );
};

export default Dashboard;