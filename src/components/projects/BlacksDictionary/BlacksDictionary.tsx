import { useState, useEffect, useMemo, useRef } from "react";

// ── TYPES ───────────────────────────────────────────────────
interface DictionaryEntry {
  term: string;
  origin: string | null;
  definition: string;
  reference: string | null;
  source_file: string;
  source_page: number;
}

// ── HOOKS ───────────────────────────────────────────────────
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 50;

// ── COMPONENT ───────────────────────────────────────────────
export default function BlacksDictionary() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [page, setPage] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(search, 200);

  // Load data from JSON file
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/black-dictionary.json`)
      .then((response) => response.json())
      .then((data: DictionaryEntry[]) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading dictionary data:", error);
        setLoading(false);
      });
  }, []);

  const letterCounts = useMemo(() => {
    const c: Record<string, number> = {};
    entries.forEach((e) => {
      if (!e.term) return;
      const l = e.term[0].toUpperCase();
      if (/[A-Z]/.test(l)) c[l] = (c[l] || 0) + 1;
    });
    return c;
  }, [entries]);

  const filtered = useMemo(() => {
    let r = entries;
    if (activeLetter) r = r.filter((e) => e.term?.[0]?.toUpperCase() === activeLetter);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      r = r.filter(
        (e) =>
          e.term?.toLowerCase().includes(q) ||
          e.definition?.toLowerCase().includes(q)
      );
    }
    return r;
  }, [entries, activeLetter, debouncedSearch]);

  useEffect(() => {
    setPage(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [activeLetter, debouncedSearch]);

  const paged = useMemo(() => filtered.slice(0, (page + 1) * PAGE_SIZE), [filtered, page]);
  const hasMore = paged.length < filtered.length;

  const handleClearAll = () => {
    setSearch("");
    setActiveLetter(null);
    setSelectedEntry(null);
    setPage(0);
  };

  const isSelected = (entry: DictionaryEntry) =>
    selectedEntry && selectedEntry.term === entry.term && selectedEntry.definition === entry.definition;

  if (loading) {
    return (
      <div style={{ ...S.root, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⚖</div>
          <div style={{ fontSize: 16, color: C.inkM }}>Loading dictionary...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap');
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:transparent }
        ::-webkit-scrollbar-thumb { background:#D4D0C8; border-radius:3px }
      `}</style>

      <div style={S.root}>
        {/* Header */}
        <header style={S.header}>
          <div style={S.headerInner}>
            <div style={S.rule} />
            <div style={S.titleBlock}>
              <div style={S.preTitle}>A Dictionary of</div>
              <h1 style={S.title}>Black's Law</h1>
              <div style={S.subtitle}>
                {entries.length.toLocaleString()} Entries · First Edition Reference
              </div>
            </div>
            <div style={S.rule} />
          </div>
        </header>

        {/* Search */}
        <div style={S.searchArea}>
          <div style={S.searchBox}>
            <span style={S.searchIcon}>⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms or definitions…"
              style={S.searchInput}
            />
            {(search || activeLetter) && (
              <button onClick={handleClearAll} style={S.clearBtn}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Alphabet */}
        <nav style={S.alphaNav}>
          <div style={S.alphaInner}>
            {ALPHABET.map((letter) => {
              const count = letterCounts[letter] || 0;
              const isActive = activeLetter === letter;
              const isHover = hoveredLetter === letter;
              return (
                <button
                  key={letter}
                  disabled={count === 0}
                  onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                  onMouseEnter={() => setHoveredLetter(letter)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  style={{
                    ...S.alphaBtn,
                    ...(isActive ? S.alphaBtnActive : {}),
                    ...(count === 0 ? S.alphaBtnDisabled : {}),
                    ...(isHover && !isActive && count > 0 ? S.alphaBtnHover : {}),
                  }}
                  title={`${letter} — ${count} entries`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main */}
        <div style={S.main}>
          {/* List */}
          <div style={S.listPanel} ref={listRef}>
            <div style={S.resultCount}>
              {filtered.length.toLocaleString()} result{filtered.length !== 1 ? "s" : ""}
              {activeLetter && (
                <span style={S.filterTag}>
                  Letter: {activeLetter}
                  <span onClick={() => setActiveLetter(null)} style={S.filterX}>
                    ×
                  </span>
                </span>
              )}
            </div>

            {paged.map((entry, i) => {
              const sel = isSelected(entry);
              const hov = hoveredItem === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedEntry(entry)}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(-1)}
                  style={{
                    ...S.listItem,
                    ...(sel ? S.listItemSel : {}),
                    ...(hov && !sel ? S.listItemHov : {}),
                  }}
                >
                  <div style={S.listTerm}>{entry.term}</div>
                  {entry.origin && <span style={S.listOrigin}>{entry.origin}</span>}
                  <div style={S.listPreview}>
                    {entry.definition
                      ? entry.definition.slice(0, 120) + (entry.definition.length > 120 ? "…" : "")
                      : ""}
                  </div>
                </button>
              );
            })}

            {hasMore && (
              <button onClick={() => setPage((p) => p + 1)} style={S.loadMore}>
                Show More ({(filtered.length - paged.length).toLocaleString()} remaining)
              </button>
            )}

            {filtered.length === 0 && (
              <div style={S.empty}>
                <div style={S.emptyIcon}>§</div>
                <div style={S.emptyTitle}>No entries found</div>
                <div style={S.emptyText}>Try a different search term or letter</div>
              </div>
            )}
          </div>

          {/* Detail */}
          <div style={S.detailPanel}>
            {selectedEntry ? (
              <div style={S.detail}>
                <h2 style={S.detailTerm}>{selectedEntry.term}</h2>
                {selectedEntry.origin && (
                  <div style={S.detailOrigin}>{selectedEntry.origin}</div>
                )}
                <div style={S.detailDivider} />
                <p style={S.detailDef}>{selectedEntry.definition}</p>
                {selectedEntry.reference && (
                  <div style={S.detailRef}>
                    <span style={S.refLabel}>Reference</span>
                    <span style={S.refText}>{selectedEntry.reference}</span>
                  </div>
                )}
                <div style={S.detailMeta}>
                  <span style={S.metaItem}>Source: {selectedEntry.source_file}</span>
                  {selectedEntry.source_page && (
                    <span style={S.metaItem}>Page {selectedEntry.source_page}</span>
                  )}
                  {selectedEntry.term && (
                    <a
                      href={`https://archive.org/details/dictionaryof_blac_1891_00_20160211/page/n11/mode/2up?q=${encodeURIComponent(selectedEntry.term)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={S.archiveLink}
                    >
                      View on Archive.org →
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div style={S.placeholder}>
                <div style={S.phIcon}>⚖</div>
                <div style={S.phTitle}>Select an Entry</div>
                <div style={S.phText}>
                  Browse or search the dictionary, then select a term to view its full definition,
                  origin, and references.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── STYLES ──────────────────────────────────────────────────
const C = {
  bg: "#FAF8F4", paper: "#FFFFFF", ink: "#1A1A18",
  inkM: "#5C5A54", inkL: "#908D84", accent: "#8B1A1A",
  rule: "#D4D0C8", ruleDk: "#1A1A18", hi: "#F5F0E8",
  sel: "#EDE8DC", tag: "#E8E3D8",
};
const F = {
  serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "'Source Serif 4', Georgia, serif",
};

const S: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: F.body, background: C.bg, color: C.ink,
    minHeight: "100vh", paddingTop: "120px",
  },

  header: { padding: "20px 28px 0", textAlign: "center" },
  headerInner: { maxWidth: 900, margin: "0 auto" },
  rule: { height: 2, background: C.ruleDk },
  titleBlock: { padding: "16px 0 14px" },
  preTitle: {
    fontFamily: F.body, fontSize: 12, letterSpacing: "0.15em",
    textTransform: "uppercase", color: C.inkM, marginBottom: 2,
  },
  title: {
    fontFamily: F.serif, fontSize: 34, fontWeight: 800,
    letterSpacing: "-0.01em", margin: "0 0 4px", lineHeight: 1.1,
  },
  subtitle: { fontSize: 12, color: C.inkL, letterSpacing: "0.06em" },

  searchArea: { padding: "12px 28px 0" },
  searchBox: {
    maxWidth: 620, margin: "0 auto", display: "flex", alignItems: "center",
    background: C.paper, border: `1px solid ${C.rule}`, borderRadius: 4, padding: "0 14px",
  },
  searchIcon: { fontSize: 18, color: C.inkL, marginRight: 10, userSelect: "none" },
  searchInput: {
    flex: 1, fontFamily: F.body, fontSize: 15, padding: "11px 0",
    border: "none", outline: "none", background: "transparent", color: C.ink,
  },
  clearBtn: {
    fontFamily: F.body, fontSize: 11, color: C.accent, background: "none",
    border: "none", cursor: "pointer", letterSpacing: "0.04em",
    textTransform: "uppercase", fontWeight: 600, padding: "4px 8px", whiteSpace: "nowrap",
  },

  alphaNav: { padding: "10px 28px 8px", borderBottom: `1px solid ${C.rule}` },
  alphaInner: {
    maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap",
    gap: 1, justifyContent: "center",
  },
  alphaBtn: {
    fontFamily: F.serif, fontSize: 13, fontWeight: 600, width: 28, height: 28,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "transparent", border: "1px solid transparent",
    borderRadius: 3, cursor: "pointer", color: C.ink, transition: "all 0.12s",
  },
  alphaBtnActive: { background: C.ink, color: C.bg, borderColor: C.ink },
  alphaBtnHover: { background: C.hi },
  alphaBtnDisabled: { opacity: 0.25, cursor: "default" },

  main: { display: "flex", height: "calc(100vh - 320px)", overflow: "hidden" },

  listPanel: {
    width: 360, minWidth: 280, borderRight: `1px solid ${C.rule}`,
    overflowY: "auto", background: C.bg, flexShrink: 0,
  },
  resultCount: {
    fontSize: 12, color: C.inkL, padding: "10px 18px 6px",
    letterSpacing: "0.03em", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
  },
  filterTag: {
    background: C.tag, padding: "2px 8px", borderRadius: 3,
    fontSize: 11, color: C.inkM, display: "inline-flex", alignItems: "center", gap: 5,
  },
  filterX: { cursor: "pointer", fontWeight: 700, fontSize: 13, color: C.accent, lineHeight: 1 },

  listItem: {
    display: "block", width: "100%", textAlign: "left", padding: "11px 18px",
    background: "transparent", border: "none", borderBottom: `1px solid ${C.rule}`,
    borderLeft: "3px solid transparent", cursor: "pointer", fontFamily: F.body,
    transition: "background 0.1s",
  },
  listItemSel: { background: C.sel, borderLeftColor: C.accent },
  listItemHov: { background: C.hi },
  listTerm: {
    fontFamily: F.serif, fontWeight: 700, fontSize: 14, color: C.ink,
    marginBottom: 1, lineHeight: 1.3,
  },
  listOrigin: { fontSize: 11, fontStyle: "italic", color: C.accent, display: "inline-block", marginBottom: 2 },
  listPreview: {
    fontSize: 12.5, color: C.inkM, lineHeight: 1.4, overflow: "hidden",
    textOverflow: "ellipsis", display: "-webkit-box",
    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
  },
  loadMore: {
    width: "100%", padding: "12px 18px", background: C.hi, border: "none",
    borderBottom: `1px solid ${C.rule}`, fontFamily: F.body, fontSize: 13,
    color: C.accent, cursor: "pointer", fontWeight: 600, letterSpacing: "0.02em",
  },

  empty: { textAlign: "center", padding: "50px 20px" },
  emptyIcon: { fontFamily: F.serif, fontSize: 48, color: C.rule, marginBottom: 10 },
  emptyTitle: { fontFamily: F.serif, fontSize: 18, color: C.inkM, marginBottom: 6 },
  emptyText: { fontSize: 13, color: C.inkL },

  detailPanel: { flex: 1, overflowY: "auto", padding: "32px 44px", background: C.paper },
  detail: { maxWidth: 680 },
  detailTerm: {
    fontFamily: F.serif, fontSize: 30, fontWeight: 800, margin: 0, lineHeight: 1.2,
  },
  detailOrigin: { fontStyle: "italic", fontSize: 15, color: C.accent, marginTop: 6 },
  detailDivider: { height: 2, background: C.ruleDk, width: 56, margin: "18px 0 22px" },
  detailDef: {
    fontSize: 16, lineHeight: 1.78, margin: "0 0 26px", textAlign: "justify", hyphens: "auto",
  },
  detailRef: {
    padding: "13px 16px", background: C.hi, borderLeft: `3px solid ${C.accent}`,
    marginBottom: 22, borderRadius: "0 4px 4px 0",
  },
  refLabel: {
    display: "block", fontSize: 10, textTransform: "uppercase",
    letterSpacing: "0.1em", color: C.inkL, marginBottom: 4, fontWeight: 600,
  },
  refText: { fontSize: 13, color: C.inkM, fontStyle: "italic", lineHeight: 1.5 },
  detailMeta: { display: "flex", gap: 18, borderTop: `1px solid ${C.rule}`, paddingTop: 14 },
  metaItem: { fontSize: 11, color: C.inkL, letterSpacing: "0.02em" },
  archiveLink: {
    fontSize: 11, color: C.accent, letterSpacing: "0.02em",
    textDecoration: "none", fontWeight: 600, marginLeft: "auto",
  },

  placeholder: { textAlign: "center", paddingTop: 80, maxWidth: 340, margin: "0 auto" },
  phIcon: { fontSize: 52, opacity: 0.18, marginBottom: 18 },
  phTitle: { fontFamily: F.serif, fontSize: 20, fontWeight: 700, color: C.inkM, marginBottom: 8 },
  phText: { fontSize: 13, color: C.inkL, lineHeight: 1.55 },
};
