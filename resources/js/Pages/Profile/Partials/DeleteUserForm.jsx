import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-gray-900">Hapus Akun</h2>

                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Setelah akun Anda dihapus, seluruh sumber daya dan data di
                    dalamnya akan dihapus secara permanen. Sebelum menghapus
                    akun, harap unduh data atau informasi apa pun yang ingin
                    Anda simpan.
                </p>
            </header>

            <DangerButton
                onClick={confirmUserDeletion}
                className="rounded-lg text-xs font-semibold"
            >
                Hapus Akun
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900">
                        Apakah Anda yakin ingin menghapus akun ini?
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Setelah akun Anda dihapus, seluruh data akan dihapus
                        secara permanen. Masukkan kata sandi Anda untuk
                        mengonfirmasi bahwa Anda ingin menghapus akun secara
                        permanen.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Kata Sandi"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4 bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-sm shadow-sm"
                            isFocused
                            placeholder="Masukkan Kata Sandi"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-xs text-red-600"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={closeModal}
                            className="rounded-lg text-xs"
                        >
                            Batal
                        </SecondaryButton>

                        <DangerButton
                            className="rounded-lg text-xs font-semibold"
                            disabled={processing}
                        >
                            Hapus Akun Permanen
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
