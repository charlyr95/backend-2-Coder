// passport configuration file
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import bcrypt from "bcryptjs";

// ---------------------------
// TODO: Continuar
// ---------------------------

// Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (!user) return done(null, false, { message: "Usuario no encontrado" });
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return done(null, false, { message: "Contraseña incorrecta" });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// JWT Strategy
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await userModel.findById(jwtPayload.id);
        if (!user) return done(null, false, { message: "Usuario no encontrado" });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;