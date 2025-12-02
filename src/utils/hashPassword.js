import bcrypt from "bcrypt";

// Crea hash de la contraseña
export const createHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Valida contraseña contra hash
export const isValidPassword = (EncriptedPassword, password) => {
  return bcrypt.compareSync(password, EncriptedPassword);
};
