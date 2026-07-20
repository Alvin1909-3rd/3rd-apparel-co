'use client';
import { useState, useMemo } from 'react';
import { GLOSSARY, RED_FLAGS, SECURITY_CHECKLIST } from '@/data/ledgerContent';
import { LedgerProgress } from '@/hooks/useLedgerProgress';
import { IconArrowLeft, IconCheck, IconChevronDown } from './icons/ModuleIcons';

const TABS = [
  { id: 'glossary', label: 'Glossary' },
  { id: 'redflags', label: 'Red Flags' },
  { id: 'security', label: 'Security' },
  { id: 'sizer',    label: 'Sizer' },
];

/* ─── Glossary ───────────────────────────────────────────────── */
function GlossaryTab() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return GLOSSARY;
    const q = query.toLowerCase();
    return GLOSSARY.filter(
      g => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (term: string) => setOpen(o => o === term ? null : term);

  return (
    <div>
      <input
        className="l-glossary__search"
        type="search"
        placeholder="Search terms…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search glossary"
      />
      <div className="l-glossary__list">
        {filtered.length === 0 && (
          <div className="l-glossary__empty">No matches found.</div>
        )}
        {filtered.map(g => (
          <div key={g.term} className="l-glossary__item">
            <button
              className="l-glossary__term-btn"
              onClick={() => toggle(g.term)}
              aria-expanded={open === g.term}
            >
              <span className="l-glossary__term">{g.term}</span>
              <span className={`l-glossary__chevron${open === g.term ? ' l-glossary__chevron--open' : ''}`}>
                <IconChevronDown size={14} />
              </span>
            </button>
            {open === g.term && (
              <div className="l-glossary__def">{g.def}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Checklist (shared by Red Flags + Security) ─────────────── */
interface ChecklistTabProps {
  items: string[];
  checked: number[];
  onToggle: (index: number) => void;
  variant: 'danger' | 'success';
}

function ChecklistTab({ items, checked, onToggle, variant }: ChecklistTabProps) {
  const count = checked.length;
  const pct = (count / items.length) * 100;

  return (
    <div>
      <div className="l-checklist__progress">
        <div className="l-checklist__progress-header">
          <span className="l-checklist__progress-label">
            {variant === 'danger' ? 'KNOW YOUR FLAGS' : 'SETUP PROGRESS'}
          </span>
          <span className="l-checklist__progress-count">{count} / {items.length}</span>
        </div>
        <div className="l-checklist__bar">
          <div
            className={`l-checklist__fill l-checklist__fill--${variant}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="l-checklist__list">
        {items.map((text, i) => {
          const isChecked = checked.includes(i);
          return (
            <div
              key={i}
              className="l-checklist__item"
              onClick={() => onToggle(i)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={e => e.key === ' ' && onToggle(i)}
            >
              <div className={`l-checklist__box${isChecked ? ` l-checklist__box--checked-${variant}` : ''}`}>
                {isChecked && <IconCheck size={11} color="#0E0E10" />}
              </div>
              <span className={`l-checklist__text${isChecked ? ' l-checklist__text--checked' : ''}`}>
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Position Sizer ─────────────────────────────────────────── */
function SizerTab() {
  const [budget, setBudget] = useState('');
  const [capPct, setCapPct] = useState(10);

  const numBudget = parseFloat(budget.replace(/,/g, '')) || 0;
  const maxPerPos = numBudget * (capPct / 100);
  const stableBuffer = numBudget * 0.20;

  const fmt = (n: number) =>
    n === 0
      ? '—'
      : n >= 1000
        ? `$${(n).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        : `$${n.toFixed(2)}`;

  return (
    <div className="l-sizer">
      <div className="l-sizer__field">
        <label className="l-sizer__label" htmlFor="sizer-budget">
          Total you can afford to lose
        </label>
        <div className="l-sizer__input-wrap">
          <span className="l-sizer__prefix">$</span>
          <input
            id="sizer-budget"
            className="l-sizer__input"
            type="number"
            inputMode="decimal"
            placeholder="0"
            min="0"
            value={budget}
            onChange={e => setBudget(e.target.value)}
          />
        </div>
      </div>

      <div className="l-sizer__field">
        <div className="l-sizer__label">Max in any single coin</div>
        <div className="l-sizer__slider-wrap">
          <div className="l-sizer__slider-row">
            <span className="l-sizer__label" style={{ color: 'var(--fg-faint)' }}>Concentration cap</span>
            <span className="l-sizer__slider-val">{capPct}%</span>
          </div>
          <input
            className="l-sizer__slider"
            type="range"
            min={5}
            max={25}
            step={1}
            value={capPct}
            onChange={e => setCapPct(Number(e.target.value))}
            aria-label="Max concentration per coin"
            style={{
              background: `linear-gradient(to right, var(--m01) ${((capPct - 5) / 20) * 100}%, var(--bg-surface) ${((capPct - 5) / 20) * 100}%)`
            }}
          />
          <div className="l-sizer__range-labels">
            <span>5% (conservative)</span>
            <span>25% (aggressive)</span>
          </div>
        </div>
      </div>

      <div className="l-sizer__outputs">
        <div className="l-sizer__output-row">
          <div className="l-sizer__output-label">A · Max per position</div>
          <div className="l-sizer__output-val">{fmt(maxPerPos)}</div>
        </div>
        <div className="l-sizer__output-row">
          <div className="l-sizer__output-label">B · Suggested stablecoin buffer (20%)</div>
          <div className="l-sizer__output-val">{fmt(stableBuffer)}</div>
        </div>
      </div>

      <p className="l-sizer__disclaimer">
        A discipline tool, not financial advice. Your risk, your call.
        Crypto profits are taxable — keep records from day one.
      </p>
    </div>
  );
}

/* ─── Toolkit shell ──────────────────────────────────────────── */
interface ToolkitProps {
  initialTab: string;
  progress: LedgerProgress;
  onToggleRedFlag: (index: number) => void;
  onToggleSecurity: (index: number) => void;
  onBack: () => void;
}

export default function Toolkit({ initialTab, progress, onToggleRedFlag, onToggleSecurity, onBack }: ToolkitProps) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="l-toolkit">
      <div className="l-toolkit__header">
        <button className="l-toolkit__back" onClick={onBack} aria-label="Back to guide">
          <IconArrowLeft size={16} />
        </button>
        <h2 className="l-toolkit__title">The Toolkit</h2>
      </div>

      <div className="l-toolkit__tabs" role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`l-toolkit__tab${tab === t.id ? ' l-toolkit__tab--active' : ''}`}
            onClick={() => setTab(t.id)}
            role="tab"
            aria-selected={tab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="l-toolkit__content">
        {tab === 'glossary' && <GlossaryTab />}
        {tab === 'redflags' && (
          <ChecklistTab
            items={RED_FLAGS}
            checked={progress.redFlagsChecked}
            onToggle={onToggleRedFlag}
            variant="danger"
          />
        )}
        {tab === 'security' && (
          <ChecklistTab
            items={SECURITY_CHECKLIST}
            checked={progress.securityChecked}
            onToggle={onToggleSecurity}
            variant="success"
          />
        )}
        {tab === 'sizer' && <SizerTab />}
      </div>
    </div>
  );
}
