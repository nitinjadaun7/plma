
import { platformvalidator } from '../middlewares/index.js';
import PlatformService from '../services/PlatformService.js';
import BaseController from './BaseController.js';

export default class PlatfromController extends BaseController {
    paths = [{
        'method': 'POST',
        'path': '/addplatform',
        'middlewares': [platformvalidator],
        'handler': this.addPlatform
    }, {
        'method': 'GET',
        'path': '/getplatform',
        'middlewares': [],
        'handler': this.getPlatform
    }
    ]

    async addPlatform(req, res) {
        try {
            const result = await new PlatformService().addPlatform(req);
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getPlatform(req, res) {
        try {
            const result = await new PlatformService().getPlatform(req);
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
