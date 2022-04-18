import express from 'express';
import Routes from './Route.js';

export default class RouteLoader {

    constructor(app) {
        this.app = app;
    }

    load() {
        const routes = (new Routes)
            .get();
        Object.keys(routes)
            .forEach(route => {
                this.router = express.Router();
                routes[route].getRoutConfig()
                    .forEach(element => {
                        const method = element.method.toLowerCase();
                        let path = element.path;
                        let middlewares = [];
                        middlewares = middlewares.concat(element.middlewares);
                        const handler = element.handler;
                        // for cleanup of consective forward slashes
                        path = (route + path).replace('//', '/');
                        path = '/plma' + path;
                        switch (method) {
                            case 'get':
                                this.router.get(path, middlewares, handler);
                                break;
                            case 'post':
                                this.router.post(path, middlewares, handler);
                                break;
                            case 'put':
                                this.router.put(path, middlewares, handler);
                                break;
                            case 'delete':
                                this.router.delete(path, middlewares, handler);
                                break;
                            case 'head':
                                this.router.head(path, middlewares, handler);
                                break;
                            case 'options':
                                this.router.options(path, middlewares, handler);
                                break;
                        }
                    });
                this.app.use('/', this.router);
            });
        this.registerHandlerForNotFound();
    }

    registerHandlerForNotFound() {
        this.app.all('*', (req, res) => {
            res.status(404).send({ message: 'Page Not Found ' });
        });
    }
}