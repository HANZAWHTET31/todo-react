import { useContext } from "react";
import { AppContext } from "../ThemedApp";

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
	List as ListIcon,
	DarkMode as DarkModeIcon,
	LightMode as LightModeIcon,
} from "@mui/icons-material";

export default function Header({ count }) {
	const { mode, setMode } = useContext(AppContext);

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton>
					<ListIcon />
				</IconButton>

				<Typography sx={{ flexGrow: 1, ml: 3 }}>
					TODO-LIST
					<Badge badgeContent={count} color="error" sx={{ m:2 }}></Badge>
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
