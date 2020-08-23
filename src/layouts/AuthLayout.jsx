import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
     root: {
          backgroundColor: '#F0F0F0',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
     },
});

const AuthLayout = ({ children }) => {
     const classes = useStyles();
     return (
          <Container maxWidth={false} className={classes.root}>
               {children}
          </Container>
     );
};

export default AuthLayout