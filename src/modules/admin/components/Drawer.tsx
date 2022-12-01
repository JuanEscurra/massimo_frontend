import {
	Drawer as DrawerMUI,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DrawerHeader } from "./DrawerHeader";
import icon from "assets/img/icon.png";
import { NavLink } from "shared/components/link/NavLink";
import { sections } from "../models/section";


const drawerWidth = '250px';

type Props = {
	isOpen: boolean,
  setIsOpen: Function
};

export const Drawer = ({ isOpen, setIsOpen }: Props) => {
  const theme = useTheme();
	return (
		<DrawerMUI
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={isOpen}
		>
			<DrawerHeader>
        <img src={icon} alt="logo" style={{width: '40px'}}/>
        <Typography variant="h5" >Baratie</Typography>
        <IconButton onClick={() => setIsOpen((isOpen: boolean) => !isOpen)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
			<Divider />
			<List>
				{sections.map((section, index) => (
					<ListItem button key={section.title} component={NavLink} to={section.path}>
						<ListItemIcon>
							{<section.icon />}
						</ListItemIcon>
						<ListItemText primary={section.title} />
					</ListItem>
				))}
			</List>
			<Divider />
		</DrawerMUI>
	);
};
