const initialState = {
     pending: true,
     companies: [],
     company: null,
     error: null,
     success: false,
};

export const companiesReducer = (state = initialState, action) => {
     switch (action.type) {
          case 'COMPANY_REQUEST':
               return {
                    ...state,
                    error: null,
                    pending: true,
               };
          case 'COMPANY_FAILURE':
               return {
                    ...state,
                    pending: false,
                    error: action.payload,
               };
          case 'GET_COMPANIES_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    companies: action.payload.results,
               };
          case 'GET_COMPANY_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    company: action.payload,
               };
          case 'CREATE_COMPANY_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    success: true,
                    companies: [action.payload].concat(state.companies),
               };
          case 'UPDATE_COMPANY_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    company: action.payload,
               };
          case 'DELETE_COMPANY_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    companies: state.companies.filter(
                         company => company.id !== action.payload
                    ),
               };
          default:
               return state;
     }
};
