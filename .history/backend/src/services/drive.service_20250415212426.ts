import fs from "fs";
import { google } from "googleapis";

export default class DriveServices {
  private readonly KEYFILEPATH = "./neon-operator-434718-a8-3a48e7246514.json";
  private readonly SCOPES = ["https://www.googleapis.com/auth/drive.file"];
  private uploadFile = async () => {};
}
