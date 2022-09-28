import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "@components/Notification";
import { wishMessage } from "@utils/date";
import { useRouter } from "next/router";

export const AuthenticationContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { addNotification } = useNotification();

  const [status, setStatus] = useState("unauthenticated");
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState(null);
  const [logged, setLogged] = useState(false); // state hack force state update

  const logout = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL}/api/logout`)
      .then(async function (response) {
        //delete request user data to cookie
        addNotification(
          "SUCCESS",
          "La prochaine fois",
          "Au revoir et à bientôt"
        );
        router.push("/");
      })
      .catch(function (error) {
        addNotification(
          "DANGER",
          "Erreur de validation",
          "Identifiant ou mot de passe invalide"
        );
      });
  };

  const saveCookie = async (response) => {
    const {
      data: { jwt, user },
    } = response;

    await axios
      .post(`${process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL}/api/save-cookie`, {
        jwt,
        user,
      })
      .then(() => {})
      .catch(() => {
        addNotification(
          "DANGER",
          "Error",
          "Il y a une erreur de serveur, veuillez contacter l'administrateur"
        );
      });
  };

  const login = async (identifier, password) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/experts-users/user`,
        {
          identifier,
          password,
        }
      )
      .then(async function (response) {
        //save user data to cookie
        const { jwt, user, status } = response.data;

        await saveCookie(response);

        await axios
          .get(`${process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL}/api/check-payment`)
          .then(async ({ data }) => {
            if (data != "ok") {
              addNotification(
                "DANGER",
                "Paiement Requis",
                "Veuillez effectuer votre paiement pour accéder à votre compte"
              );
            } else {
              addNotification(
                "SUCCESS",
                wishMessage(),
                `Bienvenue <b>${user.name_eleve}</b>`
              );
              setUser(user);
              setStatus(status);
              setJwt(jwt);
              setLogged((prev) => !prev);
              await router.push("/cours");
            }
          });
      })
      .catch(function (error) {
        addNotification(
          "DANGER",
          "Erreur de validation",
          "Identifiant ou mot de passe invalide"
        );
      });
  };

  const checkPayment = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL}/api/check-payment`)
      .then(({ data }) => {
        if (data != "ok") {
          addNotification(
            "DANGER",
            "Paiement Requis",
            "Veuillez effectuer votre paiement pour accéder à votre compte"
          );
          router.push("/");
        }
      });
  };

  const getCurrentUser = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL}/api/me`)
      .then((response) => {
        const { jwt, user, status } = response.data;

        setUser(user);
        setStatus(status);
        setJwt(jwt);
      })
      .catch((error) => {
        const { status } = error.response.data;
        setStatus(status);
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, [logged]);

  return (
    <AuthenticationContext.Provider
      value={{ user, jwt, status, login, logout, checkPayment }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
