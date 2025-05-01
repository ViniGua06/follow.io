import axios from "axios";
import fs from "fs";

export default class UserHelper {
  uploadToPostImages = async (filePath: string) => {
    try {
      const image = fs.readFileSync(filePath).toString("base64"); // Lê o arquivo e converte para base64

      const res = await axios.post(
        "https://api.imgbb.com/1/upload",
        {
          key: "449d6ee8fa923fa67a8fddec6b6d01de", // Sua chave de API
          image: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Exibe apenas o JSON da resposta
      console.log("Resposta da API:", JSON.stringify(res.data, null, 2));
    } catch (error) {
      // Se a requisição falhar, exibe os detalhes do erro
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro da requisição:",
          error.response?.data || error.message
        );
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  };
}
