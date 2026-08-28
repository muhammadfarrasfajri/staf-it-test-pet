import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, employees }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        pic_id: '',
        deadline: '',
        status: 'Belum Mulai',
        priority: 'Sedang',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Pekerjaan</h2>}>
            <Head title="Tambah Pekerjaan" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Pekerjaan</label>
                                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Contoh: Audit Laporan Keuangan" />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Penanggung Jawab (PIC)</label>
                                <select value={data.pic_id} onChange={e => setData('pic_id', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="">-- Pilih Karyawan --</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                                    ))}
                                </select>
                                {errors.pic_id && <div className="text-red-500 text-sm mt-1">{errors.pic_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tenggat Waktu (Deadline)</label>
                                <input type="date" value={data.deadline} onChange={e => setData('deadline', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                {errors.deadline && <div className="text-red-500 text-sm mt-1">{errors.deadline}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                        <option value="Belum Mulai">Belum Mulai</option>
                                        <option value="Proses">Proses</option>
                                        <option value="Selesai">Selesai</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Prioritas</label>
                                    <select value={data.priority} onChange={e => setData('priority', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                        <option value="Rendah">Rendah</option>
                                        <option value="Sedang">Sedang</option>
                                        <option value="Tinggi">Tinggi</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('dashboard')} className="text-gray-600 hover:text-gray-900 mr-4">Batal</Link>
                                <button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Simpan Pekerjaan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
