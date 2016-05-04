import React from 'react';

var stubRouterContext = (Component, props, stubs) => {
    let RouterStub = { };

    Object.assign(RouterStub, {
        makePath () {},
        makeHref () {},
        transitionTo () {},
        replaceWith () {},
        goBack () {},
        getCurrentPath () {},
        getCurrentRoutes () {},
        getCurrentPathname () {},
        getCurrentParams () {},
        getCurrentQuery () {},
        isActive () {},
        getRouteAtDepth() {},
        setRouteComponentAtDepth() {},
        push () {},
        replace () {},
        go () {},
        goForward () {},
        setRouteLeaveHook() {}
    }, stubs);

    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.object,
            routeDepth: React.PropTypes.number
        },

        getChildContext () {
            return {
                router: RouterStub,
                routeDepth: 0
            };
        },

        render () {
            return <Component {...props} />
        }
    });
};

module.exports = stubRouterContext;