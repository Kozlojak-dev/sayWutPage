import { Keyboard, Move, RotateCcw, Type } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Move,
    title: "Przesuwanie i zmiana rozmiaru",
    description:
      "W trybie edycji dowolnie przesuniesz panel i dopasujesz jego rozmiar do swoich potrzeb.",
  },
  {
    icon: Type,
    title: "Wielkość tekstu",
    description:
      "Dostosuj rozmiar czcionki w panelu, aby tłumaczenie było czytelne w każdych warunkach.",
  },
  {
    icon: RotateCcw,
    title: "Reset pozycji panelu",
    description:
      "Jeśli panel znajdzie się poza ekranem, jednym kliknięciem przywrócisz jego domyślne położenie.",
  },
  {
    icon: Keyboard,
    title: "Pauza pod skrótem klawiszowym",
    description:
      "Zatrzymaj i wznów tłumaczenie w dowolnej chwili — przyciskiem lub własnym skrótem klawiszowym.",
  },
];

export default function Features() {
  return (
    <section id="funkcje" className="scroll-mt-24 bg-zinc-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Panel dopasowany do Ciebie
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            Po zakończeniu edycji panel zostaje zablokowany, dzięki czemu nie
            przesunie się przypadkowo podczas pracy.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-zinc-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
