import React, { useState, useEffect } from 'react';
import { Problem, Idea } from './types';
import { getStoredProblems, addStoredProblem, INITIAL_IDEAS } from './data/mockData';
import { fetchProblems, fetchIdeas } from './services/data';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { ProblemExplorer } from './pages/ProblemExplorer';
import { JharkhandDashboard } from './pages/JharkhandDashboard';
import { IdeasSolutions } from './pages/IdeasSolutions';
import { TrackProblem } from './pages/TrackProblem';
import { SubmitProblem } from './pages/SubmitProblem';
import { Leaderboard } from './pages/Leaderboard';
import { Partners } from './pages/Partners';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProblemDetail } from './pages/ProblemDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { GlobalSearch } from './pages/GlobalSearch';
import { NotificationsView } from './pages/NotificationsView';
import { CitizenProfile } from './pages/dashboards/CitizenProfile';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { UniversityDashboard } from './pages/dashboards/UniversityDashboard';
import { IndustryDashboard } from './pages/dashboards/IndustryDashboard';
import { GovernmentDashboard } from './pages/dashboards/GovernmentDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

function getRouteFromHash() {
  const hash = window.location.hash || '#/home';
  const cleanHash = hash.replace(/^#\/?/, '').split('?')[0];
  const parts = cleanHash.split('/');
  return { route: parts[0] || 'home', param: parts[1] || '' };
}

export function App() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash().route);
  const [routeParam, setRouteParam] = useState(getRouteFromHash().param);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((current) => current === msg ? null : current), 3800);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [liveProblems, liveIdeas] = await Promise.all([fetchProblems(), fetchIdeas()]);
        setProblems(liveProblems);
        setIdeas(liveIdeas);
      } catch (error) {
        console.error(error);
        setDataError(error instanceof Error ? error.message : 'Unable to load live data.');
        setProblems(getStoredProblems());
        setIdeas(INITIAL_IDEAS);
      }
    };
    void load();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const { route, param } = getRouteFromHash();
      setCurrentRoute(route);
      setRouteParam(param);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string, param?: string) => {
    window.location.hash = param ? `#/${route}/${param}` : `#/${route}`;
  };

  const handleProblemSubmitted = (newProblem: Problem) => {
    addStoredProblem(newProblem);
    setProblems((prev) => [newProblem, ...prev]);
  };

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home': return <Home problems={problems} ideas={ideas} navigate={navigate} showToast={showToast} />;
      case 'about': return <About navigate={navigate} />;
      case 'how': return <HowItWorks />;
      case 'explorer': return <ProblemExplorer problems={problems} navigate={navigate} />;
      case 'jharkhand': return <JharkhandDashboard problems={problems} navigate={navigate} />;
      case 'ideas': return <IdeasSolutions ideas={ideas} navigate={navigate} showToast={showToast} />;
      case 'track': return <TrackProblem problems={problems} navigate={navigate} />;
      case 'submit': return <SubmitProblem onProblemSubmitted={handleProblemSubmitted} navigate={navigate} showToast={showToast} />;
      case 'leaderboard': return <Leaderboard />;
      case 'partners': return <Partners navigate={navigate} />;
      case 'login': return <Login navigate={navigate} showToast={showToast} />;
      case 'register': return <Register navigate={navigate} showToast={showToast} />;
      case 'problem': return <ProblemDetail problemId={routeParam} problems={problems} ideas={ideas} navigate={navigate} showToast={showToast} />;
      case 'project': return <ProjectDetail ideaId={routeParam} ideas={ideas} navigate={navigate} showToast={showToast} />;
      case 'search': return <GlobalSearch problems={problems} ideas={ideas} navigate={navigate} />;
      case 'notifications': return <NotificationsView navigate={navigate} showToast={showToast} />;
      case 'dashboard-citizen': return <CitizenProfile problems={problems} navigate={navigate} />;
      case 'dashboard-student': return <StudentDashboard problems={problems} ideas={ideas} navigate={navigate} showToast={showToast} />;
      case 'dashboard-university': return <UniversityDashboard problems={problems} navigate={navigate} />;
      case 'dashboard-industry': return <IndustryDashboard ideas={ideas} navigate={navigate} showToast={showToast} />;
      case 'dashboard-government': return <GovernmentDashboard problems={problems} navigate={navigate} showToast={showToast} />;
      case 'admin': return <AdminDashboard problems={problems} showToast={showToast} />;
      default: return <Home problems={problems} ideas={ideas} navigate={navigate} showToast={showToast} />;
    }
  };

  const isAuthPage = currentRoute === 'login' || currentRoute === 'register';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentRoute={currentRoute} navigate={navigate} />
      {dataError && <div className="toast" role="alert">Live database unavailable: {dataError}</div>}
      <main style={{ flex: 1 }}>{renderCurrentView()}</main>
      {!isAuthPage && <Footer navigate={navigate} />}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}

export default App;
