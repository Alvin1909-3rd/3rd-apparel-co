'use client';
import { useState, useEffect, useRef } from 'react';
import { useLedgerProgress } from '@/hooks/useLedgerProgress';
import Onboarding from './Onboarding';
import Hub from './Hub';
import ModuleDetail from './ModuleDetail';
import Toolkit from './Toolkit';
import '@/styles/ledger.css';

type Scene = 'onboarding' | 'hub' | 'module' | 'toolkit';

export default function LedgerApp() {
  const { progress, markOnboardingSeen, toggleModule, toggleRedFlag, toggleSecurity, setTheme } =
    useLedgerProgress();

  const rootRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [scene, setScene] = useState<Scene>('hub');
  const [moduleIndex, setModuleIndex] = useState(0);
  const [toolkitTab, setToolkitTab] = useState('glossary');
  const [firstVisit, setFirstVisit] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  useEffect(() => {
    setHydrated(true);
    setScene(progress.onboardingSeen ? 'hub' : 'onboarding');
    setFirstVisit(!progress.onboardingSeen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.setAttribute('data-theme', progress.theme);
    }
  }, [progress.theme]);

  const navigate = (nextScene: Scene, extra: { moduleIndex?: number; toolkitTab?: string } = {}) => {
    setSceneKey(k => k + 1);
    if (extra.moduleIndex !== undefined) setModuleIndex(extra.moduleIndex);
    if (extra.toolkitTab !== undefined) setToolkitTab(extra.toolkitTab);
    setScene(nextScene);
  };

  const handleOnboardingComplete = () => {
    markOnboardingSeen();
    navigate('hub');
  };

  const openModule = (index: number) => {
    if (firstVisit) setFirstVisit(false);
    navigate('module', { moduleIndex: index });
  };

  const openToolkit = (tab = 'glossary') => {
    navigate('toolkit', { toolkitTab: tab });
  };

  const goHome = () => navigate('hub');

  const handleToggleTheme = () => {
    setTheme(progress.theme === 'dark' ? 'light' : 'dark');
  };

  if (!hydrated) {
    return <div className="ledger-root" ref={rootRef} data-theme="dark" />;
  }

  return (
    <div className="ledger-root" ref={rootRef} data-theme={progress.theme}>
      <div className="l-app">
        {scene === 'onboarding' && (
          <div key={sceneKey} className="l-scene">
            <Onboarding onComplete={handleOnboardingComplete} />
          </div>
        )}
        {scene === 'hub' && (
          <div key={sceneKey} className="l-scene">
            <Hub
              progress={progress}
              firstVisit={firstVisit}
              onOpenModule={openModule}
              onOpenToolkit={openToolkit}
              onToggleTheme={handleToggleTheme}
            />
          </div>
        )}
        {scene === 'module' && (
          <div key={sceneKey} className="l-scene">
            <ModuleDetail
              moduleIndex={moduleIndex}
              progress={progress}
              onToggleCleared={toggleModule}
              onBack={goHome}
              onNavigate={(i) => navigate('module', { moduleIndex: i })}
            />
          </div>
        )}
        {scene === 'toolkit' && (
          <div key={sceneKey} className="l-scene">
            <Toolkit
              initialTab={toolkitTab}
              progress={progress}
              onToggleRedFlag={toggleRedFlag}
              onToggleSecurity={toggleSecurity}
              onBack={goHome}
            />
          </div>
        )}
      </div>
    </div>
  );
}
