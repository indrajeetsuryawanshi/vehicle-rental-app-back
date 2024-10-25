module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", 
    password: "post@123!",
    database: "vehicle-rental-app",
    synchronize: true,
    logging: false,
    entities: [
      "src/model/**/*.js"
    ],
  };
  