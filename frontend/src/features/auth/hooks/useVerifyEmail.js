import { useMutation } from "@tanstack/react-query";
import authService from "../services/authService";

export default function useVerifyEmail() {
    return useMutation({
        mutationFn: ({ token, email }) =>
            authService.verifyEmail({ token, email }),
    });
}