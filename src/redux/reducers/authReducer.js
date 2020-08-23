import jwt_decode from 'jwt-decode';

const isValidToken = token => {
     let decoded = jwt_decode(token);
     return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

const initialState = {
     isLogginIn: false,
     isLoggedIn: false,
     token: {},
     user: {
          email: '',
     },
     error: {
          detail: '',
     },
};

export const authReducer = (state = initialState, action) => {
     switch (action.type) {
          case 'LOGIN_REQUEST':
               return {
                    isLogginIn: true,
                    user: { email: action.payload.email },
               };
          case 'LOGIN_SUCCESS':
               const token = action.payload.access;
               return {
                    isLoggedIn: true,
                    token: {
                         access: action.payload.access,
                         refresh: action.payload.refresh,
                    },
                    user: Object.assign(state.user, isValidToken(token)),
               };
          case 'LOGIN_FAILURE':
               return {
                    error: action.payload,
               };
          case 'LOGOUT':
               return {
                    isLoggedIn: false,
                    token: {},
                    user: {},
               };
          default:
               return state;
     }
};
