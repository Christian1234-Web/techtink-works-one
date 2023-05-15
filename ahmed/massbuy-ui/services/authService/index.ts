/* eslint-disable no-unused-vars */
import axios from "../axiosConfig"; 

export function useLoginCallback() {
  const handleLogin = async (credentials: any): Promise<any> => {    
    try{ 
        const response = await axios.post('login', credentials,
        {
          headers: {'Content-Type':'application/json'}, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleLogin }
} 

export function useRegisterCallback() {
  const handleRegister = async (credentials: any): Promise<any> => {    
    try{ 
        const response = await axios.post('register', credentials,
        {
          headers: {'Content-Type':'application/json'}, 
        }); 
        return response       
    } catch(err: any) { 
      return err?.response    
    }     
  }
  return { handleRegister }
} 

export const getUser = async () => {
  let request = axios.get(`user/my-profile`);

  return request.then((response) => {
    if (response.status === 200) {
      return response.data && response.data;
    }
  });
};

export const updateUser = async (details: any) => {
  let request = await axios.put("/user/update", details);
  console.log("request", request);
  return request;
  // return request.then((response) => {
  //   console.log("response", response);
  //   // if (response.status === 200) {
  //     return response && response;
  //   // }
  // });
};

export const deleteResume = async (resumeId: any) => {
  let request = axios.get(`user/resume/${resumeId}`);

  return request.then((response) => {
    if (response.status === 200) {
      return response.data && response.data;
    }
  });
};

export const updatePassword = async (values: any) => {
  let request = axios.post("user/update-password", values);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const confirmToken = async (token: any) => {
  let request = axios.get(`signup/confirmation/?token=${token}`);

  return request.then((response) => {
    if (response.status === 200) {
      return response.data && response.data;
    }
  });
};

export const recoverPassword = async (email: any) => {
  let request = axios.put("forgotPassword", email);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const confirmResetCode = async (code: any) => {
  let data = {
    resetCode: code,
  };
  let request = axios.post("auth/confirm-reset-password-code", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const resetPassword = async (values: any) => {
  let request = axios.post("updatePassword/{userId}", values);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
