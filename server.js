import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({
            response: "No se recibió ningún mensaje."
        });
    }

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("Respuesta completa de Gemini:");
console.log(JSON.stringify(data, null, 2));

        if (data.candidates?.length > 0) {

            res.json({
                response: data.candidates[0].content.parts[0].text
            });

        } else {

            console.log(data);

            res.status(500).json({
                response: "Gemini no devolvió ninguna respuesta."
            });

        }

    } catch (error) {

        console.error(error);

        res.status(500).json({
            response: "Error al conectar con Gemini."
        });

    }

});

app.listen(PORT, () => {

    console.log("");
    console.log("=================================");
    console.log("Servidor iniciado correctamente");
    console.log(`http://localhost:${PORT}`);
    console.log("=================================");
    console.log("");

});