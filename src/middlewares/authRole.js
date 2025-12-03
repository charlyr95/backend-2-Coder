const authRole = (...roles) => {
  return (req, res, next) => {
    // Verifica rol del usuario
    const user = req.user;

    // Asegura que el usuario esté logueado
    if (!user) return res.status(401).send("Usuario no logueado");

    // Verifica si el rol del usuario está entre los permitidos
    if (!roles.includes(user.role)) return res.status(403).send("No autorizado");
    
    next();
  };
};

export default authRole;
