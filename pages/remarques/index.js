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

const Remarques = () => {
  return (
    <>
      <Head>
        <title>Remarques</title>
      </Head>
      <Header
        title="Remarques"
        description="Tous les remarques de l'administration et des enseignants du centre."
      />
      <Main>
        <RemarquesTable />
      </Main>
    </>
  );
};

function RemarquesTable() {
  const [remarques, setRemarques] = useState([]);
  const [remarque, setRemarque] = useState([]);
  const { jwt, checkPayment } = useAuth();
  const [openRemarque, setOpenRemarque] = useState(false);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
  };

  const openModal = (text) => {
    setRemarque(text);
    setOpenRemarque(true);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/remarques/me`,
        { ...config }
      )
      .then((response) => setRemarques(response.data));
  }, []);

  useEffect(() => {
    checkPayment();
  }, []);

  return (
    <>
      <Modal open={openRemarque} setOpen={setOpenRemarque} text={remarque} />
      {remarques.length > 0 && (
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
                        Remarque
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date et l&apos;heure
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Afficher
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {remarques.map((remarque, id) => (
                      <tr key={id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {remarque?.remarque?.slice(0, 15)}...
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(remarque?.createdAt)?.toLocaleDateString(
                            "fr-FR",
                            options
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            type="button"
                            onClick={() => openModal(remarque?.remarque)}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            Lire cette remarque
                          </button>
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

Remarques.layout = "Dashboard";
export default Remarques;

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function Modal({ text, open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {text}
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
