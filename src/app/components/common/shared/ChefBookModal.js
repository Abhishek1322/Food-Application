import React from 'react'
import { Link } from 'react-router-dom'
import * as Images from "../../../../utilities/images"

const ChefBookModal = () => {
    return (
        <>
            <div className='chefbookmodalsection'>
                <div className='container-fluid'>
                    <p className='chatheadtext '>Hire Chef</p>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='sarahinfo'>
                                <div className='sarahimg'>
                                    <img src={Images.UserICon} alt='sarahimage' className='img-fluid' />
                                </div>
                                <div className='saraheading'>
                                    <p className='chatheadtext'>Sarah Bergstrom</p>
                                    <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                                    <button className='restrodetail'>
                                        Restaurant
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                        <p className=''> <span className=''>£45</span>/hour</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChefBookModal
