import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { companiesService } from '../../services/companies.service';

const Alert = props => {
     return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CompaniesList = () => {
     const dispatch = useDispatch();
     const state = useSelector(store => store.companiesReducer);
     const [toast, setToast] = React.useState(true);

     React.useEffect(() => {
          getCompanies();
          // eslint-disable-next-line
     }, []);

     const getCompanies = () => {
          dispatch(companiesService.getCompanies());
     };

     const deleteCompany = companyId => {
          setToast(true);
          dispatch(companiesService.deleteCompany(companyId));
     };

     const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
               return;
          }

          setToast(false);
     };
     return (
          <>
               {state.error ? (
                    <Snackbar
                         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                         open={toast}
                         autoHideDuration={6000}
                         onClose={handleClose}
                    >
                         <Alert onClose={handleClose} severity="error">
                              {state.error}
                         </Alert>
                    </Snackbar>
               ) : (
                    <></>
               )}
               <MaterialTable
                    title=""
                    columns={[
                         { title: 'Наименование компании', field: 'name' },
                         { title: 'Тип юр.лица', field: 'registered_type' },
                         { title: 'Регион', field: 'region' },
                         {
                              title: 'Город',
                              field: 'city',
                         },
                    ]}
                    data={state.companies}
                    options={{
                         filtering: true,
                         actionsColumnIndex: -1,
                         pageSize: 10,
                         search: false,
                    }}
                    actions={[
                         {
                              icon: 'refresh',
                              tooltip: 'Refresh Data',
                              isFreeAction: true,
                              onClick: () => {
                                   getCompanies();
                              },
                         },
                         {
                              icon: 'edit',
                              tooltip: 'Редактировать информацию о компании',
                              onClick: (event, rowData) =>
                                   (window.location = `/company/${rowData.id}`),
                         },
                         rowData => ({
                              icon: 'delete',
                              tooltip: 'Удалить компанию',
                              onClick: (event, rowData) =>
                                   deleteCompany(rowData.id),
                         }),
                    ]}
               />
          </>
     );
};
export default CompaniesList;
