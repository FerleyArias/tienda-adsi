import mongoose from "mongoose";

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNX, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Base de datos online");
  } catch (error) {
    throw new Error("Error al iniciar la BD");
  }
};

export default mongoConnection;
