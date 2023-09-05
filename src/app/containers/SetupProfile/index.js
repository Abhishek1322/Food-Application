import React, { useEffect, useState } from 'react'
import * as Images from "../../../utilities/images";
import MultiStepProgressBar from './component/multiStepProgressBar';
import auth, { userSignUp, } from "../../../redux/slices/auth";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link, router } from "react-router-dom";

const SetupProfile = () => {

    const [hideResendButton, setHideResendButon] = useState(true);
    // const router = useRoutes();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [numOtp, setNumOtp] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [phNum, SetPhNum] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [investmentExperience, setInvestment_experience] = useState(null);
    const [investment_experienceyears, setInvestment_experienceyears] = useState(null);
    const [investment_frequency, setInvestment_frequency] = useState(null);

    const handleChangeOtp = (value) => {
        setOtp(value);
    }
    const handleChangeNumOtp = (value) => {
        setNumOtp(value)
    }
    const [page, setPage] = useState("pageone");
    const [pageNumber, setPageNumber] = useState(2);

    //next page
    const nextPage = (page) => {
        setPage(page);
    };

    //onchange input
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value.trim() });
        setErrorMessages({ ...errorMessages, [name]: "" });
    };

    const handleResendOtp = (e) => {
        e.preventDefault();
        let params = {
            email: formData.email,
            type: 1
        }
    }
    //form login
    const handleSubmit = (e, flag) => {
        e.preventDefault();



        if (flag == 1) {
            setPageNumber(2)
            nextPage("pagetwo")

        }
        else if (flag == 2) {
            setPageNumber(3)
            nextPage("pagethree")
        }
    }
    const handleSubmitOtp = (e, flag) => {
        e.preventDefault();
        let numberRegex = /^\d+$/;
        if (!otp) {
            toast.error("Please enter OTP")
            return;
        }
        else if (!otp.match(numberRegex)) {
            toast.error("OTP should be number only");
            return;
        }

        let params = {
            email: formData.email.trim(),
            otp: otp,
            type: 1,
        };
    }
    ////password field show or hide
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const onChangePhoneNumber = (value, data) => {
        let phoneCode = data.dialCode;
        let phoneNumber = value.slice(data.dialCode.length);
        SetPhNum(phoneNumber);
        setCountryCode(phoneCode);
    }

    // useEffect(() => {
    //     if (router.query.flag == "pagetwo") {
    //         setPage("pagetwo");
    //     }
    //     else if (router.query.flag == "pagethree") {
    //         setPage("pagethree");
    //     }
    //     if (router.query.email) {
    //         setFormData({ ...formData, email: router.query.email });
    //     }

    // }, [router.query]);

    // const renderInput = (props, index) => {
    //     const isActive = otp.length === index;
    //     const inputClass = `enterOtp ${isActive ? 'active' : ''}`;

    //     return <input {...props} className={inputClass} />;
    //   };

    //  const onPageNumberClick =(page) => {
    //     setPage(page);
    //  }

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Sign-Up";

    }, []);

    //   const handleBackstep=()=>{
    //     setPageNumber(3)
    //     nextPage("pagethree")

    //   }
    // next page number
    const handleBackstep = (pageNumber) => {
        if (pageNumber == "pagethree") {
            nextPage("pagethree")
        }
        // setPage("pagethree");
        // setPageNumber(3);
    };
    return (
        <>
            <section className="outerBoxmain">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-lg-12'>
                            <img src={Images.Logo} />
                            <div className='row justify-content-center'>
                                <div className='col-lg-5'>
                                    <div className='loginBox'>
                                        <figure className='logoBox mb-3'>
                                            {/* <Image src={Images.logoOne} alt='logoOne' className="logoIcon" /> */}
                                        </figure>
                                        <div className='login_details'>
                                            <h1 className="loginHeading">Setup Profile</h1>
                                            <div className='stepProgress mt-4'>
                                                <MultiStepProgressBar page={page} />
                                                {
                                                    {
                                                        pageone:
                                                            <div className='signUpBox'>
                                                                <h6 className='formHeading my-4'>Basic info</h6>
                                                                <form onSubmit={(e) => handleSubmit(e, "1")} className='registrationForm row mt-3'>
                                                                    <div className="form-group mb-3">
                                                                        <input type="text" placeholder="First Name " name="firstName" maxLength={25} className="form-control input_box" value={formData.firstName} onChange={(e) => { handleChange(e) }} />
                                                                    </div>
                                                                    <div className="form-group mb-3">
                                                                        <input type="text" placeholder="Last Name " name="lastName" maxLength={25} className="form-control input_box" value={formData.lastName} onChange={(e) => { handleChange(e) }} />
                                                                    </div>
                                                                    <div className="form-group mb-3">
                                                                        <input type="text" placeholder="Email" name="email" className="form-control input_box" value={formData.email} onChange={(e) => { handleChange(e) }} />
                                                                    </div>
                                                                    <div className="form-group mb-3">
                                                                        <input type={passwordShown ? "text" : "password"} placeholder="Password" name="password" className="form-control input_box pe-3" value={formData.password} onChange={(e) => { handleChange(e); }} />
                                                                        <span className="toggle_password_ info_icon" onClick={() => { togglePasswordVisiblity(!passwordShown) }}>
                                                                            <span className={passwordShown ? "show-icon togglePassword" : "hide-icon togglePassword"} id=""></span>
                                                                        </span>
                                                                    </div>
                                                                    <button className="submit_btn w-100" onClick={(e) => handleSubmit(e, "1")} type="submit"><span className="submit_text">Continue</span></button>
                                                                    <p className=" input_label text-center  pt-3">Already have an a account. <Link href='/web/Auth/login' className="forget_password"> login</Link></p>
                                                                </form>
                                                            </div>,
                                                        pagetwo:
                                                            <div className='mt-4'>
                                                                <div className='formHeading verifyPhoneNumber'>

                                                                    {/* <Image src={Images.BackIcon} alt='logo' className="backIcon" /> */}
                                                                    <span>Verify Email</span>
                                                                </div>
                                                                <p className='input_label px-5'>Enter the OTP that we just sent on your email address.</p>
                                                                <form onSubmit={(e) => handleSubmit(e, "2")} className='registrationForm row mt-3'>

                                                                    {hideResendButton &&
                                                                        <p className="forget_password text-end py-3" onClick={(e) => handleResendOtp(e)}>Resend</p>
                                                                    }
                                                                    {/* <button className="submit_btn mt-3"><span className="submit_text">Submit</span></button> */}
                                                                    <button onClick={(e) => handleSubmit(e, "2")} className="submit_btn w-100" type="submit"><span className="submit_text">Submit</span></button>
                                                                </form>
                                                            </div>,
                                                        pagethree:
                                                            <><div className='mt-4'>
                                                                <h6 className='formHeading'><span>Enter Phone Number</span></h6>
                                                                <p className='input_label'>Enter phone number to confirm their identity youget the verify code through SMS</p>
                                                                <form className='registrationForm row mt-3'>
                                                                    <div className="email_outer">
                                                                        <label>Phone Number</label>

                                                                        <PhoneInput
                                                                            placeholder='Enter Phone number'
                                                                            country={'us'}
                                                                            value={countryCode} Create Account
                                                                            onChange={(value, data, event, formattedValue) => { onChangePhoneNumber(value, data, event, formattedValue) }}
                                                                        />

                                                                    </div>
                                                                    {/* <div className="form-group mt-5">
                                                                        <input type="number" placeholder="Phone number" name="phNum" value={phNum} onChange={(e) => SetPhNum(e.target.value)} className="form-control input_box" />
                                                                    </div> */}
                                                                    <button className="submit_btn mt-5" type="submit"><span className="submit_text">Continue</span></button>
                                                                </form>
                                                            </div></>,
                                                    }[page]
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SetupProfile