import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import img from "assets/img/main-login.png";
import logo from "assets/img/icon-256.png";
import "./styles/auth.css";
import { ReactElement } from "react";

const AuthPage = (): ReactElement => {

	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Box
				width="85%"
				height="600px"
				borderRadius="10px"
				display="flex"
				alignItems="stretch"
				boxShadow="10px 10px 47px -14px rgba(0, 0, 0, 0.7)">
				<Box
					width="45%"
					borderRadius="10px 0 0 10px"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					color="white"
					textAlign="center"
					sx={{
						background: `url(${img}) no-repeat center`,
						backgroundSize: "cover",
						display: {
							xs: 'none',
							sm: "flex"
						}
					}}>
					<img src={logo} alt="logo"></img>
					<h1>Restaurante Baratie</h1>
				</Box>
				<Box
					width="55%"
					padding="15px 30px">
					<Outlet></Outlet>
				</Box>
			</Box>
		</Container>
	);
};

export default AuthPage;