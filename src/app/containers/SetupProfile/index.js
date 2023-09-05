import React, { useEffect, useState } from 'react'
import * as Images from "../../../utilities/images";
import MultiStepProgressBar from './component/multiStepProgressBar';
import auth, { userSignUp, } from "../../../redux/slices/auth";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useNavigate, router } from "react-router-dom";


const SetupProfile = () => {
    const [activeTab, setActiveTab] = useState("");
    const location = useLocation();
    const path = location.pathname;
    const [page, setPage] = useState("pageone");
    const [pageNumber, setPageNumber] = useState(2);

    //next page
    const nextPage = (page) => {
        setPage(page);
    };

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
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Sign-Up";

    }, []);
    return (
        <>
            <section className="outerBoxmain">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-lg-12'>
                            <figure>
                                <img src={Images.Logo} alt="logo" className="img-fluid logo" />
                            </figure>
                            <div className='row justify-content-center'>
                                <div className='col-lg-5'>
                                    <div className='login_details'>
                                        <h1 className="loginHeading">Setup Profile</h1>
                                        <div className='stepProgress mt-4'>
                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                    <MultiStepProgressBar page={page} />
                                                </div>
                                                <div className='col-lg-6 text-end'>
                                                    <button>Personal Details</button>
                                                </div>
                                            </div>
                                            {
                                                {
                                                    pageone:
                                                        <>
                                                            <div className='row'>
                                                                <h6>Add Personal Details</h6>
                                                                <div className='col-lg-6'>
                                                                    <div className="input-container mt-5">
                                                                        <label className="border-label">Chef Type</label>
                                                                        <ul className="border-input cheftypeBox">
                                                                            <li className={`chefType ${activeTab === 'restaurant' ? 'active' : path == '/restaurant' ? 'active' : ''}`} onClick={() => setActiveTab('restaurant')}>
                                                                                Restaurant
                                                                                <img src={Images.chefType} alt="" className='' />
                                                                            </li>
                                                                            <li className={`chefType ${activeTab === 'home' ? 'active' : path == '/home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
                                                                                Home
                                                                                <img src={Images.chefType} alt="" className='' />
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className="input-container mt-5">
                                                                        <input type="text" className="border-input" placeholder='15' />
                                                                        <label className="border-label">Experience (In Years)</label>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-12'>
                                                                    <div className="input-container mt-5">
                                                                        <input type="text" className="border-input" placeholder='46 Abingdon Road, Brandeston, United
Kingdom IP13 4PB' />
                                                                        <label className="border-label">Address</label>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-12'>
                                                                    <div className="input-container mt-5">
                                                                        <textarea className="border-input" placeholder='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
   
'></textarea>
                                                                        <label className="border-label">Bio</label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <button className="submit_btn w-100" onClick={(e) => handleSubmit(e, "1")} type="submit"><span className="submit_text">Continue</span></button>
                                                        </>
                                                    ,
                                                    pagetwo:
                                                        <button onClick={(e) => handleSubmit(e, "2")} className="submit_btn w-100" type="submit"><span className="submit_text">Submit</span></button>
                                                    ,
                                                    pagethree:
                                                        <>
                                                            <button className="submit_btn mt-5" type="submit"><span className="submit_text">Continue</span></button>
                                                        </>,
                                                }[page]
                                            }
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