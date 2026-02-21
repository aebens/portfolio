import { useState, useEffect, useMemo, useCallback, useRef } from "react";

// ── SAMPLE DATA (proof of concept) ─────────────────────────
// Replace this with your actual data loader, e.g.:
//   const [entries, setEntries] = useState([]);
//   useEffect(() => { fetch('/api/dictionary').then(r=>r.json()).then(setEntries); }, []);
const SAMPLE_ENTRIES = [
  { term: "ABANDONMENT", origin: "In practice.", definition: "The surrender, relinquishment, disclaimer, or cession of property or of rights. The voluntary relinquishment of all right, title, claim, and possession, with the intention of not reclaiming it. The giving up of a thing absolutely, without reference to any particular person or purpose.", reference: "2 Bl. Comm. 9; 1 Strange, 445.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 2 },
  { term: "ABATEMENT", origin: "In pleading.", definition: "The effect produced upon an action at law, when the defendant pleads matter of fact showing that the suit cannot continue as brought, or the plaintiff is unable to maintain it in its present form. The destruction or removal of a nuisance by order of court.", reference: "3 Bl. Comm. 168.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 4 },
  { term: "ABDUCTION", origin: "In criminal law.", definition: "The offense of taking away a man's wife, child, or ward, by fraud and persuasion, or open violence. The unlawful taking or detention of any female for the purpose of marriage, concubinage, or prostitution.", reference: "4 Bl. Comm. 208.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 5 },
  { term: "ABSOLUTION", origin: "In the civil law.", definition: "A sentence whereby a party accused is declared innocent of the crime laid to his charge. In canon law, a juridical act whereby the clergy declare that the sins of such as are penitent are remitted.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 8 },
  { term: "ABSTRACT OF TITLE", origin: null, definition: "A condensed history of the title to land, consisting of a synopsis or summary of the material or operative portion of all the conveyances, of whatever kind or nature, which in any manner affect said land, or any estate or interest therein, together with a statement of all liens, charges, or liabilities to which the same may be subject.", reference: "Warvelle, Abstr. § 1.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 9 },
  { term: "ACCESSORY", origin: "In criminal law.", definition: "Contributing to or aiding in the commission of a crime. One who, not being present at the commission of a felonious offense, becomes guilty of such offense, not as a chief actor, but as a participator, as by command, advice, instigation, or concealment.", reference: "4 Bl. Comm. 35.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 11 },
  { term: "ACQUITTAL", origin: "In practice.", definition: "The legal and formal certification of the innocence of a person who has been charged with crime; a deliverance or setting free a person from a charge of guilt. A release, absolution, or discharge of an obligation or liability.", reference: "2 Co. Inst. 382.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 14 },
  { term: "ACT OF GOD", origin: null, definition: "Any misadventure or casualty is said to be caused by the act of God when it happens by the direct, immediate, and exclusive operation of the forces of nature, uncontrolled and uninfluenced by the power of man, and without human intervention, and is of such a character that it could not have been prevented or escaped from by any amount of foresight or prudence.", reference: "Story, Bailm. § 25.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 16 },
  { term: "ADJUDICATION", origin: null, definition: "The giving or pronouncing a judgment or decree in a cause; also the judgment given. The term is principally used in bankruptcy proceedings, the adjudication being the order which declares the debtor to be a bankrupt.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 19 },
  { term: "ADMIRALTY", origin: null, definition: "A court which has a very extensive jurisdiction of maritime causes, civil and criminal. In the full sense of the term, it has jurisdiction of all maritime causes, including prize and its incidents.", reference: "1 Kent, Comm. 353.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 20 },
  { term: "BAIL", origin: null, definition: "In practice. The sureties who procure the release of a person under arrest, by becoming responsible for his appearance at the time and place designated. Those persons who become sureties for the appearance of the defendant in court.", reference: "1 Burrill, Law Dict.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 50 },
  { term: "BANKRUPTCY", origin: null, definition: "The state or condition of one who is a bankrupt; the condition of one who has committed an act of bankruptcy, and is liable to be proceeded against by his creditors therefor, or of one whose circumstances are such that he is entitled, on his voluntary application, to take the benefit of the bankrupt laws.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 52 },
  { term: "BONA FIDE", origin: "Lat.", definition: "In or with good faith; honestly, openly, and sincerely; without deceit or fraud. Truly; actually; without simulation or pretense. Real, actual, genuine, and not feigned.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 58 },
  { term: "BURDEN OF PROOF", origin: null, definition: "In the law of evidence. The necessity or duty of affirmatively proving a fact or facts in dispute on an issue raised between the parties in a cause. The obligation of a party to establish by evidence a requisite degree of belief concerning a fact in the mind of the trier of fact or the court.", reference: "Best, Ev. § 261.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 61 },
  { term: "CAVEAT", origin: "Lat.", definition: "Let him beware. A formal notice or warning given by a party interested to a court, judge, or ministerial officer against the performance of certain acts within his power and jurisdiction. It may be understood as a caution, intimation, or warning, given to some officer.", reference: "2 Bl. Comm. 510.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 70 },
  { term: "CERTIORARI", origin: "Lat.", definition: "To be informed of. A writ of common law origin issued by a superior to an inferior court requiring the latter to produce a certified record of a particular case tried therein. The writ is issued in order that the court issuing the writ may inspect the proceedings and determine whether there have been any irregularities.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 73 },
  { term: "CONSIDERATION", origin: "In contracts.", definition: "The inducement to a contract. The cause, motive, price, or impelling influence which induces a contracting party to enter into a contract. The reason or material cause of a contract. Some right, interest, profit, or benefit accruing to one party, or some forbearance, detriment, loss, or responsibility given, suffered, or undertaken by the other.", reference: "Pars. Cont. 382.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 85 },
  { term: "CORPUS DELICTI", origin: "Lat.", definition: "The body of a crime. The body (material substance) upon which a crime has been committed, e.g., the corpse of a murdered man, the charred remains of a house burned down. In a derivative sense, the substance or foundation of a crime; the substantial fact that a crime has been committed.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 90 },
  { term: "DE FACTO", origin: "Lat.", definition: "In fact; in deed; actually. This phrase is used to characterize an officer, a government, a past action, or a state of affairs which exists actually and must be accepted for all practical purposes, but which is illegal or illegitimate.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 100 },
  { term: "DEPOSITION", origin: "In practice.", definition: "The testimony of a witness taken upon interrogatories, not in open court, but in pursuance of a commission to take testimony issued by a court, or under a general law or court rule on the subject, and reduced to writing and duly authenticated, and intended to be used upon the trial of an action in court.", reference: "3 Bl. Comm. 449.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 105 },
  { term: "DUE PROCESS", origin: null, definition: "Law in its regular course of administration through courts of justice. The guarantee of due process requires that every person have the protection of a fair trial; that is, a trial in which his rights are safeguarded.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 115 },
  { term: "EMINENT DOMAIN", origin: null, definition: "The right of the nation or state, or of those to whom the power has been lawfully delegated, to condemn private property for public use, and to appropriate the ownership and possession of such property for such use upon paying the owner a due compensation to be ascertained according to law.", reference: "Cooley, Const. Lim. 643.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 120 },
  { term: "ESTOPPEL", origin: null, definition: "A bar or impediment which precludes allegation or denial of a certain fact or state of facts, in consequence of previous allegation or denial or conduct or admission, or in consequence of a final adjudication of the matter in a court of law.", reference: "2 Smith, Lead. Cas. 778.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 125 },
  { term: "EX PARTE", origin: "Lat.", definition: "On one side only; by or for one party; done for, in behalf of, or on the application of, one party only. A judicial proceeding, order, injunction, etc., is said to be ex parte when it is taken or granted at the instance and for the benefit of one party only, and without notice to, or contestation by, any person adversely interested.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 128 },
  { term: "FIDUCIARY", origin: null, definition: "The term is derived from the Roman law, and means a person holding the character of a trustee, or a character analogous to that of a trustee, in respect to the trust and confidence involved in it and the scrupulous good faith and candor which it requires. A person is said to act in a fiduciary capacity when the business which he transacts, or the money or property which he handles, is not his own or for his own benefit, but for the benefit of another person.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 135 },
  { term: "HABEAS CORPUS", origin: "Lat.", definition: "You have the body. The name given to a variety of writs, having for their object to bring a party before a court or judge. The great writ of habeas corpus, the most celebrated writ in the English law, is the great remedy of the citizen or subject against arbitrary or illegal imprisonment; it is the mode by which the judicial power speedily and effectually protects the personal liberty of every individual.", reference: "3 Bl. Comm. 131.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 145 },
  { term: "INDICTMENT", origin: null, definition: "An accusation in writing found and presented by a grand jury, legally convoked and sworn, to the court in which it is impaneled, charging that a person therein named has done some act, or been guilty of some omission, which, by law, is a public offense, punishable on indictment.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 160 },
  { term: "JURISPRUDENCE", origin: "Lat. jurisprudentia.", definition: "The philosophy of law, or the science which treats of the principles of positive law and legal relations. The science of jurisprudence, the knowledge of the laws, customs, and rights of men in a state or community, necessary for the due administration of justice.", reference: "Aust. Jur. § 4.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 170 },
  { term: "LIEN", origin: "Fr.", definition: "A charge or security or incumbrance upon property. A claim or charge on property for payment of some debt, obligation, or duty. A qualified right of property which a creditor has in or over specific property of his debtor, as security for the debt or charge or for performance of some act.", reference: "2 Kent, Comm. 634.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 185 },
  { term: "MANDAMUS", origin: "Lat.", definition: "We command. This is the name of a writ which issues from a court of superior jurisdiction, and is directed to a private or municipal corporation, or any of its officers, or to an executive, administrative, or judicial officer, or to an inferior court, commanding the performance of a particular act therein specified.", reference: "3 Bl. Comm. 110.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 195 },
  { term: "NEGLIGENCE", origin: null, definition: "The omission to do something which a reasonable man, guided by those ordinary considerations which ordinarily regulate human affairs, would do, or the doing of something which a reasonable and prudent man would not do. The failure to use such care as a reasonably prudent and careful person would use under similar circumstances.", reference: "Blyth v. Birmingham Waterworks Co., 11 Ex. 784.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 210 },
  { term: "NOLO CONTENDERE", origin: "Lat.", definition: "I will not contest it. A plea in a criminal case which has a similar legal effect as pleading guilty. A plea by which the defendant in a criminal prosecution does not directly admit himself to be guilty, but tacitly admits it by throwing himself on the mercy of the court.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 212 },
  { term: "PRIMA FACIE", origin: "Lat.", definition: "At first sight; on the first appearance; on the face of it; so far as can be judged from the first disclosure; presumably. A fact presumed to be true unless disproved by some evidence to the contrary.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 230 },
  { term: "QUANTUM MERUIT", origin: "Lat.", definition: "As much as he deserved. In pleading, the common count in an action of assumpsit for work and labor, founded on an implied assumpsit or promise on the part of the defendant to pay the plaintiff as much as he reasonably deserved to have for his labor.", reference: "3 Bl. Comm. 161.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 240 },
  { term: "RESPONDEAT SUPERIOR", origin: "Lat.", definition: "Let the master answer. This maxim means that a master is liable in certain cases for the wrongful acts of his servant, and a principal for those of his agent. The doctrine which holds an employer or principal liable for the employee's or agent's wrongful acts committed within the scope of employment or agency.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 250 },
  { term: "STARE DECISIS", origin: "Lat.", definition: "To abide by, or adhere to, decided cases. The policy of courts to stand by precedent and not to disturb settled point. When a court has once laid down a principle of law as applicable to a certain state of facts, it will adhere to that principle, and apply it to all future cases, where facts are substantially the same.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 265 },
  { term: "SUBPOENA", origin: "Lat.", definition: "A process to cause a witness to appear and give testimony, commanding him to lay aside all pretenses and excuses, and appear before a court or magistrate therein named at a time therein mentioned to testify for the party named under a penalty therein mentioned.", reference: "3 Bl. Comm. 369.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 268 },
  { term: "TORT", origin: "Fr.", definition: "A private or civil wrong or injury, including action for bad faith breach of contract, for which the court will provide a remedy in the form of an action for damages. A violation of a duty imposed by general law or otherwise upon all persons occupying the relation to each other which is involved in a given transaction.", reference: "Cooley, Torts, 3.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 280 },
  { term: "ULTRA VIRES", origin: "Lat.", definition: "Beyond the powers. A term used to express the action of a corporation which is beyond the powers conferred upon it by its charter, or the statutes under which it was instituted. Acts beyond the scope of the powers of a corporation, as defined by its charter or laws of state of incorporation.", reference: null, source_file: "Black's Dictionary - Part 1.pdf", source_page: 290 },
  { term: "VENUE", origin: "Fr.", definition: "A neighborhood; the neighborhood, place, or county in which an injury is declared to have been done, or fact declared to have happened. The particular county, or geographical area, in which a court with jurisdiction may hear and determine a case.", reference: "3 Bl. Comm. 294.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 300 },
  { term: "WRIT", origin: null, definition: "An order issued from a court of justice requiring the performance of a specified act, or giving authority to have it done. In old English law, an instrument in the form of a letter; a letter or letters of a sovereign, government, court, or other competent authority, issued in the name of the state.", reference: "Co. Litt. 73b.", source_file: "Black's Dictionary - Part 1.pdf", source_page: 315 },
];

// ── HOOKS ───────────────────────────────────────────────────
function useDebounce(value, delay) {
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
export default function BlacksLawDictionary() {
  // ⬇ INTEGRATION POINT: swap SAMPLE_ENTRIES for your fetched data
  const [entries] = useState(SAMPLE_ENTRIES);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [page, setPage] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const listRef = useRef(null);
  const debouncedSearch = useDebounce(search, 200);

  const letterCounts = useMemo(() => {
    const c = {};
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

  const isSelected = (entry, i) =>
    selectedEntry && selectedEntry.term === entry.term && selectedEntry.definition === entry.definition;

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
              const sel = isSelected(entry, i);
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

const S = {
  root: {
    fontFamily: F.body, background: C.bg, color: C.ink,
    height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden",
  },

  header: { padding: "20px 28px 0", textAlign: "center", flexShrink: 0 },
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

  searchArea: { padding: "12px 28px 0", flexShrink: 0 },
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

  alphaNav: { padding: "10px 28px 8px", borderBottom: `1px solid ${C.rule}`, flexShrink: 0 },
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

  main: { flex: 1, display: "flex", minHeight: 0, overflow: "hidden" },

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