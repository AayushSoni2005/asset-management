import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import queryClient from "./queryClient";
import theme from "../theme";

export default function AppProviders({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <QueryClientProvider client={queryClient}>
                {children}

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                    }}
                />
            </QueryClientProvider>
        </ThemeProvider>
    );
}