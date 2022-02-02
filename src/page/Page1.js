import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
// import Button from '@mui/material/Button';
import axios from '../utils/axios';
import NestedModal from '../components/Model'
function createData({ userId, title, body, id }) {
    return { userId, title, body, id, check: false };
}

export default function Page1() {
    const [state, setState] = React.useState(() => [])
    const [page, setPage] = React.useState(() => 1)
    const sortState = () => {

        setState(() => [...state].reverse());
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
    };
    const handleCheck = (id) => {
        let newState = [...state].map(data => {
            if (data.id === id)
                return { ...data, check: !data.check }
            return data
        })
        setState(() => newState)
    }
    React.useEffect(() => {
        axios("http://localhost:3004/posts").then(({ data }) => {
            const newData = data.map(data => {
                return createData(data)
            })
            setState(() => newData)
        }).catch(error => { console.log(error) })
    }, [])
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >{" "}</TableCell>
                            <TableCell onClick={sortState}>UserId</TableCell>
                            <TableCell >Title</TableCell>
                            <TableCell >Body</TableCell>
                            <TableCell >Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state && state.slice(page ? page * 10 : 0, page ? page * 10 + 10 : 10).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <input type='checkbox' onChange={() => handleCheck(row.id)} />

                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>
                                    {row.userId}
                                </TableCell>
                                <TableCell >{row.title}</TableCell>
                                <TableCell >{row.body}</TableCell>
                                <TableCell > <NestedModal data={row} setState={setState} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                count={state && state.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
/*<Button color="primary">Actions</Button>*/