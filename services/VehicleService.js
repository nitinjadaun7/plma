import Platform from '../models/PlatformModel.js';
import Vehicle from '../models/VehicleModel.js';

export default class VehicleService {
    async parkVehicle(req) {
        try {
            let capacity = 0;
            const lotRes = await Platform.findOne({ 'lot': req.body.lotNumber }, { "capacity.type": 1, "capacity.capacity": 1 });
            if ('capacity' in lotRes) {
                capacity = lotRes.capacity.filter(veh => veh.type === req.body.type)[0].capacity;
            }
            const parkedVehicleCount = await Vehicle.count({ lotNumber: req.body.lotNumber, type: req.body.type });
            if (parkedVehicleCount < capacity) {
                const checkParkedVeh = await Vehicle.findOne({ vehicleNumber: req.body.vehicleNumber, parkedOutTime: { $exists: false } });
                if (!checkParkedVeh) {
                    await Vehicle.create(req.body);
                    return { message: "Vehicle Parked" };
                } else {
                    return { message: "This Vehicle is already parked in parking" };
                }
            }
            return { message: "Parking full for this lot" };
        } catch (error) {
            throw error;
        }
    }

    async exitParkingVehicle(req) {
        try {
            const checkVehicle = await Vehicle.aggregate([{
                $match: {
                    'vehicleNumber': req.query.vehicleNumber,
                    'parkedOutTime': { $exists: false }
                }
            }, {
                $lookup: {
                    from: 'platforms',
                    localField: 'lotNumber',
                    foreignField: 'lot',
                    as: 'platform'
                }
            }, {
                $unwind: '$platform'
            }
            ]);
            if (checkVehicle.length) {
                const vehicleType = checkVehicle[0].type;
                const parkedInTime = checkVehicle[0].parkedInTime;
                const vehicleId = checkVehicle[0]._id;
                const parkedOutTime = Date.now();
                const vehiclerate = checkVehicle[0]?.platform?.capacity.filter(plat => plat.type == vehicleType);
                // total parking time
                const parkedTime = Math.ceil(Math.abs(parkedOutTime - parkedInTime) / 36e5);
                // duration cap for getting total amount
                let hourCap = Math.floor(parkedTime / 2);
                // check for even duartion
                if (hourCap % 2 === 1 || hourCap === 0) {
                    hourCap++;
                }
                // totl due Amount
                let totalDueAmount = hourCap * vehiclerate[0].rate;
                const existParking = await Vehicle.updateOne({ _id: vehicleId }, { $set: { parkedOutTime: parkedOutTime, amountPaid: totalDueAmount } });
                if (existParking?.modifiedCount) {
                    return { message: ` Thank you for using parking. Your total due amount is ${totalDueAmount} Rs for the duration of ${parkedTime} hours` };
                }
                return { message: `Facing some technical issue` };
            }
            return { message: 'This vehicle is not parked in parking.' };
        } catch (error) {
            throw error;
        }
    }

    async checkParkingHitory(req) {
        try {
            const checkVehicle = await Vehicle.aggregate([{
                $match: {
                    'vehicleNumber': req.query.vehicleNumber
                }
            }, {
                $sort: {
                    parkedInTime: -1
                }
            }, {
                $lookup: {
                    from: 'platforms',
                    localField: 'lotNumber',
                    foreignField: 'lot',
                    as: 'platform'
                }
            }, {
                $unwind: '$platform'
            }
            ]);
            if (checkVehicle.length) {
                const parkingHistory = [];
                for (const vehicle of checkVehicle) {
                    let history = {
                        name: vehicle.name,
                        lot: vehicle.lotNumber,
                        area: vehicle?.platform?.area,
                        amountPaid: `${vehicle.amountPaid || 0} Rs`,
                        duration: Math.ceil(Math.abs((vehicle.parkedOutTime ? vehicle.parkedOutTime : Date.now()) - vehicle.parkedInTime) / 36e5) + ' hours',
                        parkingInTime: vehicle.parkedInTime,
                        parkedOutTime: vehicle?.parkedOutTime ? vehicle.parkedOutTime : 'In Parking',
                    }
                    parkingHistory.push(history);
                }
                return { data: parkingHistory }
            }
            return { message: "This vehicle is not parked in parking." }
        } catch (error) {
            throw error;
        }
    }
}