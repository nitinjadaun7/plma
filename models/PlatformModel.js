/*!
 * Module dependencies
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * User schema
 */

const PlatformSchema = new Schema({
    lot: { type: Number, unique: true, required: true, },
    capacity: { type: Array, required: true, default: [{ type: 'twoWheeler', capacity: 5, rate: 10 }, { type: 'hatchback', capacity: 5, rate: 20 }, { type: 'suv', capacity: 5, rate: 30 }], index: true },
    area: { type: String, required: true, index: true },
});

PlatformSchema.set('toJSON', { virtuals: true });
export default mongoose.model('Platform', PlatformSchema);
