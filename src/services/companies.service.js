import API from '../config';
import {
     request,
     failure,
     getCompaniesSuccess,
     getCompanySuccess,
     createCompanySuccess,
     updateCompanySuccess,
     deleteCompanySuccess,
} from '../redux/actions/companiesActions';

const getCompanies = () => {
     return dispatch => {
          dispatch(request());
          API.get('companies/')
               .then(companies => dispatch(getCompaniesSuccess(companies.data)))
               .catch(error =>
                    dispatch(
                         failure(
                              error.response.data
                                   ? error.response.data
                                   : error.response.statusText
                         )
                    )
               );
     };
};

const getCompany = companyId => {
     return dispatch => {
          dispatch(request());
          API.get(`companies/${companyId}/`)
               .then(company => dispatch(getCompanySuccess(company.data)))
               .catch(error =>
                    dispatch(
                         failure(
                              error.response.data
                                   ? error.response.data
                                   : error.response.statusText
                         )
                    )
               );
     };
};

const createCompany = data => {
     return dispatch => {
          dispatch(request());
          API.post('companies/', data)
               .then(company => dispatch(createCompanySuccess(company.data)))
               .catch(error =>
                    dispatch(
                         failure(
                              error.response.data
                                   ? error.response.data
                                   : error.response.statusText
                         )
                    )
               );
     };
};

const updateCompany = (companyId, data) => {
     return dispatch => {
          dispatch(request());
          API.put(`companies/${companyId}/`, data)
               .then(company => dispatch(updateCompanySuccess(company.data)))
               .catch(error =>
                    dispatch(
                         failure(
                              error.response.data
                                   ? error.response.data
                                   : error.response.statusText
                         )
                    )
               );
     };
};

const deleteCompany = companyId => {
     return dispatch => {
          dispatch(request());
          API.delete(`companies/${companyId}/`)
               .then(() => dispatch(deleteCompanySuccess(companyId)))
               .catch(error =>
                    dispatch(
                         failure(
                              error.response.data
                                   ? error.response.data
                                   : error.response.statusText
                         )
                    )
               );
     };
};

export const companiesService = {
     getCompanies,
     getCompany,
     createCompany,
     updateCompany,
     deleteCompany,
};
