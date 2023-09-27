import React from 'react'
import * as Images from "../../../../utilities/images"


const EditAddressModal = () => {
    return (
        <>
            <div className='editadressection'>
                <div className='tabsection'>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Office</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Other</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">home</div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">office</div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">other</div>
                    </div>

                    <div className="input-container mt-5">
                        <input
                            type="text"
                            name="phone"
                            className="border-input"
                            placeholder=''
                        />
                        <label className="border-label">Phone</label>
                    </div>
                    <div className="input-container mt-5">
                        <select name="cars" id="cars" className="border-input">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                        <label className="border-label">Phone</label>
                    </div>
                    <div className="input-container mt-5">
                        <input
                            type="text"
                            name="phone"
                            className="border-input"
                            placeholder=''
                        />
                        <label className="border-label">Phone</label>
                        <img src={Images.DeleteIcon} alt="InfoIcon" className='InputIcon' />

                    </div>

                </div>
            </div>
        </>
    )
}

export default EditAddressModal