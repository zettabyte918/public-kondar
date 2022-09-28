import { wishMessage } from "@utils/date";
import axios from "axios";

const saveCookie = async (response, addNotification) => {
  const {
    data: { jwt, user },
  } = response;

  await axios
    .post(`${process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL}/api/save-cookie`, {
      jwt,
      user,
    })
    .then(() => {
      addNotification(
        "SUCCESS",
        wishMessage(),
        `Bienvenue <b>${user.name_eleve}</b>`
      );
    })
    .catch(() => {
      addNotification(
        "DANGER",
        "Error",
        "Il y a une erreur de serveur, veuillez contacter l'administrateur"
      );
    });
};

const login = async (
  identifier,
  password,
  router,
  addNotification,
  setLogged
) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/experts-users/user`,
      {
        identifier: identifier.current.value,
        password: password.current.value,
      }
    )
    .then(async function (response) {
      //save user data to cookie
      await saveCookie(response, addNotification);
      setLogged((prev) => !prev);
      await router.push("/cours");
    })
    .catch(function (error) {
      addNotification(
        "DANGER",
        "Erreur de validation",
        "Identifiant ou mot de passe invalide"
      );
    });
};

export { saveCookie, login };
