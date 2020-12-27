import chalk from "chalk";
import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(chalk.bold.greenBright('Successfully connected to Database'));
  } catch (error) {
    console.error(error.message);
    process.exit(1)
  }
};

export default connectDB