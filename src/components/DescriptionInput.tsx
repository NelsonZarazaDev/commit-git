import { InputText } from "primereact/inputtext";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionInput({ value, onChange }: props) {
  return (
    <div className="w-full flex flex-col justify-content-center gap-2">
      <label htmlFor="Description" className="font-bold hover:text-indigo-300">
        Description <span className="text-red-300">*</span>
      </label>
      <InputText
        id="description"
        name="description"
        autoComplete="off"
        className="w-full text-xl text-white px-6 py-4 bg-[#553D76]/40 placeholder:text-[#9F80C2] placeholder:text-xl placeholder:font-bold placeholder:italic border border-gray-400 rounded-xl"
        placeholder="Descripción breve"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
