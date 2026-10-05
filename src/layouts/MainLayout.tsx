import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AgeGate from '../components/AgeGate';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import SearchOverlay from '../components/SearchOverlay';
import ErrorBoundary from '../components/ErrorBoundary';
import AuthModal from '../components/AuthModal';
import ScrollTop from '../components/ScrollTop';
import { MotionCoordinator, useSoftMorph } from '../motion/softMorph';
export default function MainLayout() {
  const search = useSoftMorph();
  const auth = useSoftMorph();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <MotionCoordinator />
      <AgeGate />
      <Header onSearch={search.open} onAuth={auth.open} />
      <main key={pathname} className="page soft-morph-page"><ErrorBoundary><Outlet /></ErrorBoundary></main>
      <Footer />
      <BottomNav />
      <ScrollTop />
      {search.present && <SearchOverlay onClose={search.close} phase={search.phase} originStyle={search.style} surfaceRef={search.ref} />}
      {auth.present && <AuthModal onClose={auth.close} phase={auth.phase} originStyle={auth.style} surfaceRef={auth.ref} />}
    </>
  );
}
