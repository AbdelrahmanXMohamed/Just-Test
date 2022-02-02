import React from 'react';
import axios from '../utils/axios';
import Pagination from '@mui/material/Pagination';

export default function Page2() {
    const [input, setInput] = React.useState(() => '');
    const [data, setData] = React.useState(() => { })
    const [page, setPage] = React.useState(() => 0)
    const submit = (e) => {
        e.preventDefault();
        axios(`https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=${process.env.REACT_APP_CLIENT_ID}`).then(({ data }) => {
            setData(() => data)
        }).catch
            (err => console.log(err.response))
    }
    const handleChange = (event, value) => {
        setPage(() => value);
        axios(`https://api.unsplash.com/search/photos?page=${value}&query=${input}&client_id=${process.env.REACT_APP_CLIENT_ID}`).then(({ data }) => {
            setData(() => data)
        }).catch
            (err => console.log(err.response))
    };
    return (
        <>
            <form onSubmit={submit}>
                <input type="text" style={{ width: "50%" }} onChange={(e) => setInput(() => e.target.value)} placeholder='Search for image' name="Search" />
            </form>
            <hr />
            {
                data && data.results && data.results.map(img =>
                    <img width={200} key={img.id} src={img.links.download} alt={img.id} />)
            }
            {
                data && <div style={{ textAlign: 'center', width: "100%" }}><Pagination count={data.total_pages} page={page} onChange={handleChange} />
                </div>}
        </>
    );
}
