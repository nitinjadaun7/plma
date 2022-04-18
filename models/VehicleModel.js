/*!
 * Module dependencies
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * User schema
 */

const VehicleSchema = new Schema({
    name: { type: String, required: true, },
    type: { type: String, required: true, index: true },
    lotNumber: { type: Number, required: true, index: true },
    vehicleNumber: { type: String, required: true, index: true },
    parkedInTime: { type: Date, default: Date.now, required: true, index: true },
    parkedOutTime: { type: Date },
    amountPaid: { type: Number },

});

VehicleSchema.set('toJSON', { virtuals: true });
export default mongoose.model('Vehicle', VehicleSchema);
