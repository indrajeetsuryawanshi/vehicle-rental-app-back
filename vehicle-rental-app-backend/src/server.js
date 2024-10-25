const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createConnection } = require('typeorm');
const ormConfig = require('./config/ormconfig');
const VehicleType = require('./model/vehicleType'); 
const Vehicle = require('./model/vehicle');
const route=require('./route/route.js')
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api',route)

const PORT = process.env.PORT || 5000;
const seedDatabase = async (connection) => {
    const existingVehicleTypes = await connection.getRepository(VehicleType).find();
    
    if (existingVehicleTypes.length === 0) {
      const vehicleTypes = [
        { type: 'Hatchback', wheels: 4 },
        { type: 'Sedan', wheels: 4 },
        { type: 'SUV', wheels: 4 },
        { type: 'Cruiser', wheels: 2 },
        { type: 'Motorbike', wheels: 2 },
      ];
  
      const savedTypes = await connection.getRepository(VehicleType).save(vehicleTypes);
  
      const vehicles = [
        { model: 'Toyota Yaris', typeId: savedTypes[0].id },
        { model: 'Honda Accord', typeId: savedTypes[1].id },
        { model: 'Ford Explorer', typeId: savedTypes[2].id },
        { model: 'Harley Davidson', typeId: savedTypes[3].id },
        { model: 'Kawasaki Ninja', typeId: savedTypes[4].id },
      ];
  
      await connection.getRepository(Vehicle).save(vehicles);
      console.log("Database seeded successfully!");
    } else {
      console.log("Database already seeded. Skipping seeding process.");
    }
  };
createConnection(ormConfig)
  .then(async (connection) => {
    await seedDatabase(connection);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error("Error connecting to the database:", error));
