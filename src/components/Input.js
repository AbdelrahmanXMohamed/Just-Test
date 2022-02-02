import React from 'react';
import InfoIcon from '@mui/icons-material/Info';


export default function Input({ register, errors, placeholder, type, name, otherInput }) {
    return (<>

        <div className="Input">
            {otherInput ?
                otherInput :
                <input
                    type={type || 'text'}
                    placeholder={placeholder}
                    {...register(name, { required: true })}
                />}

            {errors[name]?.type &&
                <div className="icon">
                    {errors[name]?.type && (
                        <p className="error">{'This field is required'}</p>
                    )}<InfoIcon />
                </div>}
        </div>

    </>)
}