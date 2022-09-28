/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { navigation, userNavigation } from "./navigation";
import { classNames } from "@utils/commons";
import axios from "axios";
import { useNotification } from "@components/Notification";
import { useAuth } from "@hooks/auth";
import user from "../../../public/user.png";

const Dashboard = ({ children }) => {
  const { user: currentUser, status, logout } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-indigo-600 sticky top-0">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex flex-col">
                      <span className=" font-bold text-gray-200 text-xl">
                        KONDAR SCHOOL
                      </span>
                      <span className="font-semibold text-gray-300 text-xs">
                        Center de formation professionnel
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => {
                        let current = pathname.startsWith(item.href);
                        return (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                current
                                  ? "bg-indigo-700 text-white"
                                  : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm text-white focus:outline-none ring-2 ring-offset-2 ring-offset-indigo-600 ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.src}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <p className="py-3 px-3.5 truncate text-sm font-normal">
                            <span className="block mb-0.5 text-xs text-gray-500">
                              Connecté en tant que
                            </span>
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {currentUser.name_eleve}
                              </span>
                              <div>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                  {currentUser?.role?.name}
                                </span>
                              </div>
                            </div>
                          </p>
                          <div className="p-[1px] bg-gray-200"></div>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  onClick={() => logout()}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => {
                  let current = pathname.startsWith(item.href);
                  return (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          current
                            ? "bg-indigo-700 text-white"
                            : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  );
                })}
              </div>
              <div className="pt-4 pb-3 border-t border-indigo-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.src}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {currentUser.name_eleve}
                    </div>
                    <div className="text-sm font-medium text-indigo-300">
                      {currentUser?.role?.name}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      onClick={() => logout()}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {status === "authenticated" ? children : null}
    </div>
  );
};

export { Dashboard };
