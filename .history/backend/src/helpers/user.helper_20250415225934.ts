import axios from "axios";
import fs from "fs";

export default class UserHelper {
  uploadToPostImages = async (filePath: string) => {
    try {
      // Lê o arquivo e converte para base64
      const image = fs.readFileSync(filePath).toString("base64");

      // Verifique se a imagem foi convertida corretamente
      if (!image) {
        throw new Error("Falha ao converter a imagem para base64.");
      }

      // Realiza a requisição para a API
      const res = await axios.post(
        "https://api.imgbb.com/1/upload",
        {
          key: "d151ac8b574f0c8594e1047c03ad767d", // Sua chave de API
          image: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Exibe a resposta JSON da API
      console.log("Resposta da API:", JSON.stringify(res.data, null, 2));

      // Verifica se houve sucesso
      if (res.data.status_code === 200) {
        console.log("Imagem carregada com sucesso!");
      } else {
        console.error("Erro ao carregar imagem:", res.data);
      }
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
