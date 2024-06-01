import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5500',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

//list of all the end points

export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);


//axios interceptors 
// haar ek req and res ko check krne ke liye response 401 to refresh krwana hai token
// api.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (
//             error.response.status === 401 &&
//             originalRequest &&
//             !originalRequest._isRetry
//         ) {
//             originalRequest._isRetry = true;
//             try {
//                 await axios.get(
//                     `${process.env.REACT_APP_API_URL}/api/refresh`,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 return api.request(originalRequest);
//             } catch (err) {
//                 console.log(err.message);
//             }
//         }
//         throw error;
//     }
// );


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an unauthorized response
        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                // Attempt to refresh the token
                await axios.get('http://localhost:5500/api/refresh', {
                    withCredentials: true,
                });

                // Retry the original request with the new token
                return api.request(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh error:', refreshError);
            }
        }

        // Log the original error for debugging purposes
        console.error('API request error:', error);

        // Reject the promise to propagate the error
        return Promise.reject(error);
    }
);

export default api;