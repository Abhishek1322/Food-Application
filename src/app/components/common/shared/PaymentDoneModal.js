import React from 'react'
import * as Images from "../../../../utilities/images"

const PaymentDoneModal = () => {
    return (
        <>
            <div className='paymentdonesection'>
                <img src={Images.accountDeleted} alt='accountdeletedimg' className='img-fluid' />
                <p className='accountDeleted mt-3'> Payment Done</p>
                <p className='accountdeletetxt mt-2 '>Your payment has been successfully done
                    for order no. #12458</p>
            </div>
        </>
    )
}

export default PaymentDoneModal