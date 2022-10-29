import Cta from "@components/home/cta";
import Feature from "@components/home/feautre";
import Header from "@components/home/header";
import Hero from "@components/home/hero";
import NewsLater from "@components/home/newslater";
import Swipe from "@components/home/swipe";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Cta />
      <Feature />
      <Swipe />
      <NewsLater />
    </>
  );
}
