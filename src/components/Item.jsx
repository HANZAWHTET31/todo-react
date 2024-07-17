import { ListItem, ListItemText, IconButton } from "@mui/material"
import { CheckBoxOutlineBlank as CheckBoxIcon, CheckBox as CheckIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { Link } from "react-router-dom";

export default function Item({item, remove, toggle}){
      return (
		<ListItem>
			{item.done ? (
				<IconButton onClick={() => toggle(item._id)}>
					<CheckIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => toggle(item._id)}>
					<CheckBoxIcon />
				</IconButton>
			)}

			<ListItemText primary={item.name} />

			<Link to={`/edit/${item._id}`}>
				<EditIcon />
			</Link>

			<IconButton onClick={() => remove(item._id)}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
}