import React from "react";
import * as Images from "../../../../utilities/images";
import moment from "moment";

const AvailableModal = (props) => {
  const { chefData } = props;
  return (
    <>
      <div className="modalContent">
        {chefData?.chefInfo?.availability?.map((item, index) => (
          <div key={index} className="availabledays mb-3">
            <p className="notificationText text-capitalize">{item?.day}</p>
            <div className="daytimes">
              <img
                src={Images.ClockIcon}
                alt="clockimage"
                className="img-fluid"
              />
              <p className="daytimesheading">
                {moment(item?.timeSlots?.from, "h:mm A").format("h:mm A")} -{" "}
                {moment(item?.timeSlots?.to, "h:mm A").format("h:mm A")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AvailableModal;
