'use client';
import { MODULES } from '@/data/ledgerContent';
import { LedgerProgress } from '@/hooks/useLedgerProgress';
import { IconArrowLeft, IconCheck, ILLUSTRATIONS } from './icons/ModuleIcons';

interface ModuleDetailProps {
  moduleIndex: number;
  progress: LedgerProgress;
  onToggleCleared: (id: string) => void;
  onBack: () => void;
  onNavigate: (index: number) => void;
}

export default function ModuleDetail({ moduleIndex, progress, onToggleCleared, onBack, onNavigate }: ModuleDetailProps) {
  const mod = MODULES[moduleIndex];
  const isCleared = progress.clearedModules.includes(mod.id);
  const Illustration = ILLUSTRATIONS[mod.id];
  const hasPrev = moduleIndex > 0;
  const hasNext = moduleIndex < MODULES.length - 1;

  return (
    <div className="l-detail" style={{ '--mod-color': mod.color } as React.CSSProperties}>

      <div className="l-detail__topbar">
        <button className="l-detail__back" onClick={onBack} aria-label="Back to guide">
          <IconArrowLeft size={16} />
        </button>
        <span className="l-detail__entry">
          ENTRY {mod.id} / {String(MODULES.length).padStart(2, '0')}
        </span>
        <button
          className={`l-detail__clear-btn${isCleared ? ' l-detail__clear-btn--cleared' : ''}`}
          onClick={() => onToggleCleared(mod.id)}
        >
          {isCleared ? 'Cleared ✓' : 'Mark cleared'}
        </button>
      </div>

      <div className="l-detail__header">
        <span className="l-detail__bg-num" aria-hidden="true">{mod.id}</span>
        <div className="l-detail__code">{mod.code} · ENTRY {mod.id}</div>
        <h2 className="l-detail__title">{mod.title}</h2>
        <div className="l-detail__time">{mod.readTime} read</div>
      </div>

      <div className="l-detail__illus">
        <Illustration color={mod.color} />
      </div>

      <div className="l-detail__content">
        {mod.body.map((para, i) => (
          <p key={i} className="l-para">{para}</p>
        ))}

        <div className="l-callout l-callout--key">
          <div className="l-callout__label">Key takeaway</div>
          <div className="l-callout__text">{mod.takeaway}</div>
        </div>

        {mod.redFlag && (
          <div className="l-callout l-callout--danger">
            <div className="l-callout__label">⚠ Red flag</div>
            <div className="l-callout__text">{mod.redFlag}</div>
          </div>
        )}

        {mod.chips.length > 0 && (
          <div className="l-chips">
            {mod.chips.map(chip => (
              <span key={chip} className="l-chip">{chip}</span>
            ))}
          </div>
        )}

        {mod.quote && (
          <div className="l-callout l-callout--quote">
            <div className="l-callout__text">&ldquo;{mod.quote}&rdquo;</div>
          </div>
        )}
      </div>

      <div className="l-detail__nav">
        <button
          className="l-nav-btn"
          onClick={() => hasPrev && onNavigate(moduleIndex - 1)}
          disabled={!hasPrev}
        >
          <span className="l-nav-btn__dir">← Prev</span>
          {hasPrev && (
            <span className="l-nav-btn__title">{MODULES[moduleIndex - 1].title}</span>
          )}
        </button>
        <button
          className="l-nav-btn l-nav-btn--next"
          onClick={() => hasNext && onNavigate(moduleIndex + 1)}
          disabled={!hasNext}
        >
          <span className="l-nav-btn__dir">Next →</span>
          {hasNext && (
            <span className="l-nav-btn__title">{MODULES[moduleIndex + 1].title}</span>
          )}
        </button>
      </div>
    </div>
  );
}
