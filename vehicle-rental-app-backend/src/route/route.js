const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/vehicleController');

router.get('/vehicle', vehicleController.getAllVehicles);
const bookingController = require('../controller/bookingController');
router.get('/vehicle-types/wheels/:wheels', vehicleController.getVehicleTypesByWheels);
router.get('/vehicles/:typeId', vehicleController.getVehiclesByType);

router.post('/book', vehicleController.submitBooking);



module.exports = router;
