import Joi from 'joi';
export const parkvehiclevalidator = (req, res, next) => {
    const schema = Joi.object({
        'name': Joi.string()
            .required()
            .label('Vehicle name'),
        'type': Joi.string()
            .valid('suv', 'twoWheeler', 'hatchback')
            .required()
            .label('Vehicle type'),
        'lotNumber': Joi.number()
            .required()
            .label('Lot Number'),
        'vehicleNumber': Joi.string()
            .required()
            .label('Vehicle Number')
    });

    const { error } = schema.validate({
        'name': req.body.name,
        'type': req.body.type,
        'lotNumber': req.body.lotNumber,
        'vehicleNumber': req.body.vehicleNumber,
    });

    if (!error) {
        return next();
    } else {
        let errordata = JSON.parse(JSON.stringify(error));
        let message = errordata.details[0].message;
        if (message.length) {
            res.status(400).send({ message: message });
        }
    }
}