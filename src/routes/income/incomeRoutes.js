const express = require('express');
const { createIncCtrl, fetchAllIncCtrl, fetchIncDetailsCtrl,updateIncCtrl, deleteIncCtrl } = require('../../controllers/income/incomeCtrl');
const incomeRoute = express.Router()
incomeRoute.post('/', createIncCtrl)
incomeRoute.get('/', fetchAllIncCtrl);
incomeRoute.get('/:id', fetchIncDetailsCtrl);
incomeRoute.put('/:id', updateIncCtrl);
incomeRoute.delete('/:id', deleteIncCtrl);

module.exports = incomeRoute;