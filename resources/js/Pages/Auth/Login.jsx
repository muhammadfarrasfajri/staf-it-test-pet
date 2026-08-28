import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Masuk ke Sistem - PT Properindo Enviro Tech" />

            <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-between p-6 selection:bg-indigo-500 selection:text-white">
                {/* HEADER / LOGO */}
                <div className="w-full max-w-md mx-auto pt-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-emerald-600 text-white font-black px-2.5 py-1 rounded text-sm tracking-wider shadow-sm">
                            PET
                        </div>
                        <span className="font-bold text-sm tracking-wide text-gray-800 group-hover:text-indigo-600 transition">
                            Properindo Enviro Tech
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="text-xs text-gray-500 hover:text-gray-800 transition"
                    >
                        &larr; Kembali
                    </Link>
                </div>

                {/* FORM LOGIN CARD */}
                <div className="w-full max-w-md mx-auto my-auto bg-white border border-gray-200 p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Portal Masuk
                        </span>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-2">
                            Selamat Datang Kembali
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Masukkan kredensial Anda untuk mengakses dashboard.
                        </p>
                    </div>

                    {status && (
                        <div className="text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Alamat Email"
                                className="!text-gray-700 text-xs font-semibold"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                                placeholder="nama@properindo.com"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2 text-xs text-red-600"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <InputLabel
                                    htmlFor="password"
                                    value="Kata Sandi"
                                    className="!text-gray-700 text-xs font-semibold"
                                />
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-xs text-indigo-600 hover:text-indigo-500 transition"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2 text-xs text-red-600"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded shadow-sm"
                                />
                                <span className="ms-2 text-xs text-gray-600">
                                    Ingat saya
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-sm disabled:opacity-50 mt-2"
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-500">
                            Belum memiliki akun terdaftar?{" "}
                            <Link
                                href={route("register")}
                                className="text-indigo-600 font-semibold hover:underline"
                            >
                                Registrasi Akun
                            </Link>
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="w-full max-w-md mx-auto pb-2 text-center text-[11px] text-gray-500">
                    &copy; {new Date().getFullYear()} PT Properindo Enviro Tech.
                    All rights reserved.
                </div>
            </div>
        </>
    );
}
