const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subscriber = require("./subscriber");

const UserSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true,
        required: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short!"],
      max: 99999,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  let user = this;
  try {
    if (!user.subscribedAccount) {
      user.subscribedAccount = await Subscriber.findOne({
        email: user.email,
      });
    }
  } catch (error) {
    console.log(`Error in connecting subscriber: ${error}`);
    throw error;
  }
});

UserSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.virtual("userNameLength").get(function () {
  return this.name.first.length + this.name.last.length;
});

module.exports = mongoose.model("User", UserSchema);
