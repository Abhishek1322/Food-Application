import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import Myorder from './myorderModal';

const ReportchatDropModal = () => {

  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
      show: false,
      title: "",
      flag: "",
  });

  //closeModal
  const handleOnCloseModal = () => {
      setModalDetail({
          show: false,
          title: "",
          flag: "",
      });
      setKey(Math.random());
  };

  const handleUserProfile = (flag) => {

      setModalDetail({
          show: true,
          flag: flag,
          type: flag,
      });
      setKey(Math.random());
  };

  return (
   <>
    <div className='modalContent'>
      <div className='reportchatdrop_'>
        <p className='reportText_'>Are you sure, you want to report
          Sarah Bergstrom?</p>
        <div className="input-container mt-5">
          <textarea type="" className="Reportborder-input " />
          <label className="border-label">Give a reason</label>
        </div>

        <div className='orderItems_ flexBox justify-content-between modalfooterbtn'>
              <button className='cancelOrder_' >Cancel</button>
              <button className='submitOrder_'  onClick={() => {
                        handleUserProfile("myReportOrder")
                    }}>Yes, Report</button>
            </div>

      </div>

    </div>
    <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "myReportOrder" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "myReportOrder" ? "myorderReport":''}
                child={
                    modalDetail.flag === "myReportOrder" ? (
                        <Myorder
                            close={() => handleOnCloseModal()}
                            
                        />
                    ) :
                            ""
                }
                header=

                {modalDetail.flag === "myReportOrder" ?
                    <>
                        <h2 className="modal_Heading">
                        My Orders
                        </h2>
                        <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p>
                    </>
                    :
                        ''
                }
                onCloseModal={() => handleOnCloseModal()}
            />
   </>
    
    
    
  )
}

export default ReportchatDropModal