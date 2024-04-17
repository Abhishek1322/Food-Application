import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getExpertise } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import {
  updateChefProfile,
  onErrorStopLoad,
} from "../../../../redux/slices/web";
import { useWebSelector } from "../../../../redux/selector/web";

const AddExpertiseModal = ({ close, experticeValue, chefProfileDetails }) => {
  const toastId = useRef(null);
  const dispatch = useDispatch();
  const webSelector = useWebSelector();
  const { loading } = webSelector;
  const [expertice, setExpertice] = useState([]);
  const [experticeList, setExperticeList] = useState([]);

  const icon = <RadioButtonUncheckedIcon fontSize="small" />;
  const checkedIcon = (
    <CheckCircleIcon style={{ color: "#E65C00" }} fontSize="small" />
  );

  // submit expertice values
  const handleSubmitExpertice = () => {
    if (!expertice?.length) {
      showToast("Please select at least one expertise");
      return;
    }
    const getTitles = expertice?.map((value) => value.title);

    let params = {
      step: "2",
      expertise: getTitles,
    };
    dispatch(
      updateChefProfile({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
            chefProfileDetails();
          }
        },
      })
    );
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // get expertice values
  useEffect(() => {
    dispatch(
      getExpertise({
        cb(res) {
          if (res?.status === 200) {
            const findRestValue = res?.data?.data?.data?.filter((value) =>
              experticeValue.includes(value.title)
            );
            setExperticeList(res?.data?.data?.data);
            setExpertice(findRestValue);
          }
        },
      })
    );
  }, []);

  // get value of expertice
  const handleAutocompleteChange = (event, values) => {
    setExpertice(values);
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="select-expertise-outer">
        <p className="label-select-expertise">Select Expertise</p>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={experticeList}
          disableCloseOnSelect
          value={expertice}
          onChange={handleAutocompleteChange}
          getOptionLabel={(option) => option?.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search and Select" />
          )}
        />
      </div>
      <div className="buttomBtn text-center modalfooterbtn">
        <button onClick={handleSubmitExpertice} className="smallBtn w-100">
          Done
          {loading && (
            <span className="spinner-border spinner-border-sm ms-2"></span>
          )}
        </button>
      </div>
    </>
  );
};

export default AddExpertiseModal;
