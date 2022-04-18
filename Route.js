import PlatfromController from './controllers/PlatformController.js';
import VehicleController from './controllers/VehicleController.js';


export default class Routes {
    /**
     * returns the map object of routes and their associated controller
     */

    constructor() {
        this.paths = {
            '/vehicles': new VehicleController(),
            '/platfrom': new PlatfromController()
        }
    }
    get() {
        return this.paths;
    }

}