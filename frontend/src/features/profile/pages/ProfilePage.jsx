import {
    Alert,
    Paper,
    Stack,
    Typography,
    Divider,
} from "@mui/material";

import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import ProfileForm from "../components/ProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useChangePassword } from "../hooks/useChangePassword";

export default function ProfilePage() {
    const {
        data: response,
        isLoading,
        error,
        refetch,
    } = useProfile();

    const updateProfileMutation = useUpdateProfile();
    const changePasswordMutation = useChangePassword();

    if (isLoading) {
        return <LoadingState fullPage />;
    }

    if (error) {
        return (
            <ErrorState
                fullPage
                title="Unable to load profile"
                message={error.message}
                onRetry={refetch}
            />
        );
    }

    const profile = response?.data;

    return (
        <Stack spacing={3}>
            <PageHeader
                title="My Profile"
                subtitle="Manage your personal information and account security."
            />

            {!profile?.hasEmployeeProfile && (
                <Alert severity="info">
                    {profile?.profileMessage ??
                        "No employee profile is associated with this account. Please contact an administrator."}
                </Alert>
            )}

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Profile Information
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 3 }}
                >
                    Update your personal and contact information.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <ProfileForm
                    defaultValues={profile}
                    loading={updateProfileMutation.isPending}
                    onSubmit={updateProfileMutation.mutate}
                />
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Security
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 3 }}
                >
                    Change your password regularly to help protect your account.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <ChangePasswordForm
                    loading={changePasswordMutation.isPending}
                    onSubmit={changePasswordMutation.mutate}
                />
            </Paper>
        </Stack>
    );
}