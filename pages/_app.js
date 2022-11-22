import { Dashboard } from "@components/layouts";
import { Notification, NotificationProvider } from "@components/Notification";
import Footer from "@components/ui/footer";
import { AuthProvider } from "@context/auth";
import { CoursProvider } from "@context/cours";
import Banner from "@components/banners/banner";
import { Fragment } from "react";
import "../styles/globals.css";

const layouts = {
  Dashboard,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component?.layout] || Fragment;
  return (
    <Fragment>
      <NotificationProvider>
        <AuthProvider>
          <Layout>
            <CoursProvider>
              <Notification />
              <Component {...pageProps} />
            </CoursProvider>
          </Layout>
        </AuthProvider>
      </NotificationProvider>
      <Footer />
      <Banner />
    </Fragment>
  );
}

export default MyApp;

// const hasCookie = (key, req) => {
//   return !!req.cookies.get(key);
// };

// var isClientSide = function () {
//   return typeof window !== "undefined";
// };

// import { getCookie } from "cookies-next";
// import App from "next/app";

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   if (!isClientSide()) {
//     const {
//       ctx: {
//         req: {
//           cookies: { user },
//         },
//       },
//     } = appContext;
//     return { ...appProps, user };
//   }
//   return {};
// };
