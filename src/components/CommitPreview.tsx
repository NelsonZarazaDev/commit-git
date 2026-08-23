import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
};

export default function CommitPreview({ value }: props) {
  return (
    <div className="flex flex-col justify-content-center gap-2">
      <InputTextarea
        rows={1}
        className="commit-preview min-h-0 w-full px-4 py-3.5 font-mono text-[13px] leading-5 outline-none"
        disabled
        autoResize
        value={value}
      />
    </div>
  );
}
