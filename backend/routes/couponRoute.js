import express from 'express'
import { activate, createCoupon, deleteCoupon, getActiveCoupon, listCoupon, remove } from '../controllers/couponController.js'

const couponRouter = express.Router()

couponRouter.post('/create', createCoupon)
couponRouter.get('/list', listCoupon)
couponRouter.post('/active', activate)
couponRouter.post('/remove', remove)
couponRouter.post('/delete', deleteCoupon)
couponRouter.get('/applied', getActiveCoupon)

export default couponRouter