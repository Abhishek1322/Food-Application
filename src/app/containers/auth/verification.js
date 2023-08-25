import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { userOtp } from '../../../redux/slices/auth';
import { useAuthSelector } from '../../../redux/selector/auth';

const Verification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const authSelector = useAuthSelector()
    let user_id = location?.state?.id;
    const [otp, setOtp] = useState('');

    //onchange otp
    const handleChangePin = (newValue) => {
        console.log(newValue,"newValue");
        setOtp(newValue)
    }

    //form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }
        let params = {
            user_id: user_id,
            otp: parseInt(otp),
            status: 1
            // otp: otp,
        }
    }
    useEffect(() => {
        document.title = "Verification";
    }, []);

    return (
        <>
        
        </>
    )
}

export default Verification