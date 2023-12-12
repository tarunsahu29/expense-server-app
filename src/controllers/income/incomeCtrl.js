const expressAsyncHandler = require('express-async-handler')
const Income = require('../../model/Income')

//create
const createIncCtrl = expressAsyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body
  try {
    const income = await Income.create({ title, amount, description, user })
    res.json(income)
  } catch (error) {
    res.json(error)
  }
})

//fetch all income
const fetchAllIncCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const income = await Income.find();
    res.json(income)
  } catch (error) {
    res.json(error)
  }
})

//fetch single income
const fetchIncDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const income = await Income.findById(id)
    res.json(income)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { createIncCtrl, fetchAllIncCtrl, fetchIncDetailsCtrl }
