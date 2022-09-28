import { Authenticated, Unauthenticated } from "@utils/api/me";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      // get jwt and user data from request
      const { jwt } = body;
      const cookie = getCookie("user", { req, res });
      if (!cookie) res.status(200).json("ko");

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${JSON.parse(cookie).jwt}`,
        },
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/last-payment`,
        { ...config }
      );

      if (response?.data == "ko") {
        deleteCookie("user", { req, res });
      }

      // if there is a user cookie the send it back to context api with success
      res.status(200).json(response?.data);

      break;
    default:
      //disallow unwanted request methode
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
