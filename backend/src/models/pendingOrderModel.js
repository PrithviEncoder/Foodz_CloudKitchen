import mongoose from "mongoose";

const pendingOrderSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    items: { type: Array, required: true },
    address: { type: Object, required: true },
    securityKey: { type: String, required: true }

}, { timestamps: true })

const pendingOrderModel = mongoose.models.pendingOrder || mongoose.model("pendingOrder", pendingOrderSchema);

export default pendingOrderModel;