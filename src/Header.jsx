import { useContext } from "react";
import { AppContext } from "./ThemedApp";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
	List as ListIcon,
	DarkMode as DarkModeIcon,
	LightMode as LightModeIcon,
} from "@mui/icons-material";

export default function Header() {
	const { mode, setMode } = useContext(AppContext);

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton>
					<ListIcon />
				</IconButton>

				<Typography sx={{ flexGrow: 1, ml: 3 }}>TODO-LIST</Typography>

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
