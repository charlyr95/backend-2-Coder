// passport configuration file
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import SessionService from "../service/session.service.js";
import config from "./config.js";

// const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies["accessToken"];
//   }
//   return token;
// };

export const InitializePassport = () => {
  // Local Strategy Register
  // TODO: completar el register strategy
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
        try {
          const {email, password} = req.body;
          if (!email || !password) throw new Error("Email y contraseña son requeridos");
          console.log("Registering user:", email);
          const user = await SessionService.register(req.body);
          if (!user) throw new Error("Error al registrar el usuario");
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  // Local Strategy Login
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const {user, accessToken} = await SessionService.login(email, password);
        if (!user) throw new Error("Credenciales inválidas");
        done(null, user, accessToken);
      } catch (error) {
        done(error, null);
      }
    })
  );

  // JWT Strategy, "current" según Coderhouse
  // passport.use(
  //   "current",
  //   new JwtStrategy(
  //     {
  //       jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  //       secretOrKey: config.JWT_SECRET,
  //     },
  //     async (jwtPayload, done) => {
  //       try {
  //         const user = await UserDao.getUserById(jwtPayload.id);
  //         if (!user)
  //           return done(null, false, { message: "Credenciales inválidas" });
  //         done(null, user.toJSON());
  //       } catch (error) {
  //         return done(error, false);
  //       }
  //     }
  //   )
  // );
};
