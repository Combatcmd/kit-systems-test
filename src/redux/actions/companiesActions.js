export const request = () => {
     return {
          type: 'COMPANY_REQUEST',
     };
};

export const failure = payload => {
     return {
          type: 'COMPANY_FAILURE',
          payload,
     };
};

export const getCompaniesSuccess = payload => {
     return {
          type: 'GET_COMPANIES_SUCCESS',
          payload,
     };
};

export const getCompanySuccess = payload => {
     return {
          type: 'GET_COMPANY_SUCCESS',
          payload,
     };
};

export const createCompanySuccess = payload => {
     return {
          type: 'CREATE_COMPANY_SUCCESS',
          payload,
     };
};

export const updateCompanySuccess = payload => {
     return {
          type: 'UPDATE_COMPANY_SUCCESS',
          payload,
     };
};

export const deleteCompanySuccess = payload => {
     return {
          type: 'DELETE_COMPANY_SUCCESS',
          payload,
     };
};
