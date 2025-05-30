import fetch from "node-fetch";
import fs from "fs";

export default class UserHelper {
  uploadToPostImages = async () => {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "449d6ee8fa923fa67a8fddec6b6d01de",
        image: fs,
      }),
    });
  };
}
