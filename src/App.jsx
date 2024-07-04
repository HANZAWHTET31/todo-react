import { useState, useRef, useEffect } from 'react';

import { Box, List, IconButton, InputAdornment, OutlinedInput, Alert } from '@mui/material';
import { List as ListIcon, AddCircle as AddIcon} from "@mui/icons-material"

import Item from './components/item';

export default function App(){
  const [data, setData] = useState([
    {id: 1, name: "Read books", done: false},
    {id: 2, name: "Code X-app", done: false},
    {id: 3, name: "Watch tutorials", done: false},
    {id: 4, name: "Reset", done: true},
  ]);

  const inputRef = useRef();

  const add = async name => {
    const id = data.length + 1;
    setData([...data, {id: id, name, done: false}]);
  }

  return (
		<Box>
			<h1>Todo-List</h1>
			<hr />
			<form onSubmit={e => {
        e.preventDefault();
        const name = inputRef.current.value;
        if(!name){
          alert("Please fill a task");
          return false;
        }
        add(name);
        inputRef.current.value = "";
        inputRef.current.focus();
      }}>
				<OutlinedInput
					fullWidth
					inputRef={inputRef}
					endAdornment={
						<IconButton type='submit'>
							<AddIcon />
						</IconButton>
					} />
			</form>
			<ul>
				{data
					.filter((item) => !item.done)
					.map((item) => {
						return (
							<Item
								key={item.id}
								item={item}
							/>
						);
					})}
			</ul>
			<hr />
			<ul>
				{data
					.filter((item) => item.done)
					.map((item) => {
						return (
							<Item
								key={item.id}
								item={item}
							/>
						);
					})}
			</ul>
		</Box>
  );
}