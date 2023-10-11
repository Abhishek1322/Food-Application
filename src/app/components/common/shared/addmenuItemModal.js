import React, { useEffect, useState, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import AfterUploadImage from "./afterUploadImage";
import {
  createMenu,
  createImageUrl,
  onErrorStopLoad,
} from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddmenuItemModal = (props) => {

  const {close,menuListAll} = props;

  const [key, setKey] = useState(Math.random());
  const dispatch = useDispatch();
  const [category, setCategory] = useState("veg");
  const [itemImage, setItemImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    deliveryTime: "",
    description: "",
  });
  console.log("formDataformData", formData);
  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad);
  }, [dispatch]);

  // create new menu
  const handleCreateMenu = () => {
    let params = {
      name:formData.itemName,
      category:category,
      price:formData.price,
      deliveryTime:formData.deliveryTime,
      description:formData.description,
      image:imageUrl
    }
    dispatch(createMenu({
      ...params,
      cb(res){
        if(res.status === 200){
          close()
          menuListAll();
        }
      }
    }))
  };

  // getting item image
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (
        rejectedFiles.length > 0 &&
        rejectedFiles[0]?.file?.type !== "image/jpeg" &&
        "image/jpg" &&
        "image/png" &&
        "image/svg"
      ) {
        toast.error("Please upload valid image");
        return;
      }
      setItemImage(acceptedFiles[0]);
    },
    [itemImage]
  );

  // accepted types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/svg": [],
    },
    multiple: false,
  });

  // get image url
  useEffect(() => {
    if (itemImage) {
      let params = {
        file: itemImage,
      };
      dispatch(
        createImageUrl({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setImageUrl(res.data.data.photo);
            }
          },
        })
      );
    }
  }, [itemImage]);

  // remove upload image
  const handleRemoveImage = (url) => {
    if (url === imageUrl) {
      setImageUrl("");
    }
  };

  return (
    <>
      <div className="modalscroll">
        <div className="addmenuItemModal">
          <div className="input-container mt-5">
            <input
              type="text"
              className=" menuReport_button"
              placeholder="e.g. Chicken Salad"
              name="itemName"
              onChange={(e) => handleChange(e)}
            />
            <img src={Images.categoryImg} className="cateofyImg_" />
            <label className="border-label">Item Name</label>
          </div>
          <div className="input-container mt-4">
            <Select
              className="menuReport_button"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"veg"}>Veg</MenuItem>
              <MenuItem value={"non-veg"}>Non Veg</MenuItem>
            </Select>

            <img src={Images.menuDishImg} className="cateofyImg_" />
            <label className="border-label">Category</label>
          </div>
          <div className="flexBox justify-content-between editMenuFields_ ">
            <div className="input-container mt-5">
              <input
                type="number"
                name="price"
                onChange={(e) => handleChange(e)}
                className="menuEditbuttom"
                placeholder="e.g. 22.00"
              />
              <img src={Images.euroImg} className="cateofyImg_" />
              <label className="border-label">Price</label>
            </div>
            <div className="input-container mt-5 pe-3 flexBox">
              <input
                type="number"
                className="menuEditbuttom"
                name="deliveryTime"
                onChange={(e) => handleChange(e)}
                placeholder="e.g. 45"
              />
              <p className="inneredittxt">MIN</p>
              <img src={Images.clockImg} className="cateofyImg_" />
              <label className="border-label">Delivery Time</label>
            </div>
          </div>
        </div>
        <div className="input-container mt-4">
          <textarea
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
            className=" menuReport_button  menuDescrition_  "
            placeholder="Type here..."
          />
          <label className="border-label">Description</label>
        </div>
        <div className="editImgBox_">
          <p className="chefName mt-4 pb-3">Upload Image </p>
          {imageUrl ? (
            <>
              <img src={imageUrl} className="editFoodImg" />
              <span className="cancelEditImg">
                <i
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="fas fa-times cancelEdit"
                ></i>
              </span>
            </>
          ) : (
            <div className="uploadImgebox choosetoUpload">
              <div className="postAd_upload_icon">
                <div {...getRootProps()} className="inputfile-box active">
                  <input {...getInputProps()} />
                  <label for="file">
                    <span id="file-name" className="file-box d-none">
                      No File Chosen
                    </span>
                    <div className="file-button text-end">
                      <img
                        src={Images.Uploadicon}
                        alt="Uploadicon"
                        className="Uploadicon uploadIconImg"
                      />
                      <p className="uploadbtnn">Choose Image</p>
                      <p className="smallHeading_">Upload Image Here</p>
                      <p className="uploadText mt-1">5 mb max file size</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="foodmodalbtn  modalfooterbtn"
        onClick={() => {
          handleCreateMenu();
        }}
      >
        Add
      </button>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "afterimgUploadModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={modalDetail.flag === "afterimgUploadModal" ? "readyWithOrder" : ""}
        child={
          modalDetail.flag === "afterimgUploadModal" ? (
            <AfterUploadImage close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "afterimgUploadModal" ? (
            <>
              <div className="editadressheading">
                <div className="edithead">
                  <p className="modal_Heading">Add Menu Item</p>
                  <p className="chatUser">Add your menu items below.</p>
                </div>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" />
              </p>
              {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default AddmenuItemModal;
