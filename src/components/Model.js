import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from '../utils/axios';

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

function ChildModal(prop) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        axios.delete(`http://localhost:3004/posts/${prop.id}/`).then(() => {
            prop.setState(prevState => [...prevState].filter(item => {
                if (item.id === prop.id) {
                    return false
                }
                return true
            }
            ))
            prop.handlePerentClose()
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
                        Are you sure you want to delete this post ?
                    </p>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>

                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal(prop) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(() => prop.data)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const save = () => {
        axios.put(`http://localhost:3004/posts/${state.id}/`, { ...state }).then((data) => {
            prop.setState(prevState => [...prevState, data])
            handleClose();
        })
    }


    return (
        <div>
            <Button onClick={handleOpen}>Actions</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: "50%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <label style={{ alignSelf: 'left' }}>Title</label>
                        <input type="text" value={state.title} name="title"
                            onChange={(e) => setState(() => ({ ...state, [e.target.name]: e.target.value }))}
                        />
                        <label>Body</label>
                        <textarea rows={5} value={state.body} name="body"
                            onChange={(e) => setState(() => ({ ...state, [e.target.name]: e.target.value }))} />
                    </div>
                    <br />
                    <Button onClick={save}>Add</Button>
                    <ChildModal id={state.id} setState={prop.setState} handlePerentClose={handleClose} />

                </Box>
            </Modal>
        </div>
    );
}