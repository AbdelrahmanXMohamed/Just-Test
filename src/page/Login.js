import React from 'react';
import Input from '../components/Input';
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(() => false);
    const [error, setError] = React.useState(() => '')
    let Navigate = useNavigate();
    const onSubmit = data => {
        setLoading(() => true)
        axios(`http://localhost:3004/user?username=${data['username']}`)
            .then((newData) => {
                if (newData.data.password === data.password)
                    Navigate('/page1');
                throw "invalid username or password";
            }).catch(err => {
                setLoading(() => false);
                setError(() => err)
            })

    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='Form'>
                {error && <Alert severity="error">{error}</Alert>}
                <Input name='username' placeholder='Username' register={register} errors={errors} type="text" />
                <Input name='password' placeholder='Password' type="password" register={register} errors={errors} />
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Loading..."
                    variant="outlined"
                    type="submit"
                >
                    Submit
                </LoadingButton>
            </form>

        </>
    );
}
