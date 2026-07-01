import { sendToGemini } from "../services/geminiService.js";

export const handleChat = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ response: "Mensaje inválido. Envía texto claro." });
        }

        const answer = await sendToGemini(message);
        return res.json({ response: answer });
    } catch (error) {
        next(error);
    }
};
