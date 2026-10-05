import { useEffect, useState } from 'react';
import logo from '../assets/brand/vl-logo.png';

const SESSION_KEY = 'vl:intro-seen';
type Phase = 'visible' | 'leaving' | 'hidden';

export default function SiteIntro() {
  const searchParams = new URLSearchParams(window.location.search);
  const holdIntro = searchParams.get('introHold') === '1';
  const forcePreview = searchParams.get('intro') === 'preview' || holdIntro;
  const [phase, setPhase] = useState<Phase>(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reducedMotion || (!forcePreview && sessionStorage.getItem(SESSION_KEY) === 'yes') ? 'hidden' : 'visible';
  });
  useEffect(() => {
    if (phase !== 'visible') return;
    if (!forcePreview) sessionStorage.setItem(SESSION_KEY, 'yes');
    if (holdIntro) return;
    const leaveTimer = window.setTimeout(() => setPhase('leaving'), 1050);
    const hideTimer = window.setTimeout(() => setPhase('hidden'), 1300);
    return () => { window.clearTimeout(leaveTimer); window.clearTimeout(hideTimer); };
  }, [forcePreview, holdIntro, phase]);

  if (phase === 'hidden') return null;
  return <div className={'site-intro' + (phase === 'leaving' ? ' site-intro--leaving' : '')} aria-hidden="true"><img className="site-intro__logo" src={logo} alt="" /></div>;
}
