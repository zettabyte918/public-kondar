import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

export default function Header() {
  return (
    <div className="bg-sky-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-sky-800">
              <SpeakerphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">
                Centre de formation professionnelle
              </span>
              <span className="hidden md:inline">
                Des offres complètes de formations adaptées à tous les types
                d&apos;apprenants.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
