import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
// import CustomModal from './CustomModal'
import CustomModal from '../../../components/common/shared/CustomModal';
import EditMenuModal from '../../../components/common/shared/editMenuModal';
import DeleteMenuModal from '../../../components/common/shared/DeleteMenuModal';
import AddmenuItemModal from '../../../components/common/shared/addmenuItemModal';

const Menu = () => {
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
      <div className='mainchef_'>
        <div className='menuPage'>
          <div className='container-fluid'>
            <div className='row align-items-center'>
              <div className='col-lg-12'>
                <div className='innerhomeheader'>
                  <p className='headerinnerheading'>List of Your Menu Items</p>
                  <div className='menuItems ' onClick={() => {
                    handleUserProfile("addMenuItemModal")
                  }}>
                    <i class="fas fa-plus plusmenuImg" ></i>
                    <p className='innermenuItem'>Add Menu Item</p>
                  </div>
                </div>
                <div className='profileDetail'>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                        <div className='Dotsheader_'>
                        <div class="dropdown ">
                          <button class="btn btn-secondary dropdown-toggle modalheaderDot_" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-ellipsis-v menuBtnIcon"></i>
                          </button>
                          <ul class="dropdown-menu menuItems_" aria-labelledby="dropdownMenuButton1 ">
                            <div className=' menuChat'>
                              <div className='flexBox pb-3 ' onClick={() => {
                                handleUserProfile("editMenuModal")
                              }}>
                                <img src={Images.EditImg} className=' img-fluid reporticon_' />
                                <p className='ps-2' >Edit</p>
                              </div>
                              <div className='flexBox' onClick={() => {
                                handleUserProfile("deleteMenuModal")
                              }} >
                                <img src={Images.cartDelete} className=' img-fluid reporticon_' />
                                <p className='reportchattxt_ m-0 ps-2'>Delete Chat</p>
                              </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                      </div>

                    
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='profileDetail'>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                </div>

              </div>
              <div className='col-lg-12'>
                <div className='profileDetail'>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                  <div className='listItems_'>
                    <div className='menu_Items'>
                      <div className='innerItems_'>
                        <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                        <img src={Images.menuItems} alt="logo" className="menuItem_" />
                      </div>
                      <i class="fas fa-ellipsis-v menuIcon_"></i>
                    </div>
                    <p className='itemIs_'>Chicken Salad</p>
                    <p className='category_'>Food Category</p>
                    <button className='itemsPrice_'>£22.00</button>
                  </div>
                </div>

              </div>
            </div>
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
        className={modalDetail.flag === "editMenuModal" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag === "editMenuModal" ? "editMenu" : "deleteMenuModal" ? "deleteMenu" : "addMenuItemModal" ? "addMenuItem" : ''}
        child={
          modalDetail.flag === "editMenuModal" ? (
            <EditMenuModal
              close={() => handleOnCloseModal()}

            />
          ) : modalDetail.flag === "deleteMenuModal" ? (
            <DeleteMenuModal
              close={() => handleOnCloseModal()}

            />
          ) : modalDetail.flag === "addMenuItemModal" ? (
            <AddmenuItemModal
              close={() => handleOnCloseModal()}

            />
          ) : ''

        }
        header=

        {modalDetail.flag === "editMenuModal" ?
          <>
            <div className='editadressheading'>
              <div className='edithead'>
                <p className="modal_Heading">
                Edit Item
                </p>
                <p className='chatUser'>Edit your menu items below.</p>
              </div>
            </div>
            <p onClick={handleOnCloseModal} className='modal_cancel'>
              <img src={Images.modalCancel} className='ModalCancel' />
            </p>
          </>
          :
          modalDetail.flag === "addMenuItemModal" ?
            <>
              <div className='editadressheading'>
                <div className='edithead'>
                  <p className="modal_Heading">
                    Add Menu Item
                  </p>
                  <p className='chatUser'>Add your menu items below.</p>
                </div>
              </div>
              <p onClick={handleOnCloseModal} className='modal_cancel'>
                <img src={Images.modalCancel} className='ModalCancel' />
              </p>
            </>
            : ''
        }
        onCloseModal={() => handleOnCloseModal()}
      />


    </>
  )
}

export default Menu