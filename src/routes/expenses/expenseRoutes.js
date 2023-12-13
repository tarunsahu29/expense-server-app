const express = require('express');
const { createExpCtrl, fetchAllExpCtrl, fetchExpDetailsCtrl, updateExpCtrl, deleteExpCtrl } = require('../../controllers/expenses/expenseCtrl');

const expenseRoute = express.Router()
expenseRoute.post('/', createExpCtrl)
expenseRoute.get('/', fetchAllExpCtrl);
expenseRoute.get('/:id', fetchExpDetailsCtrl);
expenseRoute.put('/:id', updateExpCtrl);
expenseRoute.delete('/:id', deleteExpCtrl);

module.exports = expenseRoute;