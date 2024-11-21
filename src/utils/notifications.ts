import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  warning: (message: string) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

export const showAlert = {
  success: (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  },
  error: (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#d33",
    });
  },
  confirm: (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  },
};
