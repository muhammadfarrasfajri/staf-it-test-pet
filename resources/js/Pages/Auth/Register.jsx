import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Registrasi Akun - PT Properindo Enviro Tech" />

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

                {/* FORM REGISTER CARD */}
                <div className="w-full max-w-md mx-auto my-auto bg-white border border-gray-200 p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Pendaftaran Akun
                        </span>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-2">
                            Buat Akun Baru
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Daftarkan diri Anda untuk mengakses sistem internal
                            perusahaan.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Nama Lengkap"
                                className="!text-gray-700 text-xs font-semibold"
                            />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Nama Lengkap Anda"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2 text-xs text-red-600"
                            />
                        </div>

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
                                autoComplete="username"
                                placeholder="nama@properindo.com"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2 text-xs text-red-600"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Kata Sandi"
                                className="!text-gray-700 text-xs font-semibold"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                                autoComplete="new-password"
                                placeholder="••••••••"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2 text-xs text-red-600"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Kata Sandi"
                                className="!text-gray-700 text-xs font-semibold"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                                autoComplete="new-password"
                                placeholder="••••••••"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-xs text-red-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-sm disabled:opacity-50 mt-2"
                        >
                            {processing ? "Memproses..." : "Daftar Akun"}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-500">
                            Sudah memiliki akun terdaftar?{" "}
                            <Link
                                href={route("login")}
                                className="text-indigo-600 font-semibold hover:underline"
                            >
                                Masuk di sini
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
