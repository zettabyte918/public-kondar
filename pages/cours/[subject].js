import Header from "@components/ui/header";
import Main from "@components/ui/main";
import { useCours } from "@context/cours";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";

const Subject = () => {
  const router = useRouter();
  const { subject } = router.query;
  const { attachments, getAllCours } = useCours();
  const [searchValue, setSearchValue] = useState("");

  const attachmentsFiltered = attachments.filter(
    (attachment) => attachment.subject.name == subject
  );

  const filteredAttachments = useCallback(
    (attachments, value) => {
      if (value == "" || !attachments) return attachments;
      return attachments.filter((attachment) =>
        attachment.title.toLowerCase().includes(value.toLowerCase())
      );
    },
    [searchValue]
  );

  useEffect(() => {
    getAllCours();
  }, []);
  if (subject) {
    return (
      <>
        <Header title={subject} description={""} />
        <Main>
          {attachmentsFiltered.length > 0 && (
            <SearchInput value={searchValue} set={setSearchValue} />
          )}

          {attachmentsFiltered.length > 0 ? (
            filteredAttachments(attachmentsFiltered, searchValue).map(
              (attachment, indexId) => (
                <Attachment
                  key={indexId}
                  attachment={attachment}
                  index={indexId}
                />
              )
            )
          ) : (
            <EmptyAttachmentsState />
          )}
        </Main>
      </>
    );
  }
  return null;
};

Subject.layout = "Dashboard";
export default Subject;

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PaperClipIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Attachment = ({ attachment, index }) => {
  return (
    <div className="mt-2 w-full first:mt-0 rounded-2xl bg-white p-2">
      <Disclosure defaultOpen={false}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-xl font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
              <span>{attachment.title}</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-indigo-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              {attachment.description}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Pièces jointes
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200"
                  >
                    {attachment.files.map((file, id) => (
                      <li
                        key={id}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {file.name}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <Link
                            href={`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${file.url}`}
                          >
                            <a
                              target="_blank"
                              className="font-medium py-1 px-2 rounded-md bg-indigo-500 text-gray-50 hover:bg-indigo-400"
                              rel="noopener noreferrer"
                            >
                              Ouvrir
                            </a>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

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
          placeholder="revision, cours..."
          aria-describedby="search-input"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        Mettre le nom du cours ou chapitre.
      </p>
    </div>
  );
});

SearchInput.displayName = "SearchInput";

/* This example requires Tailwind CSS v2.0+ */
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";

const EmptyAttachmentsState = () => {
  const router = useRouter();

  return (
    <div className="text-center">
      <InformationCircleIcon
        className="h-12 w-12 mx-auto text-gray-400"
        aria-hidden="true"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Contenu non disponible
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Merci de revenir plus tard pour plus de pièces jointes
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => router.push("/cours")}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Retourner au cours
        </button>
      </div>
    </div>
  );
};
