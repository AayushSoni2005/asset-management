const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
    throw new Error(
        "Missing environment variable: VITE_API_BASE_URL"
    );
}

export default Object.freeze({
    apiBaseUrl,
});