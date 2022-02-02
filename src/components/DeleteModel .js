import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../feature/card/cardSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function DeleteModel(prop) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        axios.delete(`http://localhost:3004/card/${prop.data.id}/`).then(() => {
            dispatch(deleteCard(prop.data.id))
            handleClose()
        })
    }

    return (
        <React.Fragment>
            <Button onClick={handleOpen} color="error">Delete</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Delete</h2>
                    <p id="child-modal-description">
                        Are you sure you want to delete this todo  ?
                    </p>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>

                </Box>
            </Modal>
        </React.Fragment>
    );
}