import { deleteCookie, hasCookie } from "cookies-next";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      // delete cookie
      if (hasCookie("user", { req, res })) {
        deleteCookie("user", { req, res });
        res.status(200).json({ message: "success" });
      } else {
        res.status(404).json({ message: "error" });
      }

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
