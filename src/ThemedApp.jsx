import { useState, useMemo, createContext } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Edit from "./Edit";
import Template from "./Template";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Template />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/edit/:id",
				element: <Edit />,
			},
		],
	},
]);

export const AppContext = createContext();

export default function ThemedApp(){
      const [mode, setMode] = useState("dark");

      const theme = useMemo(() => {
            return createTheme({
                  palette: {
                        mode,
                  },
            });
      }, [mode]);

      return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={{mode, setMode}}>
				{/* <App /> */}
                        <RouterProvider router={router} />
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}