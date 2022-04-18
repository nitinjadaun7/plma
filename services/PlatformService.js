import Platform from '../models/PlatformModel.js';

export default class PlatformService {
    async addPlatform(req) {
        try {
            if (await Platform.findOne({ lot: req.body.lot })) {
                return { message: "Lot already exists in DB" }
            }
            await Platform.create(req.body);
            return { message: "Platform added" }
        } catch (error) {
            throw error;
        }
    }
    async getPlatform(req) {
        try {
            return await Platform.find();
        } catch (error) {
            throw error;
        }
    }
}