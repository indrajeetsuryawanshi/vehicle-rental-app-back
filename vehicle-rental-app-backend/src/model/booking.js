const { EntitySchema } = require('typeorm');

const Booking = new EntitySchema({
  name: "Booking",
  tableName: "bookings",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    firstName: {
      type: String,
      nullable: false
    },
    lastName: {
        type: String,
        nullable: false
      },
    vehicleId: {
      type: Number,
      nullable: false
    },
    startDate: {
      type: "date",
      nullable: false
    },
    endDate: {
      type: "date",
      nullable: false
    }
  }
});

module.exports = Booking;
