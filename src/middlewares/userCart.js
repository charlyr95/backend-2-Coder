export const userCart = (req, res, next) => {
    const reqCart = req.params.cid || null;
    if (!req.user) return res.status(401).json({ error: "Usuario no autenticado" });
    const isAdmin = req.user.role === "admin";
    if (isAdmin) return next(); // Los administradores tienen acceso completo
    if (!req.user.cart) return res.status(400).json({ error: "El usuario no tiene un carrito asignado" });
    if (!reqCart) return res.status(400).json({ error: "Cart ID es requerido en los parámetros" });
    if (reqCart !== req.user.cart && reqCart !== req.user.cart.toString() ) return res.status(403).json({ error: "Acceso denegado al carrito solicitado" });
    next();
}