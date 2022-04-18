import Joi from 'joi';
export const platformvalidator = (req, res, next) => {
    const schema = Joi.object({
        'lot': Joi.number()
            .required()
            .label('Lot Number'),
        'capacity': Joi.array()
            .items({
                'type': Joi.string()
                    .valid('suv', 'twoWheeler', 'hatchback')
                    .required()
                    .label('Vehicle type'),
                'capacity': Joi.number()
                    .required()
                    .label('capacity'),
                'rate': Joi.number()
                    .required()
                    .label('Rate'),
            }),
        'area': Joi.string()
            .required()
            .label('Area')
    });

    const { error } = schema.validate({
        'lot': req.body.lot,
        'capacity': req.body.capacity,
        'area': req.body.area,
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