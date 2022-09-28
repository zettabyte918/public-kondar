import { useNotification } from "@components/Notification";
import Image from "next/image";
import { useCallback, useRef } from "react";
import Logo from "../../public/logo.png";
import background from "../../public/background.png";
import { useRouter } from "next/router";
import { login } from "@components/auth/helper";
import Head from "next/head";
import { useAuth } from "@hooks/auth";

export default function Login() {
  const { addNotification } = useNotification();
  const { login, status } = useAuth();
  const router = useRouter();

  const identifier = useRef();
  const password = useRef();

  const handelLogin = useCallback(async () => {
    login(identifier.current.value, password.current.value);
  }, [identifier, password]);

  return (
    <>
      <Head>
        <title>Connexion | KONDAR SCHOOL</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="flex-1 flex bg-gray-50 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="flex">
                <Image
                  className="mx-auto"
                  alt="Les Experts Center"
                  src={Logo}
                  placeholder="blur"
                  objectFit="cover"
                  height={55}
                  width={55}
                  quality={100}
                />
                <div className="ml-2 my-auto">
                  <div className="flex flex-col">
                    <span className="font-bold text-sky-500 text-xl">
                      KONDAR SCHOOL
                    </span>
                    <span className="font-semibold text-amber-500 text-xs">
                      Center de formation professionnel
                    </span>
                  </div>
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                Connectez-vous à votre compte
              </h2>
            </div>

            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adresse e-mail ou identifiant
                  </label>
                  <div className="mt-1">
                    <input
                      id="identifier"
                      name="identifier"
                      ref={identifier}
                      type="text"
                      placeholder="identifiant"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      ref={password}
                      type="password"
                      placeholder="Mot de passe"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      disabled
                      checked
                      type="checkbox"
                      className="h-4 w-4 text-indigo-300 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Mot de passe oublié?
                    </a>
                  </div>
                </div> */}

                <div>
                  <button
                    type="button"
                    onClick={handelLogin}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <Image
            alt="Les Experts Center"
            src={background}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </>
  );
}
