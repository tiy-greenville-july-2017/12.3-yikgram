
// If you're running on a device or in the Android simulator be sure to change
let API_URL = 'http://localhost:8000/';
if (process.env.NODE_ENV === 'production') {
  API_URL = ''; // your production server url
}

export const settings = {
  env: process.env.NODE_ENV,
  API_URL,
};

export default settings;
