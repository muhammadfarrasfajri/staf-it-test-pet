import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-gray-900">
                    Perbarui Kata Sandi
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan
                    acak untuk menjaga keamanan.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-5">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Kata Sandi Saat Ini"
                        className="text-xs font-semibold text-gray-700"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2 text-xs text-red-600"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Kata Sandi Baru"
                        className="text-xs font-semibold text-gray-700"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2 text-xs text-red-600"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi Baru"
                        className="text-xs font-semibold text-gray-700"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-xs text-red-600"
                    />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
                    >
                        Simpan Sandi
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-medium text-emerald-600">
                            ✓ Sandi berhasil diperbarui.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
