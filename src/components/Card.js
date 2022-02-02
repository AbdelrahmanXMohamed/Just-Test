import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToDoModel from "./ToDoModel";
import DeleteModel from './DeleteModel ';
export default function BasicCard(prop) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {prop.data.do}
                </Typography>
            </CardContent>
            <CardActions>
                <ToDoModel data={prop.data} />
                <DeleteModel data={prop.data} />

            </CardActions>
        </Card >
    );
}