/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import FadeInOut from "@components/transistions/fadeInOut";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

export default function Banner() {
  const [open, setOpen] = useState(false);

  return (
    <FadeInOut open={open} setOpen={setOpen}>
      <div className="fixed bottom-0 shadow-2xl z-40 inset-x-0 pb-2 sm:pb-5">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="p-2 rounded-lg bg-sky-600 shadow-2xl sm:p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-sky-800">
                  <SpeakerphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">
                    {" "}
                    Attestation de Formation homologuée par l&apos;Etat.
                  </span>
                  <span className="hidden md:inline">
                    À la fin de session, Attestation de Formation homologuée par
                    l&apos;Etat.
                  </span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-sky-50"
                >
                  Apprendre encore plus
                </a>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInOut>
  );
}
