import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      // get jwt and user data from request
      const { jwt, user } = body;

      // save a cookie
      setCookie(
        "user",
        { jwt, user },
        { req, res, maxAge: 2592000, sameSite: true, httpOnly: true }
      );

      //send success response
      res.status(200).json({ message: "saved" });

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
