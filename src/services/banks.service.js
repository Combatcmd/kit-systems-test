import API from '../config';
import {
     request,
     failure,
     getBanksSuccess,
     createBankSuccess,
     updateBankSuccess,
     deleteBankSuccess,
} from '../redux/actions/banks.actions';

const getBanks = companyId => {
     return dispatch => {
          dispatch(request());
          API.get(`companies/${companyId}/bank_details/`)
               .then(bank => dispatch(getBanksSuccess(bank.data)))
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

const createBank = (companyId, data) => {
     return dispatch => {
          dispatch(request());
          API.post(`companies/${companyId}/bank_details/`, data)
               .then(bank => dispatch(createBankSuccess(bank.data)))
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

const updateBank = (companyId, data) => {
     return dispatch => {
          dispatch(request());
          API.put(`companies/${companyId}/bank_details/${data.id}/`, data)
               .then(bank => dispatch(updateBankSuccess(bank.data)))
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

const deleteBank = (companyId, bankId) => {
     return dispatch => {
          dispatch(request());
          API.delete(`companies/${companyId}/bank_details/${bankId}/`)
               .then(() => dispatch(deleteBankSuccess(bankId)))
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

export const banksService = {
     getBanks,
     createBank,
     updateBank,
     deleteBank,
};
