const axios = require("axios");
const config = require("../config");
const fs = require("fs");

const axiosInstance = axios.create({
    baseURL: "https://api.zoom.us/v2",
});

async function refreshAuth() {
    try {
        console.log(`====== Get access token`);
        const response = await axios.post(
            "https://zoom.us/oauth/token",
            {
                grant_type: "account_credentials",
                account_id: config.accountId,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(
                        config.clientId + ":" + config.clientSecret
                    )}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error when refresh auth get access token!");
    }
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        throw error
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.error(`====== ${error.response.data.message}`);
            originalRequest._retry = true;
            try {
                const auth = await refreshAuth();
                saveAuth(auth);
                originalRequest.headers.Authorization = `Bearer ${auth.access_token}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                throw error
            }
        }
        throw error
    }
);

const getAccessToken = () => {
    try {
        const authString = fs.readFileSync(config.authFile, "utf8");
        const auth = JSON.parse(authString);
        return auth.access_token;
    } catch (error) {
        console.error(`====== Error read file: ${config.authFile}`);
    }
};

const saveAuth = (data) => {
    try {
        fs.writeFileSync(config.authFile, JSON.stringify(data));
    } catch (error) {
        console.error("====== Error save file: ", config.authFile);
    }
};

module.exports = axiosInstance;
