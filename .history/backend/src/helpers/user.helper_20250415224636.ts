import fetch from "node-fetch";

export default class UserHelper {
  uploadToPostImages = async () => {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
