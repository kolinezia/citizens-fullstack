const mongoose = require('mongoose');
const fs = require('fs/promises');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { Citizens } = require('../models/citizens.model.js');
const { Cities } = require('../models/cities.model.js');

/**
 * Opens Mongoose's connection to MongoDB and overwrites the database collections.
 */
exports.mongooseConnect = async () => {
    mongoose.connect(
        `mongodb://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?authSource=admin&retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true },
        async (err) => {
            if (err) { throw new Error(err); }

            console.log('[Database] MongoDB connected');
            await overwriteCollections();
        }
    );

};

/**
 * Overwrites database collections.
 */
async function overwriteCollections () {
    try {
        await Cities.deleteMany({});
        await Citizens.deleteMany({});

        const cities = await getCitiesJSON();
        const citizens = await getCitizensJSON();

        await Cities.insertMany(cities);
        await Citizens.insertMany(citizens);

        console.log('[Database] Cities and Citizens are overwritten');
    } catch (err) {
        throw new Error(err);
    }
}

async function getCitizensJSON () {
    try {
        const citizens = await fs.readFile(path.resolve('src/database/citizens.json'));
        return JSON.parse(citizens.toString());
    } catch (err) {
        throw new Error(err);
    }
}

async function getCitiesJSON () {
    try {
        const cities = await fs.readFile(path.resolve('src/database/cities.json'));
        return JSON.parse(cities.toString());
    } catch (err) {
        throw new Error(err);
    }

}
