import * as AuthApi from '../../redux/api/AuthRequests';

export const login = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.login(formData);
      dispatch({ type: "AUTH_SUCCESS", data: data });
      navigate("../home", { replace: true });
    } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_FAIL" });
    }
  };


export const signup = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.signup(formData);
      dispatch({ type: "AUTH_SUCCESS", data: data });
      navigate("../home", { replace: true });
    } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_FAIL" });
    }
  };

  
export const logout = ()=> async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
}