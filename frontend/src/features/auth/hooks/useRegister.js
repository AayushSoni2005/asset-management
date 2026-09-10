import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../services/authService";

export default function useRegister() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.register,

//         onSuccess: () => {
//     toast.success(
//         "Registration successful. Please check your email to verify your account."
//     );

//     navigate("/login", {
//         replace: true,
//     });
// },

//         onError: (error) => {
//             const message =
//                 error.response?.data?.message ??
//                 "Registration failed.";

//             toast.error(message);
//         },
        onSuccess: (response) => {
    console.log("SUCCESS", response);

    toast.success(
        "Registration successful. Please check your email to verify your account."
    );

    navigate("/login", { replace: true });
},

onError: (error) => {
    console.log("STATUS:", error.response?.status);
    console.log("BODY:", error.response?.data);

    toast.error(
        error.response?.data?.message ??
        "Registration failed."
    );
},
    });
}