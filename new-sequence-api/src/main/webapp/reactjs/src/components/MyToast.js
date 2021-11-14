import React from "react";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";

export const MyToast = () => {
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
      <Toast className={"border border-success bg-success text-white"}>
        <ToastHeader className={"bg-success text-white"}>
          <strong className="mr-auto">Success</strong>
        </ToastHeader>
        <ToastBody>User Registered Successfully</ToastBody>
      </Toast>
    </div>
  );
};
