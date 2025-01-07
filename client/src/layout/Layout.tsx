import { Outlet } from "react-router-dom";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className="p-10">
      <h2 className="z-40">deo</h2>
      <main className="bb">
        <Outlet />
      </main>
    </div>
  );
}
