export function requestLogger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
}

export function notFoundHandler(req, res) {
    res.status(404).json({ response: "Ruta no encontrada." });
}

export function errorHandler(err, req, res, next) {
    console.error("[Servidor] Error interno:", err);
    res.status(500).json({ response: err?.message || "Error interno del servidor." });
}
