import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Selamat Datang - Properindo Enviro Tech" />

            <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
                {/* HEADER / NAVBAR */}
                <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-600 text-white font-black px-3 py-1.5 rounded-lg text-lg tracking-wider shadow-sm">
                            PET
                        </div>
                        <div>
                            <span className="font-bold text-lg tracking-wide block leading-tight text-gray-800">
                                Properindo Enviro Tech
                            </span>
                            <span className="text-xs text-emerald-600 font-medium">
                                Enterprise Resource & Task Management
                            </span>
                        </div>
                    </div>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm"
                            >
                                Masuk ke Dashboard
                            </Link>
                        ) : (
                            canLogin && (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={route("register")}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )
                        )}
                    </nav>
                </header>

                {/* HERO SECTION */}
                <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
                    <div className="space-y-6">
                        <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Sistem Internal PT PET
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
                            Optimalisasi Kinerja &{" "}
                            <span className="text-indigo-600">
                                Monitoring Operasional
                            </span>
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            Platform terpadu untuk pengelolaan data sumber daya
                            karyawan, pemantauan progress pekerjaan lintas
                            departemen, serta pelacakan audit sistem secara
                            transparan dan real-time.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-md flex items-center gap-2"
                                >
                                    <span>Buka Panel Utama</span>
                                    <span>&rarr;</span>
                                </Link>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-md flex items-center gap-2"
                                >
                                    <span>Mulai Masuk Sistem</span>
                                    <span>&rarr;</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* STATS / FEATURE CARD PREVIEW */}
                    <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 flex items-center justify-between">
                            <span>Fitur Utama Sistem</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-50 text-emerald-600 p-2.5 rounded-lg font-bold">
                                    👥
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">
                                        Manajemen Karyawan
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        Pencatatan data pegawai, filter
                                        departemen, status aktif/resign, dan
                                        export laporan CSV.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg font-bold">
                                    📋
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">
                                        Monitoring Pekerjaan
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        Pengawasan progres tugas, penentuan PIC,
                                        prioritas, serta notifikasi otomatis
                                        deadline.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg font-bold">
                                    📊
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">
                                        Audit Log & Histori
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        Perekaman rekam jejak aktivitas
                                        perubahan data secara transparan untuk
                                        keamanan sistem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* FOOTER */}
                <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>
                        &copy; {new Date().getFullYear()} PT Properindo Enviro
                        Tech. All rights reserved.
                    </p>
                    <p className="text-indigo-600 font-medium">
                        Internal Corporate System v1.0
                    </p>
                </footer>
            </div>
        </>
    );
}
