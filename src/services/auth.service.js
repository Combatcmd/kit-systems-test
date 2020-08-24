import API from '../config';
import {
     request,
     success,
     failure,
     logout,
} from '../redux/actions/authActions';

const signin = credentials => {
     return dispatch => {
          dispatch(request(credentials));
          API.post('token/', credentials)
               .then(user => {
                    user && dispatch(success(user.data));
                    window.location = '/'
               })
               .catch(error => dispatch(failure(error.response.data)));
     };
};

const signout = () => {
     return dispatch => {
          dispatch(logout());
     };
};

export const authService = {
     signin,
     signout,
};
