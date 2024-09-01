import { NextFunction, Request, Response } from "express";

export function loggerGlobal (req: Request, res: Response, next: NextFunction)  {
    const currentDateTime = new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    console.log(`Método: ${req.method} Ruta: ${req.url} Fecha y Hora: ${currentDateTime}`);
    next();
}