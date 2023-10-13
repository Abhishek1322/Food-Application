import React from 'react'
import * as Images from "../../../../utilities/images"

const ChatnextModal = () => {
  return (
    <>
      <div className='modalContent'>
        <div className='modalDetail '>
          <div className='chatnext'>
            <div className='left_chatBox'>
              <p className='innerchat_'>It is a long established fact that a reader will be distracted by the readable content of a page when looking layout.</p>
              <div className='chefchat_detail'>
                <img src={Images.homeProfile} alt="profile" className="chatnextImg" />
                <p className='chatUser m-0 ps-1 pe-2'>John Smith</p>
                <p className='chatTime_ m-0'>2:34 pm</p>
              </div>
            </div>
            <div className='right_chatBox'>
              <div className='chatinRight_'>
                <p className='chat_Text'>It is a long established fact that a reader will be distracted by the readable content of a page when looking layout.</p>
              </div>
              <div className='chefchat_detail'>
                <p className='chatTime_ m-0 pe-2 '>2:36 pm</p>
                <p className='chatUser m-0 pe-1'>You</p>
                <img src={Images.homeProfile} alt="profile" className="chatnextImg" />
              </div>
            </div>
            <div className='chatSearchHere_'>
              <input className='chatSearchere_' type='search' placeholder='Type Something...' />
              <img src={Images.chatgalleryImg} alt="chatGallerImg" className="gallerImg infoimg " />

              <div className='sarahinformation'>
                <p className='chatSearchere_ '>Your only able to send photos from gallery</p>
              </div>
              <img src={Images.chatSendImg} alt="chatsendImg" className="sendImg" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatnextModal