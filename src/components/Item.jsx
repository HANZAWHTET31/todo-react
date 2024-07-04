import { ListItem, ListItemText, IconButton } from "@mui/material"
import { CheckBoxOutlineBlank as CheckBoxIcon, CheckBox as CheckIcon, Delete as DeleteIcon } from "@mui/icons-material"

export default function Item({item}){
      return (
		<ListItem>
			{item.done ? (
				<IconButton>
					<CheckIcon />
				</IconButton>
			) : (
				<IconButton>
					<CheckBoxIcon />
				</IconButton>
			)}

			<ListItemText primary={item.name} />

			<IconButton>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
}