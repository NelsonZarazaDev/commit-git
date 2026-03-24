import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { X } from "lucide-react";
import type { Language, TranslationSet } from "../i18n";

export type CommitHistoryItem = {
  id: string;
  message: string;
  createdAt: number;
};

const PAGE_SIZE = 8;

type Props = {
  texts: TranslationSet;
  language: Language;
};

export default function History({ texts, language }: Props) {
  const [history, setHistory] = useState<CommitHistoryItem[]>([]);
  const [page, setPage] = useState(0);

  const syncHistory = () => {
    const raw = localStorage.getItem("historial");
    setHistory(raw ? JSON.parse(raw) : []);
  };

  useEffect(() => {
    syncHistory();

    window.addEventListener("storage", syncHistory);
    return () => {
      window.removeEventListener("storage", syncHistory);
    };
  }, []);

  const removeOne = (id: string) => {
    const updated = history.filter((item) => item.id !== id);

    const maxPage = Math.max(0, Math.ceil(updated.length / PAGE_SIZE) - 1);
    setPage((p) => Math.min(p, maxPage));

    setHistory(updated);
    localStorage.setItem("historial", JSON.stringify(updated));
  };

  const removeAll = () => {
    setHistory([]);
    localStorage.removeItem("historial");
    setPage(0);
  };

  const copyCommit = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const paginated = useMemo(() => {
    const start = page * PAGE_SIZE;
    return history.slice(start, start + PAGE_SIZE);
  }, [history, page]);

  return (
    <div className="flex flex-col gap-y-3 rounded-[1.75rem] border border-white/60 bg-white/70 p-5 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-bold">{texts.historyTitle}</div>
          <div className="text-xs text-slate-500">
            {texts.historyHint}
          </div>
        </div>
        <Button
          label={texts.deleteAll}
          severity="danger"
          size="small"
          onClick={removeAll}
          className="cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-600"
        />
      </div>

      <div className="rounded-2xl bg-slate-950 px-4 py-2.5 text-xs text-slate-200">
        {texts.savedCommits(history.length)}
      </div>

      <hr className="border-slate-200" />

      {paginated.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
          {texts.emptyHistory}
        </div>
      )}

      {paginated.map((item) => (
        <div
          key={item.id}
          onClick={() => copyCommit(item.message)}
          className="flex cursor-pointer items-center justify-between rounded-[1.25rem] border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
        >
          <div className="flex max-w-[70%] flex-col">
            <span className="truncate font-mono text-[13px] text-slate-800">
              {item.message}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(item.createdAt).toLocaleString(
                language === "es" ? "es-CO" : "en-US",
              )}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              icon={<X />}
              text
              className="cursor-pointer"
              severity="danger"
              onClick={(e) => {
                e.stopPropagation();
                removeOne(item.id);
              }}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-2">
        <Button
          label={texts.previous}
          size="small"
          className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        />
        <Button
          label={texts.next}
          size="small"
          className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          disabled={(page + 1) * PAGE_SIZE >= history.length}
          onClick={() => setPage((p) => p + 1)}
        />
      </div>
    </div>
  );
}
