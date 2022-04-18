
import { parkvehiclevalidator } from '../middlewares/index.js';
import VehicleService from '../services/VehicleService.js';
import BaseController from './BaseController.js';

export default class VehicleController extends BaseController {
    paths = [{
        'method': 'POST',
        'path': '/parkvehicle',
        'middlewares': [parkvehiclevalidator],
        'handler': this.parkVehicle
    }, {
        'method': 'GET',
        'path': '/exitparkingvehicle',
        'middlewares': [],
        'handler': this.exitParkingVehicle
    }, {
        'method': 'GET',
        'path': '/checkparkinghitory',
        'middlewares': [],
        'handler': this.checkParkingHitory
    }
    ]

    async parkVehicle(req, res) {
        try {
            const result = await new VehicleService().parkVehicle(req);
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async exitParkingVehicle(req, res) {
        try {
            const result = await new VehicleService().exitParkingVehicle(req);
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async checkParkingHitory(req, res) {
        try {
            const result = await new VehicleService().checkParkingHitory(req);
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}
