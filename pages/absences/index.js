import Header from "@components/ui/header";
import Main from "@components/ui/main";
import { useAuth } from "@hooks/auth";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const Absences = () => {
  const { user, status } = useAuth();
  return (
    <>
      <Head>
        <title>Absences</title>
      </Head>
      <Header title="Absences" description="Toutes les absences que tu fais." />

      <Main>
        <AbsentsTable />
      </Main>
    </>
  );
};

Absences.layout = "Dashboard";
export default Absences;

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

function AbsentsTable() {
  const [absents, setAbsents] = useState([]);
  const { jwt, checkPayment } = useAuth();

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/absents/me`,
        { ...config }
      )
      .then((response) => setAbsents(response.data));
  }, []);

  useEffect(() => {
    checkPayment();
  }, []);

  return (
    <>
      {absents.length > 0 && (
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Matière
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date et l&apos;heure
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {absents.map((absent, id) => (
                      <tr key={id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {absent?.student?.name_eleve}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {absent?.subject?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(absent?.date)?.toLocaleDateString(
                            "fr-FR",
                            options
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// import { getCookie } from "cookies-next";
// export async function getServerSideProps({ req, res }) {
//   const user = getCookie("user", { res, req });
//   return {
//     props: {
//       user,
//     }, // Will be passed to the page component as props
//   };
// }
