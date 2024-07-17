import { useState, useRef, useEffect } from 'react';

import { Box, List, IconButton, InputAdornment, OutlinedInput, Alert, Badge } from '@mui/material';
import {
	List as ListIcon,
	AddCircle as AddIcon,
} from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Item from './components/item';

export default function App(){
  const [data, setData] = useState([
    {_id: 1, name: "Read books", done: false},
    {_id: 2, name: "Code X-app", done: false},
    {_id: 3, name: "Watch tutorials", done: false},
    {_id: 4, name: "Reset", done: true},
  ]);

  const inputRef = useRef();

  const add = async name => {
    const id = data.length + 1;
    setData([...data, {_id: id, name, done: false}]);
  };

  const remove = _id => {
	setData(data.filter(item => item._id !== _id));
  };

  const toggle = _id => {
	setData(data.map(item => {
		if(item._id === _id) item.done = !item.done;
		return item;
	}));
  };

  return (
		<Box>
			<Box sx={{ padding: 5 }}>
				<h1>
					Todo
					<Badge
						color="error"
						badgeContent={
							data.filter((item) => !item.done)
							.length
						}
						sx={{m: 1}}
						>
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
							<IconButton type="submit">
								<AddIcon />
							</IconButton>
						}
					/>
				</form>
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