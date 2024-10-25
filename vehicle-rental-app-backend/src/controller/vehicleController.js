const { getRepository } = require('typeorm');
const Vehicle = require('../model/vehicle');
const VehicleType = require('../model/vehicleType');
const Booking = require('../model/booking');




const getAllVehicles = async (req, res) => {
  try {
    const vehicleRepository = getRepository(Vehicle);
    const vehicles = await vehicleRepository.find(); 
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVehicleTypesByWheels = async (req, res) => {
    const { wheels } = req.params;
    try {
        const vehicleTypeRepository = getRepository(VehicleType);

        const vehicleTypes = await vehicleTypeRepository.find({ where: { wheels } });
        res.json(vehicleTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getVehiclesByType = async (req, res) => {
    const { typeId } = req.params;
    try {
        const vehicleRepository = getRepository(Vehicle);

        const vehicles = await vehicleRepository.find({ where: { typeId } });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const submitBooking = async (req, res) => {
    const { firstName,lastName, vehicleId, startDate, endDate } = req.body;
    const bookingRepository = getRepository(Booking);

    try {
        const existingBooking = await bookingRepository
            .createQueryBuilder("booking")
            .where("booking.vehicleId = :vehicleId", { vehicleId })
            .andWhere("booking.startDate <= :endDate", { endDate })
            .andWhere("booking.endDate >= :startDate", { startDate })
            .getOne();

        if (existingBooking) {
            return res.status(400).json({ message: "This vehicle is already booked for the selected dates" });
        }

        const newBooking = bookingRepository.create({  firstName,lastName, vehicleId, startDate, endDate });
        await bookingRepository.save(newBooking);

        return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAllVehicles,getVehicleTypesByWheels,getVehiclesByType,submitBooking };
