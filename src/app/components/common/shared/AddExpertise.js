import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getExpertise } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";

const AddExpertise = (props) => {
  const { setExperticeValue, close, experticeValue } = props;
  const toastId = useRef(null);
  const dispatch = useDispatch();
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
    setExperticeValue(getTitles);
    close();
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
            const alphOrder = res?.data?.data?.data?.sort((a, b) => 
              a.title.localeCompare(b.title)
            );
            setExperticeList(alphOrder);
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

  return (
    <>
      <div className="select-expertise-outer">
        <p className="label-select-expertise">Select Expertise</p>
        <div className="recipe-lists">
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
              <TextField
                {...params}
                placeholder={!expertice?.length > 0 && "Search and Select"}
              />
            )}
          />
        </div>
      </div>
      <div className="buttomBtn text-center modalfooterbtn">
        <button onClick={handleSubmitExpertice} className="smallBtn w-100">
          Done
        </button>
      </div>
    </>
  );
};

export default AddExpertise;
