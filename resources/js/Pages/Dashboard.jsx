import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, stats, urgentTasks }) {
    // Menghitung persentase penyelesaian
    const progressPercentage =
        stats.tasks > 0
            ? Math.round((stats.completedTasks / stats.tasks) * 100)
            : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Overview System
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Baris 1: Kartu Metrik Utama */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Metrik Karyawan */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase">
                                        Karyawan Aktif
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.activeEmployees}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    👥
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Dari total {stats.employees} karyawan terdaftar.
                            </p>
                        </div>

                        {/* Metrik Pekerjaan Proses */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-yellow-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase">
                                        Pekerjaan Diproses
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.processTasks}
                                    </p>
                                </div>
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    ⏳
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Sedang dikerjakan oleh tim.
                            </p>
                        </div>

                        {/* Metrik Penyelesaian (Progress) */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-gray-500 uppercase">
                                    Tingkat Penyelesaian
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                    {progressPercentage}%
                                </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-green-600 h-2.5 rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                {stats.completedTasks} dari {stats.tasks}{" "}
                                pekerjaan selesai.
                            </p>
                        </div>
                    </div>

                    {/* Baris 2: Alert Prioritas Tinggi */}
                    <div className="bg-white rounded-lg shadow-sm border border-red-200">
                        <div className="bg-red-50 px-6 py-4 border-b border-red-200 flex justify-between items-center">
                            <h3 className="text-red-800 font-bold flex items-center gap-2">
                                ⚠️ Perhatian: Pekerjaan Prioritas Tinggi (Belum
                                Selesai)
                            </h3>
                            <Link
                                href={route("tasks.index")}
                                className="text-sm text-red-600 hover:text-red-800 font-semibold underline"
                            >
                                Lihat Semua Pekerjaan
                            </Link>
                        </div>
                        <div className="p-6">
                            {urgentTasks.length === 0 ? (
                                <p className="text-green-600 font-medium">
                                    Luar biasa! Tidak ada pekerjaan prioritas
                                    tinggi yang tertunda.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {urgentTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
                                        >
                                            <div>
                                                <p className="font-bold text-gray-800">
                                                    {task.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    PIC:{" "}
                                                    {task.pic?.name ||
                                                        "Belum ada PIC"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-red-600">
                                                    Deadline: {task.deadline}
                                                </p>
                                                <p className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded mt-1 inline-block">
                                                    Status: {task.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
