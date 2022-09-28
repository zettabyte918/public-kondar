import { Authenticated, Unauthenticated } from "@utils/api/me";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // get jwt and user data from request
      const cookie = getCookie("user", { req, res });

      // if there is a user cookie the send it back to context api with success
      if (cookie) {
        res.status(200).json(Authenticated(cookie));
      } else {
        // return not found if there is no user cookie
        res.status(404).json(Unauthenticated());
      }
      break;
    default:
      //disallow unwanted request methode
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
