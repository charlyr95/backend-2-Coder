const auth = (req, res, next) => {
  const { accessToken } = req.cookies;
  
  // Verifica si hay tokens
  if (!accessToken) {
    res.setHeader("Content-Type", "application/json");
    return res.status(401).send({ error: "No autorizado" });
  }

  // Verifica el token (simulado)
  if (accessToken !== "token-simulado") {
    res.setHeader("Content-Type", "application/json");
    return res.status(403).send({ error: "Token inválido" });
  }

  next();
};

export default auth;
