const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    contactNumber:{
        type: Number,
        required: true
    }
}, { timestamps: true });


const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;