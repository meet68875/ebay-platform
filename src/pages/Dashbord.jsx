import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbUser, TbLogout2 } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../features/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const firstName = user?.firstName || user?.username?.split(" ")[0] || "";

  const handleLogout = () => dispatch(logout());

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4 xl:p-8 bg-lightColor-300 dark:bg-grayshade-300 min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-full xl:w-[280px] shrink-0">
        <div className="sticky top-6 bg-white dark:bg-grayshade-500 rounded-xl shadow-lg p-5 space-y-4">
          <ul className="space-y-2 text-base xl:text-lg font-medium">
            <li>
              <Link
                to="my-account"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-grayshade-400 transition"
              >
                <TbUser className="text-xl" />
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="my-orders"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-grayshade-400 transition"
              >
                <CiShoppingTag className="text-xl" />
                My Orders
              </Link>
            </li>
            <li>
              <hr className="border-t border-grayshade-200 dark:border-grayshade-400 my-2" />
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg hover:bg-zinc-200 dark:hover:bg-grayshade-400 transition"
              >
                <TbLogout2 className="text-xl" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full bg-white dark:bg-grayshade-500 rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-xl xl:text-2xl font-bold text-zinc-800 dark:text-white">
          Hello{" "}
          <span className="text-purpleshade-400">
            {firstName}
          </span>
        </h1>

        <div className="mt-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
