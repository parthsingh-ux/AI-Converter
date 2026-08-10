"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  History,
  Download,
  FileJson,
  Calendar,
  Layers,
  ArrowLeft,
  Loader2,
  Inbox,
  Code2,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  Mail,
  FileText,
  FolderOpen,
  Search,
  Filter,
} from "lucide-react";

const TYPE_ICONS = {
  html: Code2,
  css_js: FileCode,
  image: ImageIcon,
  prompt: Sparkles,
  json: FileJson,
  email_quote: Mail,
  pdf: FileText,
  folder: FolderOpen,
};

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/history");
      const data = await res.json();
      if (data.success) {
        setHistory(data.history || []);
      } else {
        setError(data.errors?.[0] || "Failed to load history.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch conversion history.");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inputType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || item.inputType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-cyber-violet/20 border border-cyber-violet/40 flex items-center justify-center text-cyber-violet shrink-0">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Conversion History</h1>
            <p className="text-xs text-gray-400 font-mono">Past Elementor theme conversions stored in /data/outputs</p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-surface-border hover:bg-gray-700 text-gray-200 transition-all border border-gray-600 self-start sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversions by title or type..."
            className="w-full bg-background/90 border border-surface-border rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-400 shrink-0" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-background/90 border border-surface-border rounded-xl px-3 py-2 text-xs font-mono text-gray-200 focus:outline-none focus:border-cyber-cyan w-full sm:w-auto"
          >
            <option value="all">All Input Types</option>
            <option value="folder">Folder</option>
            <option value="html">HTML</option>
            <option value="css_js">CSS / JS</option>
            <option value="image">Image</option>
            <option value="prompt">Prompt</option>
            <option value="json">JSON</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3 border border-surface-border">
          <Loader2 className="h-8 w-8 text-cyber-cyan animate-spin" />
          <p className="text-sm font-mono text-gray-400">Loading conversion history log...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="glass-panel rounded-2xl p-6 border border-red-500/40 bg-red-950/20 text-red-400 text-sm font-mono">
          Error: {error}
        </div>
      )}

      {/* History Items Grid / List */}
      {!loading && !error && (
        <>
          {filteredHistory.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 border border-surface-border">
              <div className="h-16 w-16 rounded-2xl bg-surface-border/50 flex items-center justify-center text-gray-500">
                <Inbox className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-300">No Conversions Found</h3>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  {searchTerm || filterType !== "all"
                    ? "No conversion runs match your search or filter."
                    : "You haven't converted any designs yet. Convert HTML, folders, images, or PDFs to populate this history."}
                </p>
              </div>
              <Link
                href="/"
                className="mt-2 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-all shadow-lg shadow-brand-500/20"
              >
                <span>Create New Conversion</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const TypeIcon = TYPE_ICONS[item.inputType] || FileText;
                const formattedDate = new Date(item.timestamp).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                });

                return (
                  <div
                    key={item.id}
                    className="glass-panel-interactive rounded-2xl p-6 border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Left: Metadata & Title */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-surface-border text-cyber-cyan text-xs font-mono font-bold uppercase">
                          <TypeIcon className="h-3.5 w-3.5" />
                          <span>{item.inputType}</span>
                        </span>
                        <span className="text-xs text-gray-500 font-mono flex items-center space-x-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formattedDate}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-white">{item.title}</h3>

                      <div className="flex items-center space-x-4 text-xs text-gray-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <Layers className="h-3.5 w-3.5 text-cyber-violet" />
                          <span>{item.summary?.section_count || 1} Sections</span>
                        </span>
                        {item.summary?.colors?.length > 0 && (
                          <div className="flex items-center space-x-1">
                            {item.summary.colors.slice(0, 5).map((color, idx) => (
                              <span
                                key={idx}
                                className="h-3 w-3 rounded-full border border-white/20"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Re-download links */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={item.downloadUrl}
                        className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-cyber-emerald hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-md"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download ZIP</span>
                      </a>

                      <a
                        href={item.jsonDownloadUrl}
                        className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-surface-border hover:bg-gray-700 text-gray-200 font-medium text-xs transition-all border border-gray-600"
                        title="Download Raw JSON"
                      >
                        <FileJson className="h-4 w-4 text-cyber-cyan" />
                        <span className="hidden sm:inline">JSON</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
