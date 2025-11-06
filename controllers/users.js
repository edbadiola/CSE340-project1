const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); 
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .find({ _id: userId });

        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err });
    }
};

module.exports = {
    getAll,
    getSingle
}

