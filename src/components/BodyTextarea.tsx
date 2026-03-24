import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BodyTextarea({ value, onChange }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label
        htmlFor="Body"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        Cuerpo <span className="text-slate-400">(Opcional)</span>
      </label>
      <InputTextarea
        id="body"
        name="body"
        value={value}
        className="w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        cols={30}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
