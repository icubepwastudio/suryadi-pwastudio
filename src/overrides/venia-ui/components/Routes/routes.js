import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import HomePage from '@magento/venia-ui/lib/components/HomePage';
import MagentoRoute from '@magento/venia-ui/lib/components/MagentoRoute';
import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';

import ExamplePage from 'src/components/Example';

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);

    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                {/*
                 * Client-side routes are injected by BabelRouteInjectionPlugin here.
                 * Venia's are defined in packages/venia-ui/lib/targets/venia-ui-intercept.js
                 */}
                 <Route exact path="/selena-pants.html">
                    <ExamplePage />
                </Route>
                <Route>
                    <MagentoRoute />
                    {/*
                     * The Route below is purposefully nested with the MagentoRoute above.
                     * MagentoRoute renders the CMS page, and HomePage adds a stylesheet.
                     * HomePage would be obsolete if the CMS could deliver a stylesheet.
                     */}
                    <Route exact path="/home">
                        <HomePage />
                    </Route>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
