import React from 'react';
import BasicCard from '../components/Card';
import axios from '../utils/axios';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { retreiveCard, addCard } from "../feature/card/cardSlice"
export default function Page3() {
    const [input, setInput] = React.useState(() => '');
    const cards = useSelector(state => state.card.card)

    const dispatch = useDispatch();
    React.useEffect(() => {
        axios("http://localhost:3004/card").then
            (({ data }) => { dispatch(retreiveCard(data)) }).catch(err => console.log(err))
    }, [dispatch])
    const submit = (e) => {
        e.preventDefault();
        if (input.length > 0) {
            axios.post("http://localhost:3004/card", { id: parseInt(Math.random() * 10000), do: input }).then(({ data }) => {
                dispatch(addCard(data))
            }).catch(err => console.log(err))
            setInput(() => '')
        }
    }
    return (
        <>
            <form onSubmit={submit} style={{ display: 'flex', gap: "10px", flexWrap: "wrap" }}>
                <input type="text" placeholder='Add to do list' onChange={(e) => setInput(() => e.target.value)} value={input} />
                <Button variant="contained" type="submit">
                    Add
                </Button>
            </form>
            <hr />
            <div style={{ display: 'flex', gap: "10px", flexWrap: "wrap" }}>
                {cards && cards.map(item =>
                    <div key={item.id}>
                        <BasicCard data={item} />

                    </div>
                )}
            </div>

        </>
    );
}
