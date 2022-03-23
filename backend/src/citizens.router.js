const express = require('express');
const router = express.Router();

const { getCitizens } = require('./citizens.service.js');
const { getCitizensTree, getFilter } = require('./citizensTree.service.js');

router.get('/tree', async (req, res) => {
    const filterList = ['city', 'district', 'street'];
    const filter = getFilter(req.query, filterList);
    const citizens = await getCitizens();
    const citizenTree = getCitizensTree(citizens, filter);
    res.json(citizenTree);
});

module.exports = router;