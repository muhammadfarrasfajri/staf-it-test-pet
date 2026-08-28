export default function ApplicationLogo(props) {
    return (
        <div
            {...props}
            className={`flex items-center gap-2.5 font-bold tracking-wider select-none ${props.className || ""}`}
        >
            {/* Kotak Ikon Hijau Muda */}
            <div className="bg-emerald-400 text-gray-950 font-black px-2.5 py-1 rounded-lg text-sm shadow-sm flex items-center justify-center">
                PET
            </div>

            {/* Teks Nama Perusahaan Opsional (bisa dilepas jika hanya ingin ikonnya saja) */}
            <span className="hidden sm:inline-block text-gray-800 text-sm font-extrabold tracking-tight">
                Properindo <span className="text-emerald-600">Enviro Tech</span>
            </span>
        </div>
    );
}
