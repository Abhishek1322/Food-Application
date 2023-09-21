import React from 'react'

const chatnextModal = () => {
  return (
   <>
     <div className='modalContent'>
        <div className='modalDetail '>
          <div className='chatnext'>
            <div className='left_chatBox'>
              <p className='cheftext'>It is a long established fact that a reader will be distracted by the readable content of a page when looking layout.</p>
              <div className='chefchat_detail'>
              <img src={Images.homeProfile} alt="logo" className="chatnextImg" />
              <p className='chatUser m-0 ps-2 pe-3'>John Smith</p>
              <p className='chatTime_ m-0'>2:34 pm</p>

              </div>
            </div>
            <div className='right_chatBox'>
           <div className='chatinRight_'>
           <p className='cheftext'>It is a long established fact that a reader will be distracted by the readable content of a page when looking layout.</p>
           </div>
              <div className='chefchat_detail'>
              <p className='chatTime_ m-0 pe-3 '>2:36 pm</p>
              <p className='chatUser m-0 pe-2'>You</p>
              <img src={Images.homeProfile} alt="logo" className="chatnextImg" />
            
            

              </div>
             

            </div>
            <div className='chatSearchHere_'>
                <input className='chatSearchere_' type='text' placeholder='Type Something...' />
               <img src={Images.chatgalleryImg} alt="logo" className="gallerImg" />
                <img src={Images.chatSendImg} alt="logo" className="sendImg" />

              </div> 
          </div>




        </div>
      </div>

   
   
   </>
  )
}

export default chatnextModal