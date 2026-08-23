import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { ChevronLeft, ChevronRight, Clock3, Trash2, X } from "lucide-react";
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
    <div className="premium-card flex flex-col gap-y-4 p-5 text-slate-900 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="section-icon">
            <Clock3 size={18} />
          </div>
          <div>
          <div className="text-base font-semibold tracking-[-0.02em]">{texts.historyTitle}</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {texts.historyHint}
          </div>
          </div>
        </div>
        <Button
          icon={<Trash2 size={15} />}
          aria-label={texts.deleteAll}
          tooltip={texts.deleteAll}
          severity="danger"
          size="small"
          onClick={removeAll}
          className="icon-button danger"
        />
      </div>

      <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 px-3.5 py-2.5 text-[11px] font-medium text-slate-500">
        {texts.savedCommits(history.length)}
      </div>

      <hr className="border-slate-100" />

      {paginated.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center text-sm leading-6 text-slate-400">
          {texts.emptyHistory}
        </div>
      )}

      {paginated.map((item) => (
        <div
          key={item.id}
          onClick={() => copyCommit(item.message)}
          className="history-item group flex cursor-pointer items-center justify-between p-3.5"
        >
          <div className="flex max-w-[70%] flex-col">
            <span className="truncate font-mono text-[12px] font-medium text-slate-800">
              {item.message}
            </span>
            <span className="mt-1 text-[10px] text-slate-400">
              {new Date(item.createdAt).toLocaleString(
                language === "es" ? "es-CO" : "en-US",
              )}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              icon={<X size={15} />}
              text
              className="icon-button danger opacity-60 group-hover:opacity-100"
              severity="danger"
              onClick={(e) => {
                e.stopPropagation();
                removeOne(item.id);
              }}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between border-t border-slate-100 pt-4">
        <Button
          label={texts.previous}
          icon={<ChevronLeft size={14} />}
          size="small"
          className="pagination-button"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        />
        <Button
          label={texts.next}
          icon={<ChevronRight size={14} />}
          iconPos="right"
          size="small"
          className="pagination-button"
          disabled={(page + 1) * PAGE_SIZE >= history.length}
          onClick={() => setPage((p) => p + 1)}
        />
      </div>
    </div>
  );
}
