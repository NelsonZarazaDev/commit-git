import { InputText } from "primereact/inputtext";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ScopeInput({ value, onChange }: props) {
  return (
    <div className="w-full flex flex-col justify-content-center gap-2">
      <label htmlFor="Scope" className="font-bold hover:text-indigo-300">
        Alcance <span className="text-[#401372cc]">(Opcional)</span>
      </label>
      <InputText
        id="scope"
        name="scope"
        className="w-full text-xl text-white px-6 py-4 bg-[#553D76]/40 placeholder:text-[#9F80C2] placeholder:text-xl placeholder:italic border border-gray-400 rounded-xl"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ej: auth, ui"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
