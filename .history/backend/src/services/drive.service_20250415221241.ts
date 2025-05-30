import fs from "fs";
import { google } from "googleapis";
import BadRequestError from "../models/errors/badRequest.error";

export default class DriveServices {
  private readonly KEYFILEPATH = "./neon-operator-434718-a8-3a48e7246514.json";
  private readonly SCOPES = ["https://www.googleapis.com/auth/drive.file"];

  private auth = new google.auth.GoogleAuth({
    keyFile: this.KEYFILEPATH,
    scopes: this.SCOPES,
  });

  private uploadFile = async (driveName: string) => {
    const driveService = google.drive({ version: "v3", auth: this.auth });

    const fileMetaData = {
      name: `${driveName}.jpg`,
    };

    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream("./src/uploads/" + driveName),
    };

    try {
      const file = await driveService.files.create({
        requestBody: fileMetaData,
        media: media,
        fields: "id, webViewLink, webContentLink",
      });

      console.log("Arquivo criado", file.data.id);

      fs.unlink("./src/uploads/" + driveName, () => {
        console.log("EXLUIDO");
      });
    } catch (error) {
      throw error;
    }
  };

  public seeIfAlreadyIn = async (fileName: string): Promise<void> => {
    const driveService = google.drive({ version: "v3", auth: this.auth });

    try {
      const res = await driveService.files.list({
        q: `name = '${fileName}' and trashed = false`,
        fields: "files(id, name, mimeType, webViewLink)",
        spaces: "drive",
      });

      const files = res.data.files;

      console.log("Files que buscou:", files);

      if (files.length != 0) {
        for (const file of files) {
          console.log("esse file", file);
          await driveService.files.delete({
            fileId: file.id,
          });
        }
      }

      const todos = await driveService.files.list();

      await this.uploadFile(fileName);
    } catch (error) {
      throw error;
    }
  };
}
