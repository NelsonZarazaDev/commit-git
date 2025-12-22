import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { X } from "lucide-react";

export type CommitHistoryItem = {
  id: string;
  message: string;
  createdAt: number;
};

const PAGE_SIZE = 8;

export default function History() {
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
    <div className="flex flex-col gap-y-3 backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-lg p-6 text-white">
      <div className="flex justify-between items-center">
        <div className="font-bold">Historial</div>
        <Button
          label="Eliminar todo"
          severity="danger"
          size="small"
          onClick={removeAll}
          className="backdrop-blur-md bg-white/10 p-2 rounded-xl cursor-pointer"
        />
      </div>

      <div className="text-sm opacity-80">{history.length} commits</div>

      <hr className="border-white/20" />

      {paginated.length === 0 && (
        <div className="opacity-60 text-sm">Sin commits</div>
      )}

      {paginated.map((item) => (
        <div
          key={item.id}
          onClick={() => copyCommit(item.message)}
          className="flex justify-between items-center bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition"
        >
          <div className="flex flex-col max-w-[70%]">
            <span className="text-sm font-mono truncate">{item.message}</span>
            <span className="text-xs opacity-60">
              {new Date(item.createdAt).toLocaleString()}
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
          label="Anterior"
          size="small"
          className="backdrop-blur-md bg-white/10 p-2 rounded-xl cursor-pointer"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        />
        <Button
          label="Siguiente"
          size="small"
          className="backdrop-blur-md bg-white/10 p-2 rounded-xl cursor-pointer"
          disabled={(page + 1) * PAGE_SIZE >= history.length}
          onClick={() => setPage((p) => p + 1)}
        />
      </div>
    </div>
  );
}
