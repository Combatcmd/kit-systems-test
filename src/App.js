import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthLayout, WithNavLayout } from './layouts';
import Auth from './views/Auth';
import { CompaniesList } from './views/Companies';

const App = () => {
     const isLoggedIn = useSelector(store => store.authReducer.isLoggedIn);
     return (
          <BrowserRouter>
               <Switch>
                    <Route exact path="/">
                         <Redirect to="/companies" />
                    </Route>
                    <PrivateRouteWrapper
                         path="/companies"
                         component={CompaniesList}
                         layout={WithNavLayout}
                         isLoggedIn={isLoggedIn}
                    />
                    {/* <PrivateRouteWrapper
                         path="/company/:id"
                         component={ClientDetails}
                         layout={WithNavLayout}
                    /> */}
                    <RouteWrapper
                         path="/login"
                         component={Auth}
                         layout={AuthLayout}
                    />
               </Switch>
          </BrowserRouter>
     );
};

const PrivateRouteWrapper = ({
     component: Component,
     layout: Layout,
     isLoggedIn,
     ...rest
}) => {
     return (
          <Route
               {...rest}
               render={props =>
                    isLoggedIn ? (
                         <Layout {...props}>
                              <Component {...props} />
                         </Layout>
                    ) : (
                         <Redirect to={{ pathname: '/login' }} />
                    )
               }
          />
     );
};

const RouteWrapper = ({ component: Component, layout: Layout, ...rest }) => {
     return (
          <Route
               {...rest}
               render={props => (
                    <Layout {...props}>
                         <Component {...props} />
                    </Layout>
               )}
          />
     );
};

export default App;
