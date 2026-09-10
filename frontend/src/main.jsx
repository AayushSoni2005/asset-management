import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/inter";

import App from "./App";
import AppProviders from "./app/AppProviders";
import AuthInitializer from "./features/auth/components/AuthInitializer";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProviders>
            <AuthInitializer>
                <App />
            </AuthInitializer>
        </AppProviders>
    </React.StrictMode>
);