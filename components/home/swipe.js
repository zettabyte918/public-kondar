export default function Swipe() {
  return (
    <div className="not-prose relative bg-gray-50 rounded-xl overflow-hidden">
      <div
        className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
        aria-hidden="true"
      >
        <div className="relative h-full max-w-full mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>
      <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center pt-24 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-6xl">
          Programmes et Formations
        </h1>
        <p className="mt-4 text-xl text-gray-900">
          Les Programmes de formation pré-universitaire durant 2 ans ou 4
          sessions. Ils préparent l&apos;étudiant à poursuivre un cheminement
          universitaire, ou vers l&apos;emploi.
        </p>
        <a
          href="#"
          className="mt-8 inline-block bg-sky-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-50 hover:bg-sky-700"
        >
          Un large choix de programmes
        </a>
      </div>
      <div className="relative rounded-xl pt-20 mb-6 overflow-auto">
        <div className="relative w-full flex gap-6 snap-x overflow-x-auto pb-14">
          <div className="snap-center shrink-0">
            <div className="shrink-0 w-4 sm:w-48"></div>
          </div>
          <div className="snap-center shrink-0 first:pl-8 last:pr-8">
            <img
              className="shrink-0 h-48 lg:h-80  rounded-lg shadow-xl bg-white"
              src="https://selectra.info/sites/selectra.info/files/styles/article_hero/public/images/reparation-confinement.png?itok=Xbc3C6z3"
            />
          </div>
          <div className="snap-center shrink-0 first:pl-8 last:pr-8">
            <img
              className="shrink-0 h-48 lg:h-80 rounded-lg shadow-xl bg-white"
              src="https://www.bazaaretcompagnie.com/wp-content/uploads/86503c8ffb6dd0f472b3b4476d7c8379-1-660x330.jpe"
            />
          </div>
          <div className="snap-center shrink-0 first:pl-8 last:pr-8">
            <img
              className="shrink-0 h-48 lg:h-80 rounded-lg shadow-xl bg-white"
              src="https://www.technicity.brussels/wp-content/uploads/2019/10/P1110197_web.jpg"
            />
          </div>
          <div className="snap-center shrink-0 first:pl-8 last:pr-8">
            <img
              className="shrink-0 h-48 lg:h-80 rounded-lg shadow-xl bg-white"
              src="https://www.intac-edu.com/wp-content/uploads/2020/07/technicien-en-maintenance-de-microsystemes-informatiques.jpg"
            />
          </div>
          <div className="snap-center shrink-0 first:pl-8 last:pr-8">
            <img
              className="shrink-0 h-48 lg:h-80 rounded-lg shadow-xl bg-white"
              src="https://www.usinenouvelle.com/expo/img/maintenance-electronique-de-machines-et-equipements-industriels-000177962-product_zoom.jpg"
            />
          </div>
          <div className="snap-center shrink-0 first:pl-8 last:pr-8">
            <img
              className="shrink-0 h-48 lg:h-80 rounded-lg shadow-xl bg-white"
              src="https://www.deco.fr/sites/default/files/styles/article_970x500/public/2020-07/shutterstock_180735233.jpg?itok=fWvw93vV"
            />
          </div>
          <div className="snap-center shrink-0">
            <div className="shrink-0 w-4 sm:w-48"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
    </div>
  );
}
