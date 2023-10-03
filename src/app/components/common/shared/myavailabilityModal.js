import React from 'react'
import * as Images from "../../../../utilities/images"

const MyavailabilityModal = () => {
    return (
        <>
            <div className='ProfilePageModal'>
                <div className='availabilityModal'>
                    <ul class="myAvailability_">
                        <li class="availabilityDays">
                            <p class="notificationText text-capitalize">mon</p>
                        </li>
                        <li class="availabilityDays active">
                            <p class="notificationText text-capitalize">tue</p>
                        </li>
                        <li class="availabilityDays">
                            <p class="notificationText text-capitalize">wed</p>
                        </li>
                        <li class="availabilityDays">
                            <p class="notificationText text-capitalize">thu</p>
                        </li>
                        <li class="availabilityDays">
                            <p class="notificationText text-capitalize">fri</p>
                        </li>
                        <li class="availabilityDays">
                            <p class="notificationText text-capitalize">sat</p>
                        </li>
                        <li class="availabilityDays">
                            <p class="notificationText text-capitalize">sun</p>
                        </li>
                    </ul>


                    {/* <div className='flexBox '>
                        <div className='myavailability mt-4'>
                            <div className='availabilityBox_ me-4'>
                                <p className='innerBoxText'>From</p>
                                <div className='availableTime flexBox '>
                                    <img src={Images.availabilityClock} className='clockImg pe-1' />
                                    <p className='venushedule'>08:30 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='myavailability mt-4 '>
                            <div className='availabilityBox_ me-4'>
                                <p className='innerBoxText'>From</p>
                                <div className='availableTime flexBox '>
                                    <img src={Images.availabilityClock} className='clockImg pe-1' />
                                    <p className='venushedule'>08:30 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='deleteImg_'>
                            <img src={Images.editprofileDelete} className='deleteAvailable' />
                        </div>
                    </div> */}

                    {/* My availability time Slot Modal HTML START */}
                    <div className='timeSlotbutton flexBox justify-content-center mt-4'>
                        <button className='slotButton'>
                            <i class="fas fa-plus addmore"></i>
                            Add Time Slot </button>
                    </div>

                    {/* My availability time Slot Modal HTML END */}

                </div>
                <button className='foodmodalbtn  modalfooterbtn'>
                    Done
                </button>

            </div>
        </>
    )
}

export default MyavailabilityModal