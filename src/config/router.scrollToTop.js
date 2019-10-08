import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
class ScrollToTopRoute extends Component {

    render() {
        const { component: Component, ...rest } = this.props;
        return <Route {...rest} render={props => (<Component {...props} />)} />;
    }
}

export default withRouter(ScrollToTopRoute);

