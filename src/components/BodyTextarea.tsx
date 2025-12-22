import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BodyTextarea({ value, onChange }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label htmlFor="Body" className="font-bold hover:text-indigo-300">
        Cuerpo <span className="text-[#401372cc]">(Opcional)</span>
      </label>
      <InputTextarea
        id="body"
        name="body"
        value={value}
        className="w-full text-xl text-white px-6 py-4 bg-[#553D76]/40 placeholder:text-[#9F80C2] placeholder:text-xl placeholder:font-bold placeholder:italic border border-gray-400 rounded-xl"
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        cols={30}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
