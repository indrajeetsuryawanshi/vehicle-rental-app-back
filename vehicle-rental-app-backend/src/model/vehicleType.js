const { EntitySchema } = require('typeorm');

const VehicleType = new EntitySchema({
  name: "VehicleType",
  tableName: "vehicle_types",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    type: {
      type: String,
      nullable: false
    },
    wheels: {  // New column for wheels
      type: Number,
      nullable: false // Assuming every vehicle type must have a wheel count
    }
  }
});

module.exports = VehicleType;
