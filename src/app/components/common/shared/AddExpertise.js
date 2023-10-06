import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { toast } from "react-toastify";

const AddExpertise = (props) => {
  
  const { setExperticeValue, close, experticeValue } = props;
  const emailRef = useRef(null);
  const [expertice, setExpertice] = useState([""]);
  const [newInputIndex, setNewInputIndex] = useState(null);

  // add new input
  const handleAddInput = (e) => {
    e.preventDefault();
    const checkEmptyInput = expertice[expertice.length - 1] === "";
    if (checkEmptyInput) {
      toast.dismiss();
      toast.error("Please fill current field");
      return;
    }
    setExpertice([...expertice, ""]);
    setNewInputIndex(expertice.length);
  };

  // Remove input field
  const handleRemoveInput = (index) => {
    const newValues = [...expertice];
    newValues.splice(index, 1);
    setExpertice(newValues);
  };

  // get values of input field
  const handleChangeInput = (index, value) => {
    const newValues = [...expertice];
    newValues[index] = value;
    setExpertice(newValues);
  };

  // Focus on added new input field
  useEffect(() => {
    if (
      newInputIndex !== null &&
      emailRef.current &&
      newInputIndex === expertice.length - 1
    ) {
      emailRef.current.focus();
      setNewInputIndex(null); // Reset the new input index
    }
  }, [expertice, newInputIndex]);

  // submit expertice values
  const handleSubmitExpertice = () => {
    setExperticeValue(expertice);
    close();
  };

  useEffect(() => {
    if (experticeValue && experticeValue.length > 0) {
      const updateExperticeValues = experticeValue.filter((value) => {
        return value !== "";
      });
      setExpertice((prevExpertice) => [
        ...prevExpertice.filter((value) => value !== ""),
        ...updateExperticeValues,
      ]);
    }
  }, [experticeValue]);

  return (
    <>
      <form onSubmit={(e) => handleAddInput(e)}>
        <div className="text-end mt-4">
          <button type="submit" className="addMore d-inline-block">
            <i className="las la-plus"></i>Add More
          </button>
        </div>

        <div className="modalscroll">
          {expertice.map((value, index) => (
            <>
              <div className="input-container  mt-3">
                <input
                  ref={index === expertice.length - 1 ? emailRef : null}
                  onChange={(e) => handleChangeInput(index, e.target.value)}
                  type="text"
                  className="border-input"
                  placeholder="Experty"
                  value={value}
                />

                {expertice && expertice.length > 1 && (
                  <img
                    onClick={() => handleRemoveInput(index)}
                    src={Images.DeleteIcon}
                    alt="InfoIcon"
                    className="InputIcon"
                  />
                )}
              </div>
            </>
          ))}
        </div>
      </form>
      <div className="buttomBtn text-center">
        <button onClick={handleSubmitExpertice} className="smallBtn w-100">
          Done
        </button>
      </div>
    </>
  );
};

export default AddExpertise;
