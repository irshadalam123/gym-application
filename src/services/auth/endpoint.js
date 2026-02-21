import methods from "../../store/method";
    
const url = {
    login: {
        endpoint: `auth/login`,
        method: methods.POST,
    },
    register: {
        endpoint: `auth/register`,
        method: methods.POST,
    },
}

export default url;