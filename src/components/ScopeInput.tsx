import { InputText } from "primereact/inputtext";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ScopeInput({ value, onChange }: props) {
  return (
    <div className="flex w-full flex-col justify-content-center gap-2">
      <label
        htmlFor="Scope"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        Alcance <span className="text-slate-400">(Opcional)</span>
      </label>
      <InputText
        id="scope"
        name="scope"
        className="w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ej: auth, ui"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
