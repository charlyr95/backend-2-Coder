export const userCart = (req, res, next) => {
    const reqCart = req.params.cid || null;
    if (!req.user) return res.status(401).json({ error: "Usuario no autenticado" });
    if (!req.user.role === "admin") next(); // Los admins pueden acceder a cualquier carrito
    if (!req.user.cart) return res.status(400).json({ error: "El usuario no tiene un carrito asignado" });
    if (!reqCart) return res.status(400).json({ error: "Cart ID es requerido en los parámetros" });
    if (reqCart !== req.user.cart) return res.status(403).json({ error: "Acceso denegado al carrito solicitado" });
    next();
}