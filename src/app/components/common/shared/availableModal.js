import React from 'react'
import * as Images from "../../../../utilities/images";

const AvailableModal = () => {
  return (
    <>
        <div className='modalContent'>
           <div className='availabledays'>
            <p className='notificationText'>Mon</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>7:30 am - 08:30 pm</p>
            </div>
           </div>
           <div className='availabledays mt-3'>
            <p className='notificationText'>Tue</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>8:30 am - 06:30 pm</p>
            </div>
           </div>
           <div className='availabledays mt-3'>
            <p className='notificationText'>Wed</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>8:00 am - 07:30 pm</p>
            </div>
           </div>
           <div className='availabledays mt-3'>
            <p className='notificationText'>Thu</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>9:30 am - 08:00 pm</p>
            </div>
           </div>
           <div className='availabledays mt-3'>
            <p className='notificationText'>Fri</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>8:30 am - 06:30 pm</p>
            </div>
           </div>
           <div className='availabledays mt-3'>
            <p className='notificationText'>Sat</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>8:30 am - 07:30 pm</p>
            </div>
           </div>
           <div className='availabledays mt-3'>
            <p className='notificationText'>Sun</p>
            <div className='daytimes '>
                <img src={Images.ClockIcon} alt='clockimage' className='img-fluid'/>
                <p className='daytimesheading'>8:30 am - 07:00 pm</p>
            </div>
           </div>
        </div>
    </>
  )
}

export default AvailableModal