import mongoose from "mongoose";

const Users = mongoose.model("users", new mongoose.Schema({}));

export default Users;