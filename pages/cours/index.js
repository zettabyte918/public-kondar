import Header from "@components/ui/header";
import Main from "@components/ui/main";
import Head from "next/head";
import { useCours } from "@context/cours";
import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@hooks/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const countFiles = (attachments, cours) => {
  const attachmentsBysubjects = attachments.filter(
    (attachment) => attachment.subject.name == cours.name
  );

  if (attachmentsBysubjects.length == 0) {
    return 0;
  } else {
    const filesCountPerAttachments = [];
    attachmentsBysubjects.map(({ files }) => {
      if (files) {
        filesCountPerAttachments.push(files.length);
      }
    });

    return filesCountPerAttachments.reduce((a, b) => a + b, 0);
  }
};

// to edit
function randomColor(name) {
  const colors = {
    Mathèmatique: "bg-indigo-600",
    Physique: "bg-blue-500",
    chimie: "bg-violet-600",
    "Sciences SVT": "bg-violet-500",
    Informatique: "bg-blue-700",
    Technologie: "bg-indigo-300",
    Histoire: "bg-violet-800",
    Géographie: "bg-violet-800",
    Économie: "bg-indigo-500",
    Gestion: "bg-indigo-500",
    Philosopie: "bg-indigo-300",
    "Pensée Islamique": "bg-blue-700",
    Arabe: "bg-blue-700",
    Anglais: "bg-violet-400",
    Francais: "bg-indigo-600",
    Espagnol: "bg-indigo-700",
    Allemand: "bg-indigo-400",
    Italien: "bg-indigo-600",
  };

  return colors[name];
}

const Cours = () => {
  const { cours, attachments } = useCours();
  const { checkPayment } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const filteredCours = useCallback(
    (cours, value) => {
      if (value == "" || !cours) return cours;
      return cours.filter((cour) =>
        cour.name.toLowerCase().includes(value.toLowerCase())
      );
    },
    [searchValue]
  );

  useEffect(() => {
    checkPayment();
  }, []);

  return (
    <>
      <Head>
        <title>Cours</title>
      </Head>
      <Header
        title="Cours"
        description="Tous les cours auxquels vous êtes abonné."
      />

      <Main>
        <div>
          <SearchInput value={searchValue} set={setSearchValue} />
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredCours(cours, searchValue).map((cours) => (
              <CoursLabels
                key={cours?.name}
                allCours={cours}
                currentCours={cours}
                attachments={attachments}
              />
            ))}
          </ul>
        </div>
      </Main>
    </>
  );
};

Cours.layout = "Dashboard";
export default Cours;

const SearchInput = memo(({ value, set }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Recherche rapide
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="search"
          value={value}
          onChange={(e) => set(e.target.value)}
          id="search-input"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:w-1/5  sm:text-sm border-gray-300 rounded-md"
          placeholder="math, physique..."
          aria-describedby="email-description"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        Mettre le nom du matière.
      </p>
    </div>
  );
});

SearchInput.displayName = "SearchInput";

const CoursLabels = memo(({ allCours, currentCours, attachments }) => {
  let bgColor = randomColor(currentCours.name);
  return (
    <li className="col-span-1 flex shadow-sm rounded-md">
      <div
        className={classNames(
          bgColor,
          "flex-shrink-0 flex items-center justify-center p-7 w-16 text-white text-sm font-medium rounded-l-md"
        )}
      >
        {currentCours.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <a href="" className="text-gray-900 font-medium hover:text-gray-600">
            {currentCours?.name}
          </a>
          <p className="text-gray-500">
            {countFiles(attachments, allCours)} Pièces jointes
          </p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <Link href={`/cours/${currentCours.name}`}>
            <a
              type="button"
              className={classNames(
                bgColor,
                "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-50 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
              )}
            >
              Ouvrir
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
});

CoursLabels.displayName = "CoursLabels";
