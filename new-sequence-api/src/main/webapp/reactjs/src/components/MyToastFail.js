import React from "react";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";

export const MyToastFail = () => {
  const toastCss = {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return (
    <div style={toastCss}>
      <Toast className={"border border-danger bg-danger text-black"}>
        <ToastHeader className={"bg-danger text-black"}>
          <strong className="mr-auto">Error</strong>
        </ToastHeader>
        <ToastBody>
          <strong>Email Is Already Taken!</strong>
        </ToastBody>
      </Toast>
    </div>
  );
};
