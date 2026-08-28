import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-gray-900">
                    Informasi Profil
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Perbarui nama akun dan alamat email Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nama Lengkap"
                        className="text-xs font-semibold text-gray-700"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError
                        className="mt-2 text-xs text-red-600"
                        message={errors.name}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Alamat Email"
                        className="text-xs font-semibold text-gray-700"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError
                        className="mt-2 text-xs text-red-600"
                        message={errors.email}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-xs text-gray-700">
                            Alamat email Anda belum terverifikasi.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-xs text-indigo-600 underline hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Klik di sini untuk mengirim ulang email
                                verifikasi.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-xs font-medium text-indigo-600 bg-indigo-50 p-2.5 rounded-lg border border-indigo-200">
                                Tautan verifikasi baru telah dikirim ke alamat
                                email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
                    >
                        Simpan
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-medium text-emerald-600">
                            ✓ Berhasil disimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
