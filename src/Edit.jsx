import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
	Box,
	IconButton,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";

const api = "http://localhost:8181/tasks";

export default function Edit() {
	const { id } = useParams();
	const [name, setName] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const res = await fetch(`${api}/${id}`);
			const item = await res.json();
			setName(item.name);
		})();
	}, []);
	return (
		<Box
			maxWidth="md"
			sx={{
				margin: "auto",
				mt: 4,
				p: 4,
				borderRadius: 10,
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: lightBlue[500],
			}}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					(async () => {
						await fetch(`${api}/${id}`, {
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ name }),
						});
						navigate("/");
					})();
				}}>
				<OutlinedInput
					fullWidth
					value={name}
					onChange={(e) => setName(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							<IconButton type="submit">
								<SaveIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</form>
		</Box>
	);
}
