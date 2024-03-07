import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F112808%2Fuser&psig=AOvVaw0xP1h-fxa5ikTmgH957joe&ust=1709887658211000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJjRtYri4YQDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
