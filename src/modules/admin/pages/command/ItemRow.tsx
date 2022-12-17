import { IconButton, TableCell, TableRow } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';
import { CommandDetail } from 'shared/models/Command';


interface Props {
    detail: CommandDetail,
    deleteItem: Function
}

export const ItemRow = ({detail, deleteItem}: Props) => {

  return (
    <TableRow key={`itemProduct-${detail.id}`}>
        <TableCell>{detail.product?.name}</TableCell>
        <TableCell>{detail.product?.price}</TableCell>
        <TableCell align='center'>
					{detail.quantity}
        </TableCell>
        <TableCell>
        <IconButton aria-label='delete' size='large' onClick={() => deleteItem(detail.id)}>
            <DeleteIcon fontSize="large" />
        </IconButton>
        </TableCell>
    </TableRow>
  )
}
