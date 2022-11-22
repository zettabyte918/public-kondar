/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from "@heroicons/react/outline";

const features = [
  {
    name: "Garderie:",
    description: [
      "Activités académiques.",
      "Activités culturelles",
      "Activités sportives",
    ],
  },
  {
    name: "Cours Particuliers:",
    description: [
      "Lettre",
      "Science",
      "Technique",
      "Economie et gestion",
      "Informatique",
    ],
  },
  {
    name: "Langue (32 h/ 250 dt):",
    description: ["Français", "Anglais", "Italien", "Espagnol", "Allemand"],
  },
  {
    name: "Formation en comptabilité:",
    description: ["Tous les chapitres"],
  },
  {
    name: "Formation Fiscalité:",
    description: ["Tous les chapitres"],
  },
  {
    name: "Formation Assistante de Direction:",
    description: ["Programme (8 mois)"],
  },
  {
    name: "Formation Agent Banciare et Assurance:",
    description: ["Programme (8 mois)"],
  },
  {
    name: "Formation Professionnelle:",
    description: [
      "Eléctronique - Electricité - Mécanique",
      "Menuiserie",
      "Climatisation &amp; Pompe à chaleur",
      "Plomberie",
    ],
  },
];

export default function Formation() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div>
          <h2 className="text-base font-semibold text-sky-600 uppercase tracking-wide">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">
            Centre tout-en-un
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Nos formations se reposent essentiellement sur la pratique et sont
            très qualifiantes à des métiers très sollicités au niveau des
            marchés de l&apos;emploi tunisiens et étrangers.
          </p>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-sky-500"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                {feature?.description?.map((desc, i) => (
                  <dd key={i} className="mt-2 ml-9 text-base text-gray-500">
                    {desc}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
