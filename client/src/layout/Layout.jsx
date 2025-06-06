import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex justify-center bg-yellow-500">
      <main className="w-full max-w-8xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
