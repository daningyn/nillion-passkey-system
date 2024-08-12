const _ = require('lodash');
const path = require('path');
const utils = require('../common/utils');
const middlewares = require('../middlewares');

const apiActions = ['get', 'post', 'put', 'delete', 'patch'];

const setupRoutes = (router) => {
  
    console.log('Setup Routes...');
    const routeConfigFiles = utils.walkDir(__dirname + '/routes');
    const controllerFiles = utils.walkDir(__dirname + '/controllers');

    _.each(routeConfigFiles, routeFile => {
        const route = require(routeFile);
        const routeName = path.basename(routeFile);

        const validateRouteFile = (fileName) => {
            const regex = /^([a-zA-Z0-9]+)(\.v[1-9]\d*)?\.js$/;
            return regex.test(fileName);
        }
        // check route's version
        if (validateRouteFile(routeName) === false)
            throw new Error('Route config file name should be correct structure [name].[version].js || [name].js');

        const elementsInName = _.split(routeName, '.');
        const routeVersion = elementsInName[1] !== 'js' ? `/${elementsInName[1]}` : ``;
        _.each(Object.keys(route), apiPath => {

            const apiConfig = route[apiPath];
            _.each(Object.keys(apiConfig), action => {

                // check api's action
                if (!_.includes(apiActions, action))
                    throw new Error(`API action should be ${apiActions}`);

                var actionConfig = apiConfig[action];
                // arrayify
                if (!_.isArray(actionConfig)) actionConfig = [actionConfig];

                const apiFullPath = `${routeVersion}${apiPath}`;
                const funcController = actionConfig.pop();

                // apply middlewares
                _.each(actionConfig, mw => {

                    if (!_.isFunction(middlewares[mw]))
                        throw new Error(`${mw} is not defined.`);
                    router[action](apiFullPath, middlewares[mw]);

                });

                const ctllerName = _.split(funcController, '.')[0];
                const ft = _.split(funcController, '.')[1];
                if (!ctllerName || !ft)
                    throw new Error(`${funcController} missed structure [controller].[feature]`);

                const ctllerPath = _.find(controllerFiles, controllerFile => _.includes(controllerFile, `${ctllerName}.js`));
                if (!ctllerPath)
                    throw new Error(`${ctllerName} not found.`);

                const controller = require(ctllerPath);

                // Apply feature for api
                if (!_.isFunction(controller[ft]))
                    throw new Error(`${ft} is not defined.`);

                router[action](apiFullPath, controller[ft]);

            });
            
        });
    });

}


module.exports = { setupRoutes }