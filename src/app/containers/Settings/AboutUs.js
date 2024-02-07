import React, { useState, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHelperPages, onErrorStopLoad } from "../../../redux/slices/user";
import { FadeLoader } from "react-spinners";

const AboutUs = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [loader, setLoader] = useState(false);

  //get privacy policy content
  useEffect(() => {
    setLoader(true);
    let params = {
      slug: "about_us",
    };
    dispatch(
      getHelperPages({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setLoader(false);
            setContent(res.data.data);
          }
        },
      })
    );
  }, []);

  //stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="main-div">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
                <Link to={!authToken ? "/" : "/setting"}>
                  <img
                    src={Images.backArrowpassword}
                    alt="arrowImg"
                    className="img-fluid  innerHeaderArrow"
                  />
                </Link>
                <h1 className="settingMainHeading text-align-center ">
                  {content?.title}
                </h1>
              </div>
              <div className="termAndCond">
                {!content.active ? (
                  <div className="inactive-content">
                    {loader ? (
                      <FadeLoader
                        color={"#E65C00"}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"/>
                    ) : (
                      <p>Admin Make This Content Is In-Active</p>
                    )}
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: content.content }}
                    className="termcondDummy"
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
