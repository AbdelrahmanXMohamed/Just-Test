import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { editCard } from '../feature/card/cardSlice';
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

export default function ToDoModel(prop) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(() => prop.data)
    const dispatch = useDispatch()
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const save = () => {
        axios.put(`http://localhost:3004/card/${state.id}/`, { ...state }).then(({ data }) => {
            dispatch(editCard(data))
            handleClose();
        })
    }


    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: "50%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <label style={{ alignSelf: 'left' }}>Title</label>
                        <input type="text"
                            value={state.do}
                            name="do"
                            onChange={(e) => setState(() => ({ ...state, [e.target.name]: e.target.value }))}
                        />
                    </div>
                    <br />
                    <Button
                        onClick={save}
                    >Add</Button>
                    <Button color="error" onClick={handleClose}>Cancel</Button>

                </Box>
            </Modal>
        </div>
    );
}