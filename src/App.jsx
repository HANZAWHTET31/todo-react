import { useState, useRef, useEffect } from "react";

import {
	Box,
	List,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Alert,
	Badge,
} from "@mui/material";
import { AddCircle as AddIcon } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Item from "./components/item";

const api = "http://localhost:8181/tasks";

export default function App() {
	//   const [data, setData] = useState([
	//     {_id: 1, name: "Read books", done: false},
	//     {_id: 2, name: "Code X-app", done: false},
	//     {_id: 3, name: "Watch tutorials", done: false},
	//     {_id: 4, name: "Reset", done: true},
	//   ]);
	const [ data, setData ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ hasError, setHasError ] = useState(false)
	const inputRef = useRef();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(api);
				if (res.ok) {
					const data = await res.json();
					setData(data);
					setLoading(false);
					setHasError(false);
				} else {
					setLoading(false);
					setHasError(true);
				}
			} catch (error) {
				setHasError(true);
			}
		})();
	}, []);

	const add = async (name) => {
		const res = await fetch(`${api}`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({name}),
		});
		const item = res.json();
		setData([...data, item]);
	};

	const remove = (_id) => {
		setData(data.filter((item) => item._id !== _id));
		fetch(`${api}/${_id}/delete`, {
			method: "DELETE",
		})
	};

	const toggle = (_id) => {
		setData(
			data.map((item) => {
				if (item._id === _id) item.done = !item.done;
				return item;
			}),
		);
		fetch(`${api}/${_id}/toggle`, {
			method: "PUT"
		});
	};

	return (
		<Box>
			<Box sx={{ margin: 0, padding: 2 }}>
				<h1>
					Todo
					<Badge
						color="error"
						badgeContent={
							data.filter((item) => !item.done)
								.length
						}
						sx={{ m: 1 }}>
						<AssignmentIcon />
					</Badge>
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const name = inputRef.current.value;
						if (!name) return false;
						add(name);
						inputRef.current.value = "";
						inputRef.current.focus();
					}}>
					<OutlinedInput
						fullWidth
						inputRef={inputRef}
						endAdornment={
							<InputAdornment position="end">
								<IconButton type="submit">
									<AddIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
				</form>
				{loading && (
					<Alert sx={{ justifyContent: "center" }}>
						Loading......
					</Alert>
				)}
				{hasError && (
					<Alert
						severity="error"
						sx={{ mb: 2 }}>
						Something went wrong
					</Alert>
				)}
				<List>
					{data
						.filter((item) => !item.done)
						.map((item) => {
							return (
								<Item
									key={item._id}
									item={item}
									remove={remove}
									toggle={toggle}
								/>
							);
						})}
				</List>
				<hr />
				<List>
					{data
						.filter((item) => item.done)
						.map((item) => {
							return (
								<Item
									key={item._id}
									item={item}
									remove={remove}
									toggle={toggle}
								/>
							);
						})}
				</List>
			</Box>
		</Box>
	);
}
