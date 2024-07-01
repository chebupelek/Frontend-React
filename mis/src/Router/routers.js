const base = "https://mis-api.kreosoft.space";
const routers = {
    login: `${base}/api/doctor/login`,
    registration: `${base}/api/doctor/register`,
    logout: `${base}/api/doctor/logout`,
    profile: `${base}/api/doctor/profile`,
    specialties: `${base}/api/dictionary/speciality`,
    patients: `${base}/api/patient`,
    mkb: `${base}/api/dictionary/icd10`,
    mkbRoots: `${base}/api/dictionary/icd10/roots`,
    inspection: `${base}/api/inspection`,
    consultation: `${base}/api/consultation`
};
export default routers;