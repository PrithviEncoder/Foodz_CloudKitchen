import mongoose, { Schema } from "mongoose"


const couponSchema = new Schema({

    name: { type: String, required: true },
    msg:{type:String ,required:true },
    type: { type: String, enum: ["percentage", "fixed"], required: true },
    condition:{type:Number, require:true},
    value: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: false },
    // expiry: { type: Date, default: () => Date.now() + (1 * 24 * 60 * 60 * 1000) }

}, { timestamps: true })

const couponModel = mongoose.models.coupon || mongoose.model("coupon", couponSchema)

export default couponModel