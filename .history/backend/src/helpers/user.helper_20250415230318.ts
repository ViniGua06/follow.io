import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export default class UserHelper {
  uploadToPostImages = async (filePath: string) => {
    try {
      const form = new FormData();
      form.append("key", "d151ac8b574f0c8594e1047c03ad767d"); // Sua chave de API
      form.append("image", fs.createReadStream(filePath)); // Lê o arquivo diretamente

      // Enviar com o FormData
      const res = await axios.post("https://api.imgbb.com/1/upload", form, {
        headers: {
          ...form.getHeaders(), // Passa os headers corretos do FormData
        },
      });

      console.log("Resposta da API:", JSON.stringify(res.data, null, 2));
    } catch (error) {
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
