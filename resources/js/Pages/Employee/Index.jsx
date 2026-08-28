import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, employees, stats, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [status, setStatus] = useState(filters?.status || "");
    const [department, setDepartment] = useState(filters?.department || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("employees.index"),
            { search, status, department },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Karyawan
                </h2>
            }
        >
            <Head title="Karyawan" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="space-y-4">
                    {/* Baris 1: 3 Kotak Utama */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Total Karyawan */}
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <p className="text-sm font-medium text-gray-500 uppercase">
                                Total Karyawan
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {stats.total}
                            </p>
                        </div>
                        {/* Status Aktif */}
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                            <p className="text-sm font-medium text-gray-500 uppercase">
                                Karyawan Aktif
                            </p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {stats.active}
                            </p>
                        </div>
                        {/* Status Tidak Aktif / Resign */}
                        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-red-500">
                            <p className="text-sm font-medium text-gray-500 uppercase">
                                Tidak Aktif / Resign
                            </p>
                            <p className="text-2xl font-bold text-red-600 mt-1">
                                {stats.inactive}
                            </p>
                        </div>
                    </div>

                    {/* Baris 2: Kartu Memanjang Khusus Departemen (AKTIF) */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">
                                    Distribusi Per Departemen (Aktif)
                                </p>
                                <p className="text-xs text-gray-400">
                                    Jumlah karyawan aktif berdasarkan bidang
                                    divisi
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {/* PERBAIKAN: Tambahkan || {} sebagai fallback */}
                                {Object.entries(stats.actdepartments || {}).map(
                                    ([dept, count]) => (
                                        <div
                                            key={dept}
                                            className="bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md flex items-center gap-2 shadow-sm"
                                        >
                                            <span className="text-xs font-semibold text-blue-800">
                                                {dept}
                                            </span>
                                            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                                {count}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Baris 3: Kartu Memanjang Khusus Departemen (TIDAK AKTIF) */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-red-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">
                                    Distribusi Per Departemen (Resign)
                                </p>
                                <p className="text-xs text-gray-400">
                                    Jumlah karyawan tidak aktif berdasarkan
                                    bidang divisi
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {/* PERBAIKAN: Tambahkan || {} sebagai fallback */}
                                {Object.entries(
                                    stats.inactdepartments || {},
                                ).map(([dept, count]) => (
                                    <div
                                        key={dept}
                                        className="bg-red-50 border border-red-100 px-3 py-1.5 rounded-md flex items-center gap-2 shadow-sm"
                                    >
                                        <span className="text-xs font-semibold text-red-600">
                                            {dept}
                                        </span>
                                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Filter Data</h3>
                        <div className="flex gap-2">
                            <a
                                href={route("employees.export")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-2"
                            >
                                ⬇️ Export CSV
                            </a>
                            <Link
                                href={route("employees.create")}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-2"
                            >
                                + Tambah Karyawan
                            </Link>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="flex flex-wrap gap-3 items-end"
                    >
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs text-gray-500 mb-1">
                                Pencarian Teks
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama karyawan..."
                                className="w-full border-gray-300 rounded-md text-sm"
                            />
                        </div>

                        <div className="w-48">
                            <label className="block text-xs text-gray-500 mb-1">
                                Filter Departemen
                            </label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full border-gray-300 rounded-md text-sm"
                            >
                                <option value="">Semua Departemen</option>
                                {Object.keys(stats.actdepartments || {}).map(
                                    (dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>

                        <div className="w-40">
                            <label className="block text-xs text-gray-500 mb-1">
                                Filter Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border-gray-300 rounded-md text-sm"
                            >
                                <option value="">Semua Status</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Resign">Resign</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded text-sm font-bold h-[42px]"
                        >
                            Filter
                        </button>

                        {(search || status || department) && (
                            <Link
                                href={route("employees.index")}
                                className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-bold h-[42px] flex items-center"
                            >
                                Reset
                            </Link>
                        )}
                    </form>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Nama
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Departemen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Jabatan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employees.data.map((emp) => (
                                <tr key={emp.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {emp.employee_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                        {emp.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {emp.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {emp.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${emp.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                        >
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <Link
                                            href={route("employees.edit", {
                                                employee: emp.id,
                                            })}
                                            className="text-indigo-600 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route("employees.destroy", {
                                                employee: emp.id,
                                            })}
                                            method="delete"
                                            as="button"
                                            className="text-red-600"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination links={employees.links} />
            </div>
        </AuthenticatedLayout>
    );
}
