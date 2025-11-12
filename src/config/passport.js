// passport configuration file
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import UserDao from "../dao/user.dao.js";
import config from "./config.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["accessToken"];
  }
  return token;
};

export const InitializePassport = () => {
  // Local Strategy Register
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          // Campos obligatorios
          if (!email || !password) {
            return done(null, false, { message: "Faltan credenciales" });
          }

          // Verifica si el usuario ya existe
          const exists = await UserDao.getUserByEmail(email);
          if (exists) {
            return done(null, false, { message: "El usuario ya existe" });
          }

          // Obtener datos adicionales del body
          const { first_name, last_name, age, role, cart } = req.body;

          // Hashear la contraseña
          const hashedPassword = createHash(password);

          // Crear el usuario
          const user = await UserDao.createUser({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role,
            cart,
          });
          return done(null, user.toJSON());
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Local Strategy Login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await UserDao.getUserByEmail(email);
          if (!user)
            return done(null, false, { message: "Credenciales inválidas" });
          const isMatch = isValidPassword(user.password, password);
          if (!isMatch)
            return done(null, false, { message: "Credenciales inválidas" });
          done(null, user.toJSON());
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // JWT Strategy, "current" según Coderhouse
  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await UserDao.getUserById(jwtPayload.id);
          if (!user)
            return done(null, false, { message: "Credenciales inválidas" });
          done(null, user.toJSON());
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
