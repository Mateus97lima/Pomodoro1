import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { NotFood } from "../../pages/NotFood";
import { Home } from "../../pages/Home";
import { History } from "../../components/History";
import { Setting } from "../../pages/Setting";

function ScroolLoop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export function MainRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/History/" element={<History />} />
        <Route path="/Settings/" element={<Setting />} />
        <Route path="/About-Pomodoro" element={<AboutPomodoro />} />
        <Route path="*" element={<NotFood />} />
      </Routes>
      <ScroolLoop />
    </BrowserRouter>
  );
}
