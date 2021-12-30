import { Router, Request, Response } from "express";

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });

})

router.post('/mensajes', ({body}: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: body.text
    });

})


router.get('/mensajes/:id', ({body, params}: Request, res: Response) => {

    res.json({
        ok: true,
        id: params?.id,
    });

})