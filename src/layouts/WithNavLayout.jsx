import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { authService, companiesService } from '../services';
import { Link } from 'react-router-dom';
import {
     AppBar,
     CssBaseline,
     Divider,
     Drawer,
     Hidden,
     IconButton,
     Toolbar,
     Typography,
     Button,
     Modal,
     Grid,
     TextField,
     List,
     ListItem,
     ListItemIcon,
     ListItemText,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
     root: {
          display: 'flex',
     },
     drawer: {
          [theme.breakpoints.up('sm')]: {
               width: drawerWidth,
               flexShrink: 0,
          },
     },
     appBar: {
          backgroundColor: '#fff',
          [theme.breakpoints.up('sm')]: {
               width: `calc(100% - ${drawerWidth}px)`,
               marginLeft: drawerWidth,
               padding: theme.spacing(0, 9),
          },
     },
     menuButton: {
          marginRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
               display: 'none',
          },
     },
     addUserButton: {
          marginLeft: 'auto',
          textTransform: 'capitalize',
     },
     toolbar: theme.mixins.toolbar,
     logo: {
          backgroundImage: 'url(./logo.png)',
          backgroundPosition: 'bottom center',
          backgroundSize: '70%',
          backgroundRepeat: 'no-repeat',
     },
     drawerPaper: {
          width: drawerWidth,
     },
     content: {
          flexGrow: 1,
          padding: theme.spacing(3, 9),
     },
     modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },
     modalBody: {
          width: '524px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(4),
          outline: 'none',
     },
     h5: {
          color: '#3D5170',
          marginBottom: theme.spacing(3),
     },
     h6: {
          color: '#3D5170',
     },
     form: { display: 'flex', flexWrap: 'wrap' },
     saveUserButton: {
          marginLeft: 'auto',
          marginTop: theme.spacing(3),
     },
     input: {
          fontSize: '12px',
     },
     label: {
          fontSize: '12px',
     },
     helperText: {
          letterSpacing: 0,
          fontSize: 10,
     },
     success: {
          color: 'green',
          margin: 0,
          textAlign: 'center',
     },
}));

const WithNavLayout = props => {
     const { window, children } = props;
     const classes = useStyles();
     const dispatch = useDispatch();
     const state = useSelector(store => store.companiesReducer);
     const [mobileOpen, setMobileOpen] = React.useState(false);
     const [modalOpen, setModalOpen] = React.useState(false);
     const [values, setValues] = React.useState({
          name: '',
          shortname: '',
          registered_type: '',
          workscope: '',
          region: '',
          city: '',
          email: '',
          phone: '',
          description: '',
     });

     const handleChange = prop => event => {
          setValues({ ...values, [prop]: event.target.value });
     };

     const handleDrawerToggle = () => {
          setMobileOpen(!mobileOpen);
     };

     const handleModalOpen = () => {
          setModalOpen(true);
     };

     const handleModalClose = () => {
          setModalOpen(false);
     };

     const handleSubmit = event => {
          event.preventDefault();
          dispatch(companiesService.createCompany(values));
     };

     const handleLogout = () => {
          authService.signout();
     };

     const fields = [
          {
               value: 'name',
               label: 'Наименование компании',
               size: { xs: 12, sm: 6 },
          },
          {
               value: 'shortname',
               label: 'Краткое название',
               size: { xs: 12, sm: 6 },
          },
          {
               value: 'registered_type',
               label: 'Тип юр. лица',
               size: { xs: 12, sm: 6 },
          },
          {
               value: 'workscope',
               label: 'Сфера деятельности',
               size: { xs: 12, sm: 6 },
          },
          { value: 'region', label: 'Регион', size: { xs: 12, sm: 6 } },
          { value: 'city', label: 'Город', size: { xs: 12, sm: 6 } },
          { value: 'email', label: 'Email', size: { xs: 12, sm: 6 } },
          { value: 'phone', label: 'Телефон', size: { xs: 12, sm: 6 } },
          {
               value: 'description',
               label: 'Дополнительно (описание)',
               size: { xs: 12, sm: 12, multiline: true, rows: 3 },
          },
     ];
     const modalBody = (
          <div className={classes.modalBody}>
               <Typography
                    variant="h5"
                    id="add-client-modal"
                    className={classes.h5}
               >
                    Добавить клиента
               </Typography>
               <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                         {fields.map(({ value, label, size }, index) => {
                              return (
                                   <Grid
                                        item
                                        xs={size.xs}
                                        sm={size.sm}
                                        key={index}
                                   >
                                        <TextField
                                             error={
                                                  state.error &&
                                                  state.error[value]
                                                       ? true
                                                       : false
                                             }
                                             helperText={
                                                  state.error &&
                                                  state.error[value]
                                                       ? state.error[value][0]
                                                       : ''
                                             }
                                             FormHelperTextProps={{
                                                  className: classes.helperText,
                                             }}
                                             InputProps={{
                                                  style: { fontSize: 12 },
                                             }}
                                             InputLabelProps={{
                                                  style: { fontSize: 12 },
                                             }}
                                             size="small"
                                             fullWidth={true}
                                             label={label}
                                             value={values[value]}
                                             onChange={handleChange(value)}
                                             variant="outlined"
                                             multiline={size.multiline}
                                             rows={size.rows}
                                        />
                                   </Grid>
                              );
                         })}
                         {state && state.success ? (
                              <Grid item xs={12}>
                                   <p className={classes.success}>
                                        Компания успешно добавлена
                                   </p>
                              </Grid>
                         ) : (
                              <></>
                         )}
                    </Grid>
                    <Button
                         type="submit"
                         color="primary"
                         className={classes.saveUserButton}
                    >
                         Добавить
                    </Button>
               </form>
          </div>
     );

     const ClientsIcon = () => {
          return (
               <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
               >
                    <path
                         d="M14.0156 9V6.98438H3.98438V9H14.0156ZM14.0156 12.9844V11.0156H3.98438V12.9844H14.0156ZM11.0156 17.0156V15H3.98438V17.0156H11.0156ZM9.70312 3.28125C9.51562 3.09375 9.28125 3 9 3C8.71875 3 8.48438 3.09375 8.29688 3.28125C8.10938 3.46875 8.01562 3.70312 8.01562 3.98438C8.01562 4.26562 8.10938 4.51562 8.29688 4.73438C8.48438 4.92188 8.71875 5.01562 9 5.01562C9.28125 5.01562 9.51562 4.92188 9.70312 4.73438C9.89062 4.51562 9.98438 4.26562 9.98438 3.98438C9.98438 3.70312 9.89062 3.46875 9.70312 3.28125ZM15.9844 3C16.5156 3 16.9844 3.20312 17.3906 3.60938C17.7969 4.01562 18 4.48438 18 5.01562V18.9844C18 19.5156 17.7969 19.9844 17.3906 20.3906C16.9844 20.7969 16.5156 21 15.9844 21H2.01562C1.48438 21 1.01562 20.7969 0.609375 20.3906C0.203125 19.9844 0 19.5156 0 18.9844V5.01562C0 4.48438 0.203125 4.01562 0.609375 3.60938C1.01562 3.20312 1.48438 3 2.01562 3H6.1875C6.40625 2.40625 6.76562 1.92188 7.26562 1.54688C7.76562 1.17188 8.34375 0.984375 9 0.984375C9.65625 0.984375 10.2344 1.17188 10.7344 1.54688C11.2344 1.92188 11.5938 2.40625 11.8125 3H15.9844Z"
                         fill="#007BFF"
                    />
               </svg>
          );
     };

     const LogOutIcon = () => {
          return (
               <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
               >
                    <path
                         d="M15.9844 0C16.5156 0 16.9844 0.203125 17.3906 0.609375C17.7969 1.01562 18 1.48438 18 2.01562V15.9844C18 16.5156 17.7969 16.9844 17.3906 17.3906C16.9844 17.7969 16.5156 18 15.9844 18H2.01562C1.45312 18 0.96875 17.7969 0.5625 17.3906C0.1875 16.9844 0 16.5156 0 15.9844V12H2.01562V15.9844H15.9844V2.01562H2.01562V6H0V2.01562C0 1.48438 0.1875 1.01562 0.5625 0.609375C0.96875 0.203125 1.45312 0 2.01562 0H15.9844ZM7.07812 12.6094L9.65625 9.98438H0V8.01562H9.65625L7.07812 5.39062L8.48438 3.98438L13.5 9L8.48438 14.0156L7.07812 12.6094Z"
                         fill="#BB1C1C"
                    />
               </svg>
          );
     };

     const drawer = (
          <div>
               <div className={`${classes.toolbar} ${classes.logo}`}></div>
               <Divider />
               <List>
                    <ListItem
                         button
                         key="clients"
                         component={Link}
                         to="/companies"
                    >
                         <ListItemIcon>
                              <ClientsIcon />
                         </ListItemIcon>
                         <ListItemText primary="Клиенты" />
                    </ListItem>
                    <ListItem button key="logout" onClick={handleLogout}>
                         <ListItemIcon>
                              <LogOutIcon />
                         </ListItemIcon>
                         <ListItemText primary="Выход" />
                    </ListItem>
               </List>
          </div>
     );

     const container =
          window !== undefined ? () => window().document.body : undefined;

     return (
          <div className={classes.root}>
               <CssBaseline />
               <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar disableGutters={true}>
                         <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              edge="start"
                              onClick={handleDrawerToggle}
                              className={classes.menuButton}
                         >
                              <MenuIcon />
                         </IconButton>
                         <Typography variant="h6" className={classes.h6} noWrap>
                              Клиенты
                         </Typography>
                         <Button
                              variant="contained"
                              color="primary"
                              className={classes.addUserButton}
                              onClick={handleModalOpen}
                         >
                              Добавить
                         </Button>
                    </Toolbar>
               </AppBar>
               <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                         <Drawer
                              container={container}
                              variant="temporary"
                              anchor="left"
                              open={mobileOpen}
                              onClose={handleDrawerToggle}
                              classes={{
                                   paper: classes.drawerPaper,
                              }}
                              ModalProps={{
                                   keepMounted: true,
                              }}
                         >
                              {drawer}
                         </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                         <Drawer
                              classes={{
                                   paper: classes.drawerPaper,
                              }}
                              variant="permanent"
                              open
                         >
                              {drawer}
                         </Drawer>
                    </Hidden>
               </nav>
               <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
               </main>
               <Modal
                    className={classes.modal}
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="add-client-modal"
                    aria-describedby="add-client-modal-description"
               >
                    {modalBody}
               </Modal>
          </div>
     );
};

export default WithNavLayout;
