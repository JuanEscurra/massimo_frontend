import { Fragment } from "react";

import { Typography } from "@mui/material";

import UserList from "./UserList";



const UserPage = () => {
	return (
		<Fragment>
			<Typography variant="h3" align="center" style={{marginTop: '0'}}>
				Usuarios registrados
			</Typography>
      <UserList />
		</Fragment>
	);
};

export default UserPage;