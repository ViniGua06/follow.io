import axios from "axios";
import fs from "fs";

export default class UserHelper {
  uploadToPostImages = async (filePath: string) => {
    try {
      const image = fs.readFileSync(filePath).toString("base64");

      const res = await axios.post(
        "https://api.imgbb.com/1/upload",
        {
          key: "449d6ee8fa923fa67a8fddec6b6d01de",
          image: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Exibe os dados retornados pela API
      console.log(res.data);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    }
  };
}
