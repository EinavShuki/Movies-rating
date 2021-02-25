import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //   to avoid err
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongoDB connected:${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  //   try {
  //     const conn = await mongoose.connect(process.env.MONGO_URI, {
  //       //   to avoid err
  //       useUnifiedTopology: true,
  //       useNewUrlParser: true,
  //       useCreateIndex: true,
  //     });
  //     console.log(`mongoDB connected:${conn.connected.host}`);
  //   } catch (err) {
  //     console.log(`Error:${err.massege}`);
  //     process.exit(1);
  //   }
};
export default connectDB;
