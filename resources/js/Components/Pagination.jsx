import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    // Jika halamannya hanya 1, tidak perlu menampilkan tombol
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1 mt-6 mb-4">
            {links.map((link, key) =>
                link.url === null ? (
                    <div
                        key={key}
                        className="px-4 py-2 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 text-sm border rounded transition-colors ${
                            link.active
                                ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ),
            )}
        </div>
    );
}
