/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import Loader from './components/common/Loader';
import { setTheme } from './redux/features/authStateSlice';
import { useAppDispatch } from './redux/redux-hooks';
import { routeObjects } from './routes/AppRoutes';
import system from './services/superadmin/SystemConfig';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPageLoader, setIsPageLoader] = useState(false);
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  useEffect(() => {
    setIsPageLoader(false);
    system
      .getSystemConfigDefault()
      .then((res) => {
        // console.log('RES', res.data);
        setIsPageLoader(false);
        if (res.data.success) {
          dispatch(setTheme(res.data.data.value.themeColor));
        } else {
          setIsPageLoader(false);
          navigate('./admin/auth/404', { replace: true });
          // showNotification(res.data.message, 'error');
          // console.log('404 page');
        }
      })
      .catch(() => {
        setIsPageLoader(false);
        navigate('./admin/auth/404', { replace: true });
        // showNotification(err.message, 'error');
      });
  }, []);

  const routes = useRoutes(routeObjects);
  return !isPageLoader ? routes : <Loader />;
}

export default App;
