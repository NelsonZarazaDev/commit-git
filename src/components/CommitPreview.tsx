import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
};

export default function CommitPreview({ value }: props) {
  return (
    <div className="flex flex-col justify-content-center gap-2">
      <InputTextarea
        rows={1}
        className="min-h-0 w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-[13px] leading-5 text-slate-700 shadow-inner outline-none"
        disabled
        autoResize
        value={value}
      />
    </div>
  );
}
