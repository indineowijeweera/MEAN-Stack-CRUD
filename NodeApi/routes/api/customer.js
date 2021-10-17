var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator/check");
require("dotenv").config()
const Customer = require("../../models/Customer");


router.get("/:pageSize?:pageNo?", async (req, res) => {
    try {
        let limit = req.query.pageSize || 20;
        let start = req.query.pageNo || 0;

        if (limit == 'all') {
          start = 0;
        } else {
          start = (start - 1) * limit;
        }

        limit = parseInt(limit)
        start = parseInt(start) 

        let customers = await Customer.find()
            .sort("-order_by")
            .skip(start)
            .limit(limit);

        let customersCount = await Customer.find().count();

        let customersResult ={
            "customers":customers,
            "customersCount":customersCount
        }
        res.send(customersResult);
    } catch (e) {
        res.status(422).send(e.message);
    }
});


router.delete("/:id?", async (req, res) => {
    let id = req.query.id
    try {
        await Customer.deleteOne({ "_id": id })

        res.status(200).send({ status: "success"});
    } catch (e) {
        res.status(400).send({ status: "Failed", message: e.message })
    }
})


router.get("/getCustomerDetailsById:id?", async (req, res) => {
    let id = req.query.id;
    try {
        let customer = await Customer.findById(id);

        res.send(customer);
    } catch (e) {
        res.status(422).send(e.message);
    }
});

router.post("/add", [
    check("customerName")
    .exists()
    .not()
    .isEmpty(),
    check("description")
    .exists()
    .not()
    .isEmpty(),
    check("address")
    .exists()
    .not()
    .isEmpty(),
    check("city")
    .exists()
    .not()
    .isEmpty(),
    check("contactNumber")
    .exists()
    .not()
    .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ success: false, data: null, error: errors.array() });
    }
    try {
        let customerName = req.body.customerName;
        let description = req.body.description;
        let address = req.body.address;
        let city = req.body.city;
        let contactNumber = req.body.contactNumber;

        let customerData = {
            customerName: customerName,
            description: description,
            address:address,
            city: city,
            contactNumber:contactNumber
        };

        let customer = await Customer(customerData).save()
        res.send(customer)
    } catch (e) {
        res.status(422).send(e.message)
    }
})

router.put("/update", [
    check("id")
        .exists()
        .not()
        .isEmpty()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ success: false, data: null, error: errors.array() });
    }
    try {
        let customerName = req.body.customerName;
        let description = req.body.description;
        let address = req.body.address;
        let city = req.body.city;
        let contactNumber = req.body.contactNumber;

        let customerData = {
            customerName: customerName,
            description: description,
            address:address,
            city: city,
            contactNumber:contactNumber
        };

        let customer = await Customer.findByIdAndUpdate(req.body.id, customerData, { new: true })
        res.send(customer)

    } catch (e) {
        res.status(422).send(e.message)
    }
})

module.exports = router;
