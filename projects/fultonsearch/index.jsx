import { useState, useCallback } from "react";

const SEARCH_MODES = {
  SIMPLE: "simple",
  BOOLEAN: "boolean",
  GUIDED: "guided",
};

const COMMON_OCR_SWAPS = [
  { from: "l", to: "i", note: "lowercase L ↔ i" },
  { from: "rn", to: "m", note: "rn ↔ m" },
  { from: "cl", to: "d", note: "cl ↔ d" },
  { from: "h", to: "b", note: "h ↔ b" },
  { from: "e", to: "c", note: "e ↔ c" },
];

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="9" height="9" rx="1.5"/>
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v3.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 012 12.5v-7A1.5 1.5 0 013.5 4H7"/>
      <path d="M10 2h4v4"/>
      <path d="M7 9L14 2"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
      <path d="M5 3l4 4-4 4"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5.5"/>
      <path d="M7 9.5V7"/>
      <circle cx="7" cy="4.75" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M7 3v8M3 7h8"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4h9M5 4V2.5h4V4M5.5 6.5v3.5M8.5 6.5v3.5M3.5 4l.5 7.5a1 1 0 001 1h4a1 1 0 001-1L10.5 4"/>
    </svg>
  );
}

// Guided builder row
function TermRow({ term, index, onUpdate, onRemove, canRemove }) {
  return (
    <div style={{
      display: "flex", gap: "8px", alignItems: "center",
      padding: "10px 12px",
      background: index % 2 === 0 ? "var(--surface-alt)" : "transparent",
      borderRadius: "6px",
    }}>
      {index > 0 && (
        <select
          value={term.operator}
          onChange={(e) => onUpdate(index, { ...term, operator: e.target.value })}
          style={{
            padding: "6px 8px", borderRadius: "4px",
            border: "1px solid var(--border)", background: "var(--surface)",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
            color: "var(--accent)", fontWeight: 600, cursor: "pointer",
            minWidth: "70px",
          }}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
          <option value="AND NOT">NOT</option>
        </select>
      )}
      {index === 0 && <div style={{ minWidth: "70px" }} />}

      <select
        value={term.type}
        onChange={(e) => onUpdate(index, { ...term, type: e.target.value })}
        style={{
          padding: "6px 8px", borderRadius: "4px",
          border: "1px solid var(--border)", background: "var(--surface)",
          fontSize: "13px", color: "var(--text)", cursor: "pointer",
          minWidth: "120px",
        }}
      >
        <option value="phrase">Exact phrase</option>
        <option value="proximity">Proximity (w/N)</option>
        <option value="word">Single word</option>
        <option value="wildcard">Wildcard (?)</option>
      </select>

      <input
        type="text"
        value={term.value}
        onChange={(e) => onUpdate(index, { ...term, value: e.target.value })}
        placeholder={
          term.type === "phrase" ? '"John Smith"' :
          term.type === "proximity" ? 'Smith w/3 married' :
          term.type === "wildcard" ? 'Gard?n?er' :
          'keyword'
        }
        style={{
          flex: 1, padding: "6px 10px", borderRadius: "4px",
          border: "1px solid var(--border)", background: "var(--surface)",
          fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace",
          color: "var(--text)",
        }}
      />

      <button
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        style={{
          padding: "6px", borderRadius: "4px", border: "none",
          background: "transparent", cursor: canRemove ? "pointer" : "default",
          color: canRemove ? "var(--text-muted)" : "transparent",
          display: "flex", alignItems: "center",
        }}
        title="Remove term"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

// Collapsible panel
function Panel({ title, children, defaultOpen = false, icon }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: "8px",
      overflow: "hidden",
      background: "var(--surface)",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "8px",
          padding: "12px 16px", border: "none", background: "transparent",
          cursor: "pointer", fontSize: "13px", fontWeight: 600,
          color: "var(--text)", textAlign: "left",
          fontFamily: "'Source Serif 4', Georgia, serif",
        }}
      >
        <ChevronIcon open={open} />
        {icon && <span style={{ color: "var(--text-muted)" }}>{icon}</span>}
        {title}
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border-light)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", cursor: "help" }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <InfoIcon />
      {show && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 6px)", left: "50%",
          transform: "translateX(-50%)", padding: "8px 12px",
          background: "var(--text)", color: "var(--bg)", borderRadius: "6px",
          fontSize: "12px", lineHeight: "1.5", whiteSpace: "nowrap",
          zIndex: 100, pointerEvents: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
          {text}
        </div>
      )}
    </span>
  );
}

export default function FultonSearchBuilder() {
  const [mode, setMode] = useState(SEARCH_MODES.GUIDED);
  const [simpleQuery, setSimpleQuery] = useState("");
  const [booleanQuery, setBooleanQuery] = useState("");
  const [terms, setTerms] = useState([{ type: "phrase", value: "", operator: "AND" }]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [newspaper, setNewspaper] = useState("");
  const [state, setState] = useState("");
  const [copied, setCopied] = useState(false);
  const [showOCR, setShowOCR] = useState(false);

  const addTerm = () => {
    setTerms([...terms, { type: "phrase", value: "", operator: "AND" }]);
  };

  const updateTerm = (index, newTerm) => {
    const updated = [...terms];
    updated[index] = newTerm;
    setTerms(updated);
  };

  const removeTerm = (index) => {
    if (terms.length <= 1) return;
    setTerms(terms.filter((_, i) => i !== index));
  };

  const buildGuidedQuery = useCallback(() => {
    const parts = [];

    terms.forEach((term, i) => {
      if (!term.value.trim()) return;
      const val = term.value.trim();
      let fragment = "";

      if (term.type === "phrase") {
        fragment = `"${val}"`;
      } else if (term.type === "proximity") {
        fragment = val; // User types e.g. "Smith w/3 married"
      } else if (term.type === "wildcard") {
        fragment = val;
      } else {
        fragment = val;
      }

      if (i === 0) {
        parts.push(fragment);
      } else {
        parts.push(`${term.operator} ${fragment}`);
      }
    });

    // Add filters
    const filters = [];
    if (dateFrom && dateTo) {
      filters.push(`(filename contains (${dateFrom}~~${dateTo}))`);
    } else if (dateFrom) {
      filters.push(`(filename contains (${dateFrom}~~2025))`);
    } else if (dateTo) {
      filters.push(`(filename contains (1795~~${dateTo}))`);
    }

    if (newspaper.trim()) {
      filters.push(`(filename contains (${newspaper.trim()}))`);
    }

    if (state.trim()) {
      filters.push(`(filename contains (${state.trim()}))`);
    }

    const mainQuery = parts.join(" ");
    if (filters.length > 0) {
      return mainQuery + " AND " + filters.join(" AND ");
    }
    return mainQuery;
  }, [terms, dateFrom, dateTo, newspaper, state]);

  const getFinalQuery = () => {
    if (mode === SEARCH_MODES.SIMPLE) return simpleQuery;
    if (mode === SEARCH_MODES.BOOLEAN) return booleanQuery;
    return buildGuidedQuery();
  };

  const getSearchType = () => {
    if (mode === SEARCH_MODES.SIMPLE) return "all";
    return "boolean";
  };

  const launchSearch = () => {
    const query = getFinalQuery();
    if (!query.trim()) return;
    // Open Fulton History in new tab - user pastes query
    window.open("https://fultonhistory.com/Fulton.html", "_blank");
  };

  const copyQuery = async () => {
    const query = getFinalQuery();
    if (!query.trim()) return;
    try {
      await navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = query;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const finalQuery = getFinalQuery();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root {
          --bg: #FAF7F2;
          --surface: #FFFFFF;
          --surface-alt: #F5F1EB;
          --border: #D6CEBE;
          --border-light: #E8E2D8;
          --text: #2C2418;
          --text-muted: #7A6E5E;
          --accent: #8B4513;
          --accent-hover: #A0522D;
          --accent-light: #F0E6DA;
          --danger: #A04030;
          --success: #4A7A4A;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Source Serif 4', Georgia, serif;
          -webkit-font-smoothing: antialiased;
        }

        input, select, textarea, button {
          font-family: inherit;
          outline: none;
        }

        input:focus, select:focus, textarea:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 2px var(--accent-light) !important;
        }

        ::placeholder { color: var(--text-muted); opacity: 0.6; }

        .mode-tab {
          padding: 8px 16px;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          color: var(--text-muted);
          transition: all 0.15s ease;
          font-weight: 400;
        }
        .mode-tab:first-child { border-radius: 6px 0 0 6px; }
        .mode-tab:last-child { border-radius: 0 6px 6px 0; }
        .mode-tab + .mode-tab { border-left: none; }
        .mode-tab.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #FFF;
          font-weight: 600;
        }
        .mode-tab:hover:not(.active) {
          background: var(--surface-alt);
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 6px;
          border: none; background: var(--accent); color: #FFF;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: background 0.15s ease;
          font-family: 'Source Serif 4', Georgia, serif;
        }
        .btn-primary:hover { background: var(--accent-hover); }
        .btn-primary:disabled { opacity: 0.4; cursor: default; }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 6px;
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text); font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.15s ease;
          font-family: 'Source Serif 4', Georgia, serif;
        }
        .btn-secondary:hover { background: var(--surface-alt); border-color: var(--accent); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 10px; border-radius: 4px;
          border: none; background: transparent;
          color: var(--accent); font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background 0.15s ease;
          font-family: 'Source Serif 4', Georgia, serif;
        }
        .btn-ghost:hover { background: var(--accent-light); }

        .preview-box {
          padding: 14px 16px;
          background: var(--surface-alt);
          border: 1px solid var(--border-light);
          border-radius: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: var(--text);
          min-height: 48px;
          word-break: break-all;
        }

        .hint {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
          font-style: italic;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.3s ease forwards;
        }

        .ocr-table td, .ocr-table th {
          padding: 6px 12px;
          text-align: left;
          border-bottom: 1px solid var(--border-light);
          font-size: 13px;
        }
        .ocr-table th {
          font-weight: 600;
          color: var(--text-muted);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div style={{
        maxWidth: "760px", margin: "0 auto", padding: "40px 24px 60px",
      }}>
        {/* Header */}
        <header style={{ marginBottom: "32px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "6px",
          }}>
            <span style={{ fontSize: "22px", letterSpacing: "-0.5px", fontWeight: 700, color: "var(--text)" }}>
              Fulton History
            </span>
            <span style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px",
              textTransform: "uppercase", color: "var(--accent)",
              padding: "2px 8px", border: "1px solid var(--accent)",
              borderRadius: "3px",
            }}>
              Search Builder
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>
            Construct search queries for <a href="https://fultonhistory.com" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent-light)" }}>
              fultonhistory.com</a>'s 47+ million historical newspaper pages. Build your query below, then copy it to the site.
          </p>
        </header>

        {/* Mode Selector */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex" }}>
            <button className={`mode-tab ${mode === SEARCH_MODES.GUIDED ? "active" : ""}`}
              onClick={() => setMode(SEARCH_MODES.GUIDED)}>Guided Builder</button>
            <button className={`mode-tab ${mode === SEARCH_MODES.BOOLEAN ? "active" : ""}`}
              onClick={() => setMode(SEARCH_MODES.BOOLEAN)}>Boolean (Raw)</button>
            <button className={`mode-tab ${mode === SEARCH_MODES.SIMPLE ? "active" : ""}`}
              onClick={() => setMode(SEARCH_MODES.SIMPLE)}>Simple</button>
          </div>
        </div>

        {/* Simple Mode */}
        {mode === SEARCH_MODES.SIMPLE && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Search terms
              </label>
              <input
                type="text"
                value={simpleQuery}
                onChange={(e) => setSimpleQuery(e.target.value)}
                placeholder='e.g. "John Smith" Oswego'
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "6px",
                  border: "1px solid var(--border)", background: "var(--surface)",
                  fontSize: "15px",
                }}
              />
              <p className="hint" style={{ marginTop: "6px" }}>
                Use "quotes" for exact phrases. Fulton History will search all words.
              </p>
            </div>
          </div>
        )}

        {/* Boolean Mode */}
        {mode === SEARCH_MODES.BOOLEAN && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Boolean query
              </label>
              <textarea
                value={booleanQuery}
                onChange={(e) => setBooleanQuery(e.target.value)}
                placeholder={'e.g. "John Smith" AND (obituary OR death) AND (filename contains (Rochester)) AND (filename contains (1890~~1910))'}
                rows={4}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "6px",
                  border: "1px solid var(--border)", background: "var(--surface)",
                  fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: "1.6", resize: "vertical",
                }}
              />
              <p className="hint" style={{ marginTop: "6px" }}>
                Operators: AND, OR, NOT, w/N (proximity), ? (single-char wildcard), * (multi-char wildcard).
                Date range: <code style={{ background: "var(--surface-alt)", padding: "1px 4px", borderRadius: "2px" }}>filename contains (1890~~1920)</code>
              </p>
            </div>
          </div>
        )}

        {/* Guided Mode */}
        {mode === SEARCH_MODES.GUIDED && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Search Terms */}
            <div style={{
              border: "1px solid var(--border)", borderRadius: "8px",
              overflow: "hidden", background: "var(--surface)",
            }}>
              <div style={{
                padding: "12px 16px", borderBottom: "1px solid var(--border-light)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Search Terms</span>
                <button className="btn-ghost" onClick={addTerm}>
                  <PlusIcon /> Add term
                </button>
              </div>
              <div style={{ padding: "8px" }}>
                {terms.map((term, i) => (
                  <TermRow
                    key={i}
                    term={term}
                    index={i}
                    onUpdate={updateTerm}
                    onRemove={removeTerm}
                    canRemove={terms.length > 1}
                  />
                ))}
              </div>
            </div>

            {/* Filters */}
            <Panel title="Filters — Date Range, Newspaper, State" defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "12px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "end" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--text-muted)" }}>
                      Year from <Tooltip text="4-digit year, e.g. 1890" />
                    </label>
                    <input
                      type="text"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="1850"
                      maxLength={4}
                      style={{
                        width: "100%", padding: "8px 10px", borderRadius: "4px",
                        border: "1px solid var(--border)", background: "var(--surface)",
                        fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    />
                  </div>
                  <span style={{ paddingBottom: "10px", color: "var(--text-muted)", fontWeight: 600 }}>—</span>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--text-muted)" }}>
                      Year to <Tooltip text="4-digit year, e.g. 1920" />
                    </label>
                    <input
                      type="text"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="1920"
                      maxLength={4}
                      style={{
                        width: "100%", padding: "8px 10px", borderRadius: "4px",
                        border: "1px solid var(--border)", background: "var(--surface)",
                        fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--text-muted)" }}>
                    Newspaper name <Tooltip text="Partial name works, e.g. 'Rochester' or 'Daily Eagle'" />
                  </label>
                  <input
                    type="text"
                    value={newspaper}
                    onChange={(e) => setNewspaper(e.target.value)}
                    placeholder="e.g. Brooklyn Daily Eagle"
                    style={{
                      width: "100%", padding: "8px 10px", borderRadius: "4px",
                      border: "1px solid var(--border)", background: "var(--surface)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--text-muted)" }}>
                    State code <Tooltip text="Two-letter code, e.g. NY, MA, PA" />
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2))}
                    placeholder="NY"
                    maxLength={2}
                    style={{
                      width: "80px", padding: "8px 10px", borderRadius: "4px",
                      border: "1px solid var(--border)", background: "var(--surface)",
                      fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace",
                      textTransform: "uppercase",
                    }}
                  />
                </div>
              </div>
            </Panel>
          </div>
        )}

        {/* Query Preview */}
        <div style={{ marginTop: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600 }}>
              {mode === SEARCH_MODES.GUIDED ? "Generated Query" : "Your Query"}
            </label>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {mode !== SEARCH_MODES.SIMPLE ? "Paste as Boolean search on Fulton History" : "Paste as search on Fulton History"}
            </span>
          </div>
          <div className="preview-box">
            {finalQuery || <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Your query will appear here…</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={copyQuery} disabled={!finalQuery.trim()}>
            <CopyIcon />
            {copied ? "Copied!" : "Copy Query"}
          </button>
          <button className="btn-secondary" onClick={launchSearch} disabled={!finalQuery.trim()}>
            <ExternalIcon />
            Open Fulton History
          </button>
        </div>

        {/* How-to note */}
        <div style={{
          marginTop: "16px", padding: "12px 16px",
          background: "var(--accent-light)", borderRadius: "6px",
          fontSize: "13px", color: "var(--text)", lineHeight: "1.6",
          borderLeft: "3px solid var(--accent)",
        }}>
          <strong>How to use:</strong> Copy your query → open Fulton History → select <strong>"Boolean"</strong> from
          the dropdown (instead of "all of the words") → paste your query → click Search.
        </div>

        {/* Reference Sections */}
        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Panel title="OCR Pitfalls & Common Misreads">
            <div style={{ paddingTop: "12px" }}>
              <p style={{ fontSize: "13px", lineHeight: "1.6", marginBottom: "12px", color: "var(--text-muted)" }}>
                Historical newspapers are scanned from microfilm and processed with OCR.
                Characters are frequently misread. When a name search fails, try these common substitutions:
              </p>
              <table className="ocr-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Original</th>
                    <th>Misread as</th>
                    <th>Tip</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_OCR_SWAPS.map((swap, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{swap.from}</td>
                      <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{swap.to}</td>
                      <td style={{ color: "var(--text-muted)" }}>{swap.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px", fontStyle: "italic" }}>
                Use the <code style={{ background: "var(--surface-alt)", padding: "1px 4px", borderRadius: "2px" }}>?</code> wildcard
                to catch single-character OCR errors: <code style={{ background: "var(--surface-alt)", padding: "1px 4px", borderRadius: "2px" }}>Sm?th</code> matches Smith, Smlth, Snith, etc.
              </p>
            </div>
          </Panel>

          <Panel title="Boolean Syntax Quick Reference">
            <div style={{ paddingTop: "12px" }}>
              <table className="ocr-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr><th>Syntax</th><th>Meaning</th><th>Example</th></tr>
                </thead>
                <tbody>
                  {[
                    ['"…"', "Exact phrase", '"John Smith"'],
                    ["AND", "Both terms required", '"Smith" AND obituary'],
                    ["OR", "Either term matches", "Catherine OR Catharine"],
                    ["AND NOT", "Exclude a term", '"Smith" AND NOT advertisement'],
                    ["w/N", "Within N words", "Smith w/3 married"],
                    ["?", "Single-char wildcard", "Gard?nier"],
                    ["*", "Multi-char wildcard", "Smith*"],
                    ["(…)", "Grouping", "(death OR died OR obituary)"],
                    ["filename contains", "Restrict by filename", "(filename contains (Rochester))"],
                    ["YYYY~~YYYY", "Date range in filename", "(filename contains (1890~~1910))"],
                  ].map(([syntax, meaning, example], i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, whiteSpace: "nowrap" }}>{syntax}</td>
                      <td>{meaning}</td>
                      <td style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--text-muted)" }}>{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Search Tips for Genealogy Research">
            <div style={{ paddingTop: "12px", fontSize: "13px", lineHeight: "1.7", color: "var(--text)" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Start broad, then narrow.</strong> Begin with just a surname and location, then add date ranges
                and additional terms once you see results. Over-specifying up front risks missing articles with OCR errors.
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Use proximity search for names.</strong> Instead of an exact phrase, try{" "}
                <code style={{ background: "var(--surface-alt)", padding: "1px 4px", borderRadius: "2px" }}>John w/2 Smith</code>{" "}
                to catch middle names and initials like "John A. Smith" or "John Calvin Smith."
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Account for spelling variants.</strong> Historical spellings varied widely. Use OR to combine alternatives:{" "}
                <code style={{ background: "var(--surface-alt)", padding: "1px 4px", borderRadius: "2px" }}>(Schneider OR Snyder OR Schnieder)</code>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Search off-peak hours.</strong> The site runs on limited bandwidth. Late evenings and early mornings
                tend to be faster.
              </p>
              <p>
                <strong>Check surrounding pages.</strong> When you find a result, the page number is in the filename
                (the last 4 digits). Subtract or add to navigate to adjacent pages for context.
              </p>
            </div>
          </Panel>
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: "40px", paddingTop: "20px",
          borderTop: "1px solid var(--border-light)",
          fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.6",
        }}>
          This tool builds search queries for <a href="https://fultonhistory.com" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none" }}>fultonhistory.com</a>,
          an extraordinary free resource created by Tom Tryniski containing 47+ million digitized newspaper pages.
          No data is sent to or from Fulton History by this tool — it only helps you compose queries.
        </footer>
      </div>
    </>
  );
}