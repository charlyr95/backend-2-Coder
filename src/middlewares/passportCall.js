import passport from "passport";

export const passportCall = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, { session: false }, (err, user, info) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: err.message || "Error interno del servidor",
      });

    if (!user)
      return res.status(401).json({
        status: "error",
        message: "No autorizado",
      });
    req.user = user;
    next();
  })(req, res, next);
};
