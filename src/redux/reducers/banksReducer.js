const initialState = {
     pending: false,
     banks: [],
     error: {},
};

export const banksReducer = (state = initialState, action) => {
     switch (action.type) {
          case 'BANK_REQUEST':
               return {
                    ...state,
                    error: null,
                    pending: true,
               };
          case 'BANK_FAILURE':
               return {
                    ...state,
                    pending: false,
                    error: action.payload,
               };
          case 'GET_BANKS_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    banks: action.payload.results,
               };
          case 'CREATE_BANK_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    banks: [action.payload].concat(state.banks),
               };
          case 'UPDATE_BANK_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    banks: state.banks
                         .filter(bank => bank.id !== action.payload.id)
                         .concat(action.payload),
               };
          case 'DELETE_BANK_SUCCESS':
               return {
                    pending: false,
                    error: null,
                    banks: state.banks.filter(
                         bank => bank.id !== action.payload
                    ),
               };
          default:
               return state;
     }
};
