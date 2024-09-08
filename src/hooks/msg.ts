import toast, { ToastOptions } from "react-hot-toast";

const globalOptions: ToastOptions = {
  duration: 4000,
  iconTheme: {
    primary: "#000",
    secondary: "#fff",
  },
  // Aria
  ariaProps: {
    role: "status",
    "aria-live": "polite",
  },
};

const msg = {
  info: (text: string, duration: number = 4000) => {
    toast(text, {
      icon: "ℹ️",
      ...globalOptions,
      duration: duration,
    });
  },
  success: (text: string, duration: number = 4000) => {
    toast.success(text, {
      ...globalOptions,
      duration: duration,
    });
  },
  error: (text: string, duration: number = 4000) => {
    toast.error(text, {
      ...globalOptions,
      duration: duration,
    });
  },
  warning: (text: string, duration: number = 4000) => {
    toast(text, {
      icon: "⚠️",
      ...globalOptions,
      duration: duration,
    });
  },
};

export default msg;
