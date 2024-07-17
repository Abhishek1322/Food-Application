import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { PDF_WORKER_URL } from "../../../../config/config";

const ChefDocModal = ({ chefData }) => {
  return (
    <>
      <div className="chef-document-module">
        <div className="chef-document-inner">
          {chefData?.chefInfo?.verificationDocument?.mimeType ===
          "application/pdf" ? (
            <Worker workerUrl={PDF_WORKER_URL}>
              <Viewer fileUrl={chefData?.chefInfo?.verificationDocument?.url} />
            </Worker>
          ) : (
            <img
              alt="chef-document"
              className="chef-document-container"
              src={chefData?.chefInfo?.verificationDocument?.url}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChefDocModal;
