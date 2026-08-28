import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

// PERBAIKAN: Menambahkan 'employees' ke dalam kurung kurawal di bawah ini
export default function Index({ auth, tasks, employees, stats, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [picId, setPicId] = useState(filters?.pic_id || "");
    const [status, setStatus] = useState(filters?.status || "");
    const [deadline, setDeadline] = useState(filters?.deadline || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("tasks.index"),
            { search, pic_id: picId, status, deadline },
            { preserveState: true, replace: true },
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-800";
            case "Proses":
                return "bg-yellow-100 text-yellow-800";
            case "Belum Mulai":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Tinggi":
                return "bg-red-100 text-red-800";
            case "Sedang":
                return "bg-blue-100 text-blue-800";
            case "Rendah":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const isUrgent = (deadline, status) => {
        if (status === "Selesai") return false;
        const today = new Date();
        const targetDate = new Date(deadline);
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Monitoring Pekerjaan
                </h2>
            }
        >
            <Head title="Pekerjaan" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Baris 1: Status Utama */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
                        <p className="text-sm font-medium text-gray-500 uppercase">
                            Total Pekerjaan
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                            {stats.total}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                        <p className="text-sm font-medium text-gray-500 uppercase">
                            Selesai
                        </p>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                            {stats.completed}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
                        <p className="text-sm font-medium text-gray-500 uppercase">
                            Sedang Proses
                        </p>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">
                            {stats.process}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-red-500">
                        <p className="text-sm font-medium text-gray-500 uppercase">
                            Deadline &lt; 1 Minggu
                        </p>
                        <p className="text-2xl font-bold text-red-600 mt-1">
                            {stats.urgentDeadline}{" "}
                            <span className="text-xs font-normal text-gray-500">
                                tugas
                            </span>
                        </p>
                    </div>
                </div>

                {/* Baris 2: Informasi Berdasarkan Prioritas */}
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase">
                            Berdasarkan Prioritas
                        </p>
                        <p className="text-xs text-gray-400">
                            Distribusi tingkat urgensi tugas perusahaan
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-red-50 border border-red-100 px-3 py-1 rounded-md flex items-center gap-2">
                            <span className="text-xs font-semibold text-red-800">
                                Tinggi:
                            </span>
                            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                {stats.priorities.Tinggi}
                            </span>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 px-3 py-1 rounded-md flex items-center gap-2">
                            <span className="text-xs font-semibold text-blue-800">
                                Sedang:
                            </span>
                            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                {stats.priorities.Sedang}
                            </span>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 px-3 py-1 rounded-md flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-700">
                                Rendah:
                            </span>
                            <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                {stats.priorities.Rendah}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pencarian */}
                <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Filter Data</h3>
                        <div className="flex gap-2">
                            <a
                                href={route("tasks.export")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-2"
                            >
                                ⬇️ Export CSV
                            </a>
                            <Link
                                href={route("tasks.create")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-2"
                            >
                                + Tambah Pekerjaan
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
                                placeholder="Judul tugas..."
                                className="w-full border-gray-300 rounded-md text-sm"
                            />
                        </div>

                        <div className="w-48">
                            <label className="block text-xs text-gray-500 mb-1">
                                Filter PIC
                            </label>
                            <select
                                value={picId}
                                onChange={(e) => setPicId(e.target.value)}
                                className="w-full border-gray-300 rounded-md text-sm"
                            >
                                <option value="">Semua Karyawan</option>
                                {/* Fallback [] jika employees gagal diload */}
                                {(employees || []).map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name}
                                    </option>
                                ))}
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
                                <option value="Belum Mulai">Belum Mulai</option>
                                <option value="Proses">Proses</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                        </div>

                        <div className="w-40">
                            <label className="block text-xs text-gray-500 mb-1">
                                Filter Deadline
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full border-gray-300 rounded-md text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded text-sm font-bold h-[42px]"
                        >
                            Terapkan
                        </button>

                        {(search || picId || status || deadline) && (
                            <Link
                                href={route("tasks.index")}
                                className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-bold h-[42px] flex items-center"
                            >
                                Reset
                            </Link>
                        )}
                    </form>
                </div>

                {/* Tabel */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Pekerjaan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    PIC
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Deadline
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Prioritas
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tasks.data.map((task) => {
                                const urgent = isUrgent(
                                    task.deadline,
                                    task.status,
                                );
                                return (
                                    <tr
                                        key={task.id}
                                        className={urgent ? "bg-red-50/50" : ""}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            {task.title}
                                            {urgent && (
                                                <span className="ml-2 bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase">
                                                    ⚠️ Mendekati Deadline
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {task.pic?.name || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {task.deadline}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}
                                            >
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <Link
                                                href={route("tasks.edit", {
                                                    task: task.id,
                                                })}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route("tasks.destroy", {
                                                    task: task.id,
                                                })}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900 font-medium"
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination links={tasks.links} />
            </div>
        </AuthenticatedLayout>
    );
}
