import Footer from "./Footer";
import NavBar from "./NavBar";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center min-h-screen dark:bg-slate-600 text-[#322744] dark:text-white relative">
      <NavBar />
      <main className="flex flex-col md:flex-row h-fit mb-10 px-3 2xl:px-6 py-10 justify-center w-full lg:max-w-[1200px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
