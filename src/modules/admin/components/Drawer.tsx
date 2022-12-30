import {
	Drawer as DrawerMUI,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	IconButton,
	Typography, ListItemButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DrawerHeader } from "./DrawerHeader";
import icon from "assets/img/icon.png";
import { NavLink } from "shared/components/link/NavLink";
import { sections } from "../models/section";
import { Link } from "react-router-dom";
import {Fragment} from "react";


const drawerWidth = '250px';

type Props = {
	isOpen: boolean,
  setIsOpen: Function
};

export const Drawer = (props: Props) => {

	return (
		<Fragment>
			<DrawerMUI
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				open
			>
				<DrawerContent {...props} />
			</DrawerMUI>
			<DrawerMUI
				variant="temporary"
				open={props.isOpen}
				onClose={() => props.setIsOpen((isOpen: boolean) => !isOpen)}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<DrawerContent {...props} />
			</DrawerMUI>
		</Fragment>

	);
};

const DrawerContent = ({isOpen, setIsOpen} :Props) => {
	const theme = useTheme();

	return (
		<Fragment>
			<DrawerHeader>
				<img src={icon} alt="logo" style={{width: '40px'}}/>
				<Typography variant="h5" style={{cursor: "pointer"}}>
					<Link to="/admin/dashboard">Massimo</Link>
				</Typography>
				<IconButton onClick={() => setIsOpen((isOpen: boolean) => !isOpen)}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{sections.map((section) => (
					<ListItem key={section.title} component={NavLink} to={section.path} style={{fontSize: "0.9rem", color: "black"}}>
						<ListItemButton>
							<ListItemIcon>
								{<section.icon />}
							</ListItemIcon>
							{ section.title }
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Fragment>
	)
}