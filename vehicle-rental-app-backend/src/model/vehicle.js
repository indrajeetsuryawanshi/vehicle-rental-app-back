const { EntitySchema } = require('typeorm');
const VehicleType = require('./vehicleType');

const Vehicle = new EntitySchema({
  name: "Vehicle",
  tableName: "vehicles",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    model: {
      type: String,
      nullable: false
    },
    typeId: {
      type: Number,
      nullable: false
    }
  },
  relations: {
    type: {
      type: "many-to-one",
      target: "VehicleType",
      joinColumn: {
        name: "typeId",
        referencedColumnName: "id"
      }
    }
  }
});

module.exports = Vehicle;
