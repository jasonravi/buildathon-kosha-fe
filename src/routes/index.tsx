import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Protected from './protected';

import Recommendation from '../pages/recommendation/recommendation';
import WealthProfile from '../pages/wealthProfile/wealthProfile';

const Splash = lazy(() => import('../pages/splash/splash'));
const Login = lazy(() => import('../pages/login/login'));
const onBoarding = lazy(() => import('../pages/onboarding/onboarding'));
const Home = lazy(() => import('../pages/home/home'));
const About = lazy(() => import('../pages/about/about'));
const Voice = lazy(() => import('../pages/voice-to-text/voice'));
const Charts = lazy(() => import('../pages/charts/charts'));
const profile = lazy(() => import('../pages/onboarding/profile/profile'));
const AddGoal = lazy(() => import('../pages/goal/AddGoal'));

const ROUTERS = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Protected />}>
        <Route index Component={Splash} />
        <Route path="/login" Component={Login} />
        <Route path="/onBoarding" Component={onBoarding} />
        <Route path="/home" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/voice" Component={Voice} />
        <Route path="/charts" Component={Charts} />
        <Route path="/profile" Component={profile} />
        <Route path="/wealthProfile" Component={WealthProfile} />
        <Route path="/goal" Component={AddGoal} />
        <Route path="/recommendation" Component={Recommendation} />

        {/* All other routes that you want to protect will go inside here */}
      </Route>
    </Route>,
  ),
);

function BootstrapRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="routes-container">
        <RouterProvider router={ROUTERS} />
      </div>
    </Suspense>
  );
}

export default BootstrapRoutes;
