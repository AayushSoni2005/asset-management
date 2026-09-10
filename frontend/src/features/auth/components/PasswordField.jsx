import { useState } from "react";

import {
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordField({
    error,
    helperText,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            type={showPassword ? "text" : "password"}
            error={error}
            helperText={helperText}
            {...props}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}