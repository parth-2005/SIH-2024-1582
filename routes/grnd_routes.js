const routes = require('express').Router();
const Pole = require('../models/pole');
const Alert = require('../models/alert');
const mongoose = require('mongoose');

routes.post('/pole', async (req, res) => {
    try {
        const pole = new Pole(req.body);
        await pole.save();
        res.status(201).send(pole);
    } catch (err) {
        res.status(400).send(err);
    }
});

routes.get('/pole', async (req, res) => {
    try {
        const poles = await Pole.find({});
        res.status(200).send(poles);
    } catch (err) {
        res.status(400).send(err);
    }
});

routes.post('/', async (req, res) => {
    const { PoleID, code, message, data: { current, resistance } } = req.body;

    try {
        const pole = await Pole.findOne({ PoleID });
        if (!pole) {
            throw new Error('Pole not found');
        }
        var timestamp = new Date();
        const alert = new Alert({
            code,
            message,
            data: {
                current,
                resistance
            },
            timestamp,
            PoleID: pole._id
        });

        await alert.save();

        res.status(201).send(alert);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

routes.get('/', async (req, res) => {
    try {
        const alerts = await Alert.find({});
        res.status(200).send(alerts);
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = routes;
