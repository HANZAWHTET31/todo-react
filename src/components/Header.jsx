import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../ThemedApp";

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
	List as ListIcon,
	DarkMode as DarkModeIcon,
	LightMode as LightModeIcon,
	ArrowBack as BackIcon,
} from "@mui/icons-material";

export default function Header() {
	const { mode, setMode } = useContext(AppContext);

	const {pathName} = useLocation();

	return (
		<AppBar position="static">
			<Toolbar>
				{pathName === "/" ? (
					<IconButton>
						<ListIcon />
					</IconButton>
				) : (
					<Link to="/">
						<IconButton>
							<BackIcon />
						</IconButton>
					</Link>
				)}

				<Typography sx={{ flexGrow: 1, ml: 3 }}>
					TODO-LIST
					{/* <Badge badgeContent={count} color="error" sx={{ m:2 }}></Badge> */}
				</Typography>

				{mode === "dark" ? (
					<IconButton onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
