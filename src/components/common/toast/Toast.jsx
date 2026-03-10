import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
Shows toast notifications on the screen.
You can show, style, and close toasts easily with these
*/

export const ToastMessage = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    );
};

export const triggerToast = (message, type, duration = 3) => {
    const toastId = toast(message, {
        type,
        style: {
            background: type === "error" ? "#B82D97"
                : type === "success" ? "#76ABFC"
                    : type === "info" ? "#8277b8"
                        : type === "warning" ? "#57B3D3"
                            : "#fff",
            color: "#fff",
            border: `1px solid ${type === "error" ? "#B82D97"
                : type === "success" ? "#76ABFC"
                    : type === "info" ? "#8277b8"
                        : type === "warning" ? "#57B3D3"
                            : "#000"}`
        }
    });

    setTimeout(() => {
        toast.dismiss(toastId);
    }, duration * 1000);
};

export const dismissToast = () => {
    toast.dismiss();
};

export default ToastMessage;
