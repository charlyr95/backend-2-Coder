// passport configuration file
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import SessionService from "../service/session.service.js";
import userService from "../service/user.service.js";
import config from "./config.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["accessToken"];
  if (!token && req && req.headers) {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) token = authHeader.substring(7);
  }
  return token;
};

export const InitializePassport = () => {
  // Local Strategy Register
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
        try {
          const {email, password, first_name, last_name, age} = req.body;
          if (!email || !password) throw new Error("Faltan datos requeridos");
          const user = await SessionService.register({email, password, first_name, last_name, age});
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
        done(null, {...user, accessToken});
      } catch (error) {
        done(error, null);
      }
    })
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
          const user = await userService.getUserById(jwtPayload.id);
          if (!user) throw new Error ("Credenciales inválidas");
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};