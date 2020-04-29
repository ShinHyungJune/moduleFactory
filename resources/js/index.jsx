import React, {Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import AuthRoute from './components/common/AuthRoute';
import store from './store';
import {connect} from "react-redux";

import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import SendResetPassword from './pages/SendResetPassword';
import ResetPassword from './pages/ResetPassword';
import Flash from './components/common/Flash';
import Modules from "./pages/Modules";

import {setScrollActive} from "./actions/commonActions";

const Index = () => {
    const html = document.querySelector("html");
    
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    }, []);
    
    const onScroll = (e) => {
        if(html.getBoundingClientRect().top === 0)
            return store.dispatch(setScrollActive(false));
    
        return store.dispatch(setScrollActive(true));
    };
    
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Flash />
                    
                    <Header />
                    
                    <div className="wrap-contents">
                        <Switch>
                            <AuthRoute exact path="/" component={Modules} />
                            <AuthRoute exact path="/modules" component={Modules} />

                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/sendResetPasswordMail" component={SendResetPassword} />
                            <Route exact path="/passwordReset" component={ResetPassword} />
                            
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index/>, document.getElementById('app'));
}

