import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, logs }) {
    // Memberikan warna pada badge aksi
    const getActionBadge = (action) => {
        switch (action) {
            case "Tambah":
                return "bg-green-100 text-green-800";
            case "Edit":
                return "bg-blue-100 text-blue-800";
            case "Hapus":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Histori Aktivitas Sistem
                </h2>
            }
        >
            <Head title="Histori Aktivitas" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-gray-800 mb-4">
                    <p className="text-sm text-gray-600">
                        Halaman ini mencatat semua perubahan data aktifitas yang dilakukan oleh pengguna di dalam
                        sistem untuk keperluan Audit.
                    </p>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Waktu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Pengguna (Aktor)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Modul
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Aksi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Detail Perubahan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        Belum ada histori aktivitas yang
                                        terekam.
                                    </td>
                                </tr>
                            ) : (
                                logs.data.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(
                                                log.created_at,
                                            ).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            {log.user?.name || "Sistem"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {log.module}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${getActionBadge(log.action)}`}
                                            >
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {log.description}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination links={logs.links} />
            </div>
        </AuthenticatedLayout>
    );
}
