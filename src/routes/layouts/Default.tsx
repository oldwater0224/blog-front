import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function Default() {
  return (
    <>
    <ScrollRestoration /> 
    {/* 스크롤 제어(상단 컴포넌트) */}
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
