import { Languages, ScanText, Loader2 } from "lucide-react";

/**
 * Wizualizacja koncepcyjna działania SayWut — NIE jest to zrzut ekranu
 * z aplikacji. Animowana w pętli scena pokazuje ideę działania panelu:
 * zaznaczenie fragmentu ekranu, rozpoznanie tekstu i wyświetlenie
 * tłumaczenia w lekkim, przezroczystym panelu nad oryginalną treścią.
 */
export default function AppPreview() {
  return (
    <div className="w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-950 shadow-2xl shadow-black/10">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/70 backdrop-blur-sm">
          Wizualizacja koncepcyjna
        </span>

        <div className="absolute -left-10 -top-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

        <div
          className="absolute left-[6%] w-[60%] rounded-lg bg-black/45 px-4 py-3 backdrop-blur-[2px]"
          style={{ bottom: "12%" }}
        >
          <p className="text-[13px] leading-relaxed text-white/90 sm:text-sm">
            気をつけて、うしろに何かいる。
          </p>
          <p className="text-[13px] leading-relaxed text-white/90 sm:text-sm">
            急いで、czasu nie mamy!
          </p>
        </div>

        <div
          className="absolute left-[6%] w-[60%] rounded-lg border-2 border-dashed border-white/70 motion-reduce:hidden"
          style={{ bottom: "12%", height: "20%", animation: "preview-selecting 9s ease-in-out infinite" }}
        />

        <div
          className="absolute left-[6%] w-[60%] rounded-lg border-2 border-sky-400 motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ bottom: "12%", height: "20%", animation: "preview-captured 9s ease-in-out infinite" }}
        />

        <div
          className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg motion-reduce:hidden"
          style={{ bottom: "32%", left: "66%", animation: "preview-scan 9s ease-in-out infinite" }}
        >
          <ScanText className="h-3.5 w-3.5" strokeWidth={2.25} />
        </div>

        <div
          className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg motion-reduce:hidden"
          style={{ bottom: "12%", left: "66%", animation: "preview-loader 9s ease-in-out infinite" }}
        >
          <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.25} />
        </div>

        <div
          className="absolute left-[6%] w-[64%] rounded-xl border border-white/40 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ bottom: "36%", animation: "preview-panel 9s ease-in-out infinite" }}
        >
          <div className="flex items-center gap-2 border-b border-black/5 pb-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
              Na żywo
            </span>
            <span className="text-[10px] text-zinc-400">·</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-500">
              <Languages className="h-3 w-3" />
              DeepL
            </span>
          </div>
          <div className="mt-2 space-y-0.5">
            <p className="text-sm font-medium text-zinc-900 sm:text-[15px]">
              Uważaj, coś jest za tobą.
            </p>
            <p className="text-sm font-medium text-zinc-900 sm:text-[15px]">
              Szybko, nie mamy czasu!
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-500">
        Wizualizacja koncepcyjna działania panelu — nie jest to zrzut ekranu
        z aplikacji. Realne zrzuty ekranu pojawią się tutaj wkrótce.
      </p>
    </div>
  );
}
