import React from 'react'
import * as Images from "../../../../utilities/images"

const OrderCancelModal = () => {
    return (
        <>
            <div className='ordercancelsection'>
                        <div className='paymentdonesection'>
                            <img src={Images.OrderPlace} alt='accountdeletedimg' className='img-fluid' />
                            <p className='accountDeleted mt-3'>Order Canceled</p>
                            <p className='accountdeletetxt mt-2 '>Your amount will be refund Within 1 hour.</p>
                            <div className='modalfooterbtn'>
                                <div className='addfoodbtn'>
                                    <button className='foodmodalbtn'>
                                    Okay
                                    </button>
                                </div>
                            </div>
                </div>
            </div>
        </>
    )
}

export default OrderCancelModal