const { Citizens } = require('./models/citizens.model.js');

/**
 * @returns {Promise<Array<Object>>} - An array of joined citizens and cities.
 */
exports.getCitizens = async () => {
    return Citizens.aggregate([
        {
            $lookup: {
                from: 'cities',
                localField: 'city_id',
                foreignField: 'id',
                as: 'city_info',
                pipeline: [
                    {
                        $unset: ['_id', '__v', 'id']
                    }
                ]
            },
        },
        {
            $unwind: '$city_info',
        },
        {
            $unset: ['_id', '__v', 'city_id']
        },
    ]);
};

