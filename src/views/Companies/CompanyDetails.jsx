import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
     Paper,
     Tabs,
     Tab,
     Typography,
     Grid,
     TextField,
     Switch,
     Button,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import { companiesService } from '../../services/companies.service';
import { banksService } from '../../services/banks.service';

const useStyles = makeStyles(theme => ({
     containerInfo: {
          width: '50%',
          paddingRight: theme.spacing(4),
          [theme.breakpoints.down('md')]: {
               width: '100%',
               paddingRight: 0,
          },
     },
     containerRequisites: {
          width: '50%',
          paddingLeft: theme.spacing(4),
          [theme.breakpoints.down('md')]: {
               width: '100%',
               paddingLeft: 0,
          },
     },
     form: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
     },
     paper: {
          padding: theme.spacing(4),
     },
     h6: {
          color: '#3D5170',
     },
     tabHeader: {
          marginBottom: theme.spacing(4),
     },
}));

function TabPanel(props) {
     const { children, value, index, ...other } = props;

     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
               {...other}
          >
               {value === index && children}
          </div>
     );
}

function a11yProps(index) {
     return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
     };
}

const CompanyDetails = () => {
     const classes = useStyles();
     const dispatch = useDispatch();
     const stateCompanies = useSelector(store => store.companiesReducer);
     const stateBanks = useSelector(store => store.banksReducer);
     const [tabIndex, setTabIndex] = React.useState(0);
     const formRef = React.useRef();

     const { id } = useParams();

     React.useEffect(() => {
          getCompany();
          getBank();
          // eslint-disable-next-line
     }, []);

     const getCompany = () => {
          dispatch(companiesService.getCompany(id));
     };

     const getBank = () => {
          dispatch(banksService.getBanks(id));
     };

     const createBank = data => {
          dispatch(banksService.createBank(id, data));
     };

     const updateBank = data => {
          dispatch(banksService.updateBank(id, data));
     };

     const deleteBank = (bankId) => {
          dispatch(banksService.deleteBank(id, bankId));
     };

     const handleChangeTab = (event, newValue) => {
          setTabIndex(newValue);
     };

     const handleSubmit = event => {
          event.preventDefault();
          const f = [...formRef.current].filter(
               item => item.type === 'text' || item.type === 'checkbox'
          );
          const values = {};
          f.forEach(item => (values[item.name] = item.value));
          dispatch(companiesService.updateCompany(id, values));
     };

     const fieldsInfo = [
          {
               value: 'name',
               label: 'Наименование компании',
               size: { xs: 12 },
          },
          {
               value: 'shortname',
               label: 'Краткое название',
               size: { xs: 12, md: 6 },
          },
          {
               value: 'workscope',
               label: 'Сфера деятельности',
               size: { xs: 12, md: 6 },
          },
          { value: 'region', label: 'Регион', size: { xs: 12, md: 6 } },
          { value: 'city', label: 'Город', size: { xs: 12, md: 6 } },
          { value: 'email', label: 'Email', size: { xs: 12, md: 6 } },
          { value: 'phone', label: 'Телефон', size: { xs: 12, md: 6 } },
          {
               value: 'description',
               label: 'Дополнительно (описание)',
               size: { xs: 12, multiline: true, rows: 3 },
          },
     ];

     const fieldsRequisites = [
          {
               value: 'registered_name',
               label: 'Наименование юр.лица',
               size: { xs: 12 },
          },
          { value: 'type', label: 'Тип юр.лица', size: { xs: 12, md: 6 } },
          {
               value: 'bin_iin',
               label: 'БИН/ИИН',
               size: { xs: 12, md: 6 },
          },
          { value: 'leader', label: 'Руководитель', size: { xs: 12, md: 6 } },
          {
               value: 'leader_position',
               label: 'Должность руководителя',
               size: { xs: 12, md: 6 },
          },
          {
               value: 'registered_address',
               label: 'Юридический адрес',
               size: { xs: 12, md: 6 },
          },
          {
               value: 'address',
               label: 'Фактический адрес',
               size: { xs: 12, md: 6 },
          },
     ];

     return (
          <Paper className={classes.paper}>
               <Tabs
                    value={tabIndex}
                    onChange={handleChangeTab}
                    aria-label="simple tabs example"
                    className={classes.tabHeader}
               >
                    <Tab label="Инфомация" {...a11yProps(0)} />
                    <Tab label="Банковские реквизиты" {...a11yProps(1)} />
               </Tabs>
               {stateCompanies.company && (
                    <TabPanel value={tabIndex} index={0}>
                         <form
                              onSubmit={handleSubmit}
                              className={classes.form}
                              ref={formRef}
                         >
                              <div className={classes.containerInfo}>
                                   <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                             <Typography
                                                  variant="h6"
                                                  className={classes.h6}
                                             >
                                                  Основная информация
                                             </Typography>
                                        </Grid>
                                        {fieldsInfo.map(
                                             (
                                                  { value, label, size },
                                                  index
                                             ) => {
                                                  return (
                                                       <Grid
                                                            item
                                                            xs={size.xs}
                                                            md={size.md}
                                                            key={index}
                                                       >
                                                            <TextField
                                                                 error={
                                                                      stateCompanies.error &&
                                                                      stateCompanies
                                                                           .error[
                                                                           value
                                                                      ]
                                                                           ? true
                                                                           : false
                                                                 }
                                                                 helperText={
                                                                      stateCompanies.error &&
                                                                      stateCompanies
                                                                           .error[
                                                                           value
                                                                      ]
                                                                           ? stateCompanies
                                                                                  .error[
                                                                                  value
                                                                             ][0]
                                                                           : ''
                                                                 }
                                                                 name={value}
                                                                 InputProps={{
                                                                      style: {
                                                                           fontSize: 12,
                                                                      },
                                                                 }}
                                                                 InputLabelProps={{
                                                                      style: {
                                                                           fontSize: 12,
                                                                      },
                                                                 }}
                                                                 size="small"
                                                                 fullWidth={
                                                                      true
                                                                 }
                                                                 label={label}
                                                                 defaultValue={
                                                                      stateCompanies
                                                                           .company[
                                                                           value
                                                                      ]
                                                                 }
                                                                 variant="outlined"
                                                                 multiline={
                                                                      size.multiline
                                                                 }
                                                                 rows={
                                                                      size.rows
                                                                 }
                                                            />
                                                       </Grid>
                                                  );
                                             }
                                        )}
                                   </Grid>
                              </div>
                              <div className={classes.containerRequisites}>
                                   <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                             <Typography
                                                  variant="h6"
                                                  className={classes.h6}
                                             >
                                                  Реквизиты компании
                                             </Typography>
                                        </Grid>
                                        {fieldsRequisites.map(
                                             (
                                                  { value, label, size },
                                                  index
                                             ) => {
                                                  return (
                                                       <Grid
                                                            item
                                                            xs={size.xs}
                                                            md={size.md}
                                                            key={index}
                                                       >
                                                            <TextField
                                                                 error={
                                                                      stateCompanies.error &&
                                                                      stateCompanies
                                                                           .error[
                                                                           value
                                                                      ]
                                                                           ? true
                                                                           : false
                                                                 }
                                                                 helperText={
                                                                      stateCompanies.error &&
                                                                      stateCompanies
                                                                           .error[
                                                                           value
                                                                      ]
                                                                           ? stateCompanies
                                                                                  .error[
                                                                                  value
                                                                             ][0]
                                                                           : ''
                                                                 }
                                                                 name={value}
                                                                 InputProps={{
                                                                      style: {
                                                                           fontSize: 12,
                                                                      },
                                                                 }}
                                                                 InputLabelProps={{
                                                                      style: {
                                                                           fontSize: 12,
                                                                      },
                                                                 }}
                                                                 size="small"
                                                                 fullWidth={
                                                                      true
                                                                 }
                                                                 label={label}
                                                                 defaultValue={
                                                                      stateCompanies
                                                                           .company[
                                                                           value
                                                                      ]
                                                                 }
                                                                 variant="outlined"
                                                                 multiline={
                                                                      size.multiline
                                                                 }
                                                                 rows={
                                                                      size.rows
                                                                 }
                                                            />
                                                       </Grid>
                                                  );
                                             }
                                        )}
                                        <Grid item xs={12}>
                                             <Switch
                                                  name={'tax_payer'}
                                                  color="primary"
                                                  defaultChecked={
                                                       stateCompanies.company
                                                            .tax_payer
                                                  }
                                             />
                                        </Grid>
                                   </Grid>
                              </div>
                              <Button
                                   type="submit"
                                   variant="contained"
                                   color="primary"
                              >
                                   Сохранить
                              </Button>
                         </form>
                         <Grid></Grid>
                    </TabPanel>
               )}
               <TabPanel value={tabIndex} index={1}>
                    <MaterialTable
                         title="Банковские реквизиты компании"
                         columns={[
                              { title: 'Банк', field: 'bank' },
                              { title: 'БИК', field: 'bank_id_code' },
                              { title: 'Номер счета', field: 'account_number' },
                              {
                                   title: 'Валюта',
                                   field: 'currency',
                              },
                         ]}
                         data={stateBanks.banks}
                         editable={{
                              onRowAdd: newData => {
                                   return new Promise((resolve, reject) => {
                                        createBank(newData);
                                        resolve();
                                   });
                              },
                              onRowUpdate: (newData, oldData) => {
                                   return new Promise((resolve, reject) => {
                                        updateBank(newData);
                                        resolve();
                                   });
                              },
                              onRowDelete: oldData => {
                                   return new Promise((resolve, reject) => {
                                        deleteBank(oldData.id);
                                        resolve();
                                   });
                              },
                         }}
                    />
               </TabPanel>
          </Paper>
     );
};

export default CompanyDetails;
