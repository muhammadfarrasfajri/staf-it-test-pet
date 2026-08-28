import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, employee }) {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: employee.employee_id || "",
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        position: employee.position || "",
        status: employee.status || "Aktif",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("employees.update", employee.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Karyawan
                </h2>
            }
        >
            <Head title="Edit Karyawan" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    ID Karyawan
                                </label>
                                <input
                                    type="text"
                                    value={data.employee_id}
                                    onChange={(e) =>
                                        setData("employee_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.employee_id && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.employee_id}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Login
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Departemen
                                    </label>
                                    <input
                                        type="text"
                                        value={data.department}
                                        onChange={(e) =>
                                            setData(
                                                "department",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jabatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={(e) =>
                                            setData("position", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Resign">Resign</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route("dashboard")}
                                    className="text-gray-600 hover:text-gray-900 mr-4"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Perbarui Karyawan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
