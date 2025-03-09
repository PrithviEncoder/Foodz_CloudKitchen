import couponModel from "../models/couponModel.js"



const createCoupon = async (req, res) => {

    try {
        const { name, msg, type, condition, value } = req.body;

        if (!name || !msg || !type || !condition || !value) {
            return res.status(400).json({ success: true, message: "All fields are required" });
        }

        const newCoupon = new couponModel({ name, msg, type, condition, value });
        await newCoupon.save();

        res.status(201).json({ success: true, message: "Coupon created successfully", coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }

}

const listCoupon = async (_, res) => {
    try {
        const list = await couponModel.find({})

        res.status(200).json({ success: true, list })
    } catch (error) {
        res.status(500).json({ success: false, message: "error in fetching coupon list" })
    }
}

const activate = async (req, res) => {
    try {
        // set all coupon false
        await couponModel.updateMany({}, { isActive: false });
        await couponModel.findByIdAndUpdate(req.body.id, { isActive: true })
        res.status(200).json({ success: true, message: "successfully activate" })
    } catch (error) {
        res.status(500).json({ success: false, message: "error in activate coupon" })
    }
}

const remove = async (req, res) => {
    try {
        await couponModel.findByIdAndUpdate(req.body.id, { isActive: false })
        res.status(200).json({ success: true, message: "successfully deactivated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "error in deactive coupon" })
    }
}

const deleteCoupon = async (req, res) => {
    try {
        await couponModel.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "Succesfully deleted coupon" })
    } catch (error) {
        res.status(500).json({ success: false, message: "error in delting coupon" })
    }

}

//frontend
const getActiveCoupon = async (req, res) => {
    try {
        const coupon = await couponModel.findOne({ isActive: true })
        
        if (!coupon) {
           return res.json({ success: false, message: "no coupon found" })
        }

        res.status(200).json({ success: true, data:coupon })

    } catch (error) {
        res.json({ success: false, message: "Error in fetching coupon" })
    }
}

export { createCoupon, listCoupon, activate, remove, deleteCoupon, getActiveCoupon }