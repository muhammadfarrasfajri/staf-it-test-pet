import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                >
                                    <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("employees.index")}
                                    active={route().current("employees.*")}
                                >
                                    Data Karyawan
                                </NavLink>
                                <NavLink
                                    href={route("tasks.index")}
                                    active={route().current("tasks.*")}
                                >
                                    Monitoring Pekerjaan
                                </NavLink>
                                <NavLink
                                    href={route("logs.index")}
                                    active={route().current("logs.index")}
                                >
                                    Histori Aktivitas
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {/* TOMBOL LONCENG NOTIFIKASI */}
                            <div className="relative mr-4 flex items-center group">
                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none relative p-1.5 rounded-full hover:bg-gray-100 transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>

                                    {/* Badge jumlah notifikasi */}
                                    {auth.unreadNotifications?.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow">
                                            {auth.unreadNotifications.length}
                                        </span>
                                    )}
                                </button>

                                {/* Dropdown isi notifikasi */}
                                {auth.unreadNotifications?.length > 0 && (
                                    <div className="absolute right-0 top-10 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 hidden group-hover:block">
                                        <div className="px-4 py-2 border-b border-gray-100 font-bold text-xs text-gray-700 uppercase tracking-wider">
                                            Notifikasi Sistem
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {auth.unreadNotifications.map(
                                                (notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition"
                                                    >
                                                        <p className="text-xs font-bold text-red-600">
                                                            {notif.data.title}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-0.5">
                                                            {notif.data.message}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none shadow-sm"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profil Akun
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Keluar (Log Out)
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("employees.index")}
                            active={route().current("employees.*")}
                        >
                            Data Karyawan
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("tasks.index")}
                            active={route().current("tasks.*")}
                        >
                            Monitoring Pekerjaan
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("logs.index")}
                            active={route().current("logs.index")}
                        >
                            Histori Aktivitas
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profil Akun
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Keluar (Log Out)
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}
            <main>
                {/* Banner Flash Message Sukses */}
                {flash.message && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                        <div
                            className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-3 rounded-xl relative shadow-sm"
                            role="alert"
                        >
                            <span className="block sm:inline font-bold">
                                Berhasil!{" "}
                            </span>
                            <span className="block sm:inline">
                                {flash.message}
                            </span>
                        </div>
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
