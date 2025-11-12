import { Schema, model } from "mongoose";


const userCollection = "user";
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "El nombre debe tener al menos 1 carácter"],
      maxlength: [30, "El nombre no puede tener más de 30 caracteres"],
    },

    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "El apellido debe tener al menos 1 carácter"],
      maxlength: [30, "El apellido no puede tener más de 30 caracteres"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [100, "El email no puede tener más de 100 caracteres"],
    },

    age: {
      type: Number,
      min: [0, "La edad debe ser un número positivo"],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    cart: {
      type: Schema.Types.ObjectId,
      ref: "cart",
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("findOne", function () {
  this.populate("cart");
});

export const userModel = model(userCollection, userSchema);
