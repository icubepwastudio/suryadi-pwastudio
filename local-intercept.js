/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

const { Targetables } = require('@magento/pwa-buildpack');

function localIntercept(targets) {
    const targetables = Targetables.using(targets);

    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'Placeholder Image demo page',
            pattern: '/placeholder-image-demo',
            exact: true,
            path: require.resolve(
                './src/components/PlaceholderImageDemo/placeholderImageDemo.js'
            )
        });
        return routes;
    });

    targets.of('@magento/pwa-buildpack').transformUpward.tap(def => {
        def.staticFromRoot.inline.body.file.template.inline =
            './my-static-assets/';
    });

    const ProductFullDetailComponent = targetables.reactComponent('src/components/ProductFullDetail/productFullDetail.js');

    ProductFullDetailComponent
        .insertAfterSource(
            'const ProductFullDetail = props => {\n',
            '\tconsole.log("propsnya:", props);\n'
        )
        .surroundJSX(
            '<section className={classes.options}>',
            '<div className="surroundJSX" style={{ backgroundColor: "red" }}>'
        )
        .addJSXClassName(
            '<section className={classes.options}>',
            '"addJSXClassName"'
        )
        .insertAfterJSX(
            '<Button type="submit" />',
            '<span style={{ display: "block" }}>Kami masih muda </span>'
        )
        .prependJSX(
            '<section className={classes.quantity}>',
            '<span>coba prepend</span>'
        )
}

module.exports = localIntercept;
