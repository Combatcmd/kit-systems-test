export const request = payload => {
     return {
          type: 'LOGIN_REQUEST',
          payload,
     };
};

export const success = payload => {
     return {
          type: 'LOGIN_SUCCESS',
          payload,
     };
};

export const failure = payload => {
     return {
          type: 'LOGIN_FAILURE',
          payload,
     };
};

export const logout = () => {
     return {
          type: 'LOGOUT',
     };
};
