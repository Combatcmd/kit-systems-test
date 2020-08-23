import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
     Card,
     Typography,
     IconButton,
     Button,
     TextField,
     InputAdornment,
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import { authService } from '../../services/auth.service';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
     root: {
          width: '396px',
          padding: '40px 35px 55px',
          display: 'flex',
          flexWrap: 'wrap',
     },
     h5: {
          fontSize: '24px',
          lineHeight: '28px',
          color: '#3D5170',
          marginBottom: '48px',
     },
     input: {
          width: '100%',
          marginBottom: '28px',
     },
     button: {
          marginLeft: 'auto',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '16px',
          letterSpacing: '1.25px',
          padding: '10px 25px',
     },
});

const Auth = () => {
     const classes = useStyles();
     const dispatch = useDispatch();
     const [values, setValues] = React.useState({
          email: '',
          password: '',
          showPassword: false,
     });

     const handleChange = prop => event => {
          setValues({ ...values, [prop]: event.target.value });
     };

     const handleClickShowPassword = () => {
          setValues({ ...values, showPassword: !values.showPassword });
     };

     const handleMouseDownPassword = event => {
          event.preventDefault();
     };

     const onSubmit = () => {
          dispatch(
               authService.signin({
                    email: values.email,
                    password: values.password,
               })
          );
     };

     return (
          <Card className={classes.root}>
               <Typography variant="h5" className={classes.h5}>
                    Авторизация
               </Typography>
               <TextField
                    className={classes.input}
                    label="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    variant="outlined"
               />
               <TextField
                    className={classes.input}
                    label="Пароль"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    variant="outlined"
                    InputProps={{
                         endAdornment: (
                              <InputAdornment position="end">
                                   <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                   >
                                        {values.showPassword ? (
                                             <Visibility />
                                        ) : (
                                             <VisibilityOff />
                                        )}
                                   </IconButton>
                              </InputAdornment>
                         ),
                    }}
               />
               <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={onSubmit}
               >
                    Войти
               </Button>
          </Card>
     );
};

export default Auth;
