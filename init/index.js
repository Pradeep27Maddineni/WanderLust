const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/pradeep";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // ⚠️ IMPORTANT: Replace this with a valid user ID from your 'users' collection.
  // The 'owner' field requires a valid ObjectId from a user in your database.
  // You can find this ID in your MongoDB Compass or a similar tool.
  const validUserId = "689b9177547df385fff27a25"; // Example placeholder ID

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: validUserId, // Assign the valid user ID here
    geometry: obj.geometry || {
      type: "Point",
      coordinates: [0, 0],
    },
  }));

  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();