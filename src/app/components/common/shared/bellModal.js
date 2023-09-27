import React from 'react'
import * as Images from "../../../../utilities/images"
const BellModal = () => {
    return (
        <>

            <div className='modalContent'>
                <div className='searchbar '> 
                    <input type='text' placeholder='Search Chef near you...' className='searchtext'
                    />
                    <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />
                  
                </div>
              <div className='modalscroll'>
              <div className='chatModal  '>
                    <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                    <div className='innermodal'>
                        <p className='chefName'>Sarah Bergstrom</p>
                        <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                        <p className='chatTime'>Just Now</p>
                        <span className='modalChatmsg'>2</span>
                    </div>
                    <div className='mt-3 me-3'>
                        <img src={Images.chatsDots} className='' alt='cartcancel' />
                    </div>

                </div>
                <div className='chatModal '>
                    <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                    <div className='innermodal'>
                        <p className='chefName'>Hilda Herzog </p>
                        <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                        <p className='chatTime'>Just Now</p>
                    </div>
                    <div className='mt-3  me-3'>
                        <img src={Images.chatsDots} className='' alt='cartcancel' />
                    </div>

                </div>
                <div className='chatModal '>
                    <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                    <div className='innermodal'>
                        <p className='chefName'>Tom Stoltenberg</p>
                        <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                        <p className='chatTime'>Just Now</p>
                        <span className='modalChatmsg'>2</span>
                    </div>
                    <div className='mt-3  me-3'>
                        <img src={Images.chatsDots} className='' alt='cartcancel' />
                    </div>

                </div>
                <div className='chatModal'>
                    <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                    <div className='innermodal'>
                        <p className='chefName'>Sheryl Lowez</p>
                        <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                        <p className='chatTime'>Just Now</p>
                    </div>
                    <div className='mt-3  me-3'>
                        <img src={Images.chatsDots} className='' alt='cartcancel' />
                    </div>

                </div>
                <div className='chatModal '>
                    <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                    <div className='innermodal'>
                        <p className='chefName'>Olive Kuvalis</p>
                        <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                        <p className='chatTime'>Just Now</p>
                    </div>
                    <div className='mt-3  me-3'>
                        <img src={Images.chatsDots} className='' alt='cartcancel' />
                    </div>

                </div>
                <div className='chatModal '>
                    <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                    <div className='innermodal'>
                        <p className='chefName'>Hilda Herzog </p>
                        <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                        <p className='chatTime'>Just Now</p>
                    </div>
                    <div className='mt-3  me-3'>
                        <img src={Images.chatsDots} className='' alt='cartcancel' />
                    </div>
                </div>
              </div>
            </div>



        </>
    )
}

export default BellModal