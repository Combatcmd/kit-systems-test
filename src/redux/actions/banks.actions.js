export const request = () => {
     return {
          type: 'BANK_REQUEST',
     };
};

export const failure = payload => {
     return {
          type: 'BANK_FAILURE',
          payload,
     };
};

export const getBanksSuccess = payload => {
     return {
          type: 'GET_BANKS_SUCCESS',
          payload,
     };
};

export const createBankSuccess = payload => {
     return {
          type: 'CREATE_BANK_SUCCESS',
          payload,
     };
};

export const updateBankSuccess = payload => {
     return {
          type: 'UPDATE_BANK_SUCCESS',
          payload,
     };
};

export const deleteBankSuccess = payload => {
     return {
          type: 'DELETE_BANK_SUCCESS',
          payload,
     };
};
