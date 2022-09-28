import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "@components/Notification";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/auth";

export const CoursContext = createContext();

export const CoursProvider = ({ children }) => {
  const { jwt } = useAuth();
  const router = useRouter();
  const { addNotification } = useNotification();
  const [cours, setCours] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
  };

  const getAllCours = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/attachments`,
        { ...config }
      )
      .then((response) => {
        const { attachments, cours } = response.data;
        setAttachments(attachments);
        setCours(cours);
      })
      .catch((error) =>
        addNotification("DANGER", "Error cours", "error cours")
      );
  };

  useEffect(() => {
    if (cours.length == 0 && jwt) getAllCours();
  }, [cours, jwt]);

  return (
    <CoursContext.Provider value={{ cours, attachments, getAllCours }}>
      {children}
    </CoursContext.Provider>
  );
};

function useCours() {
  return useContext(CoursContext);
}

export { useCours };
