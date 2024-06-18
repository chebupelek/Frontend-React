const base = "https://mis-api.kreosoft.space";
const routers = {
    login: `${base}/api/doctor/login`,
    registration: `${base}/api/doctor/register`,
    logout: `${base}/api/doctor/logout`,
    profile: `${base}/api/doctor/profile`,
    specialties: `${base}/api/dictionary/speciality`
};
export default routers;