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
import Modules from "./pages/modules/Items";
import Projects from './pages/projects/Items';
import ProjectCreate from './pages/projects/Create';
import ProjectEdit from './pages/projects/Edit';
import ModuleCreate from './pages/modules/Create';
import ModuleEdit from './pages/modules/Edit';

const Index = () => {
    const html = document.querySelector("html");
    

    
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Flash />
                    
                    <Header />
                    
                    <div className="contents">
                        <Switch>
                            <AuthRoute exact path="/" component={Projects} />
                            <AuthRoute exact path="/projects" component={Projects} />
                            <AuthRoute exact path="/projects/create" component={ProjectCreate} />
                            <AuthRoute exact path="/projects/edit/:id" component={ProjectEdit} />
                            
                            <AuthRoute exact path="/projects/:project_id" component={Modules} />
                            <AuthRoute exact path="/modules/create/:project_id" component={ModuleCreate} />
                            <AuthRoute exact path="/modules/edit/:id" component={ModuleEdit} />

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

