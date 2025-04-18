import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import Notify from '../../../components/common/Notify';
import { UserLogin } from '../../../interfaces/auth.interface';
import { setItemState } from '../../../redux/features/appStateSlice';
import { login } from '../../../redux/features/authStateSlice';
import { useAppDispatch } from '../../../redux/redux-hooks';
import auth from '../../../services/adminapp/admin';
import { setItem } from '../../../utils/storage';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notification, hideNotification, showNotification } =
    useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginHandler = async () => {
    setIsLoader(true);
    const userData: UserLogin = {
      username: email,
      password,
    };
    await auth
      .loginService(userData)
      .then(async (user) => {
        if (user && user.data.success) {
          const newUserData = user.data.data;
          setIsLoader(false);
          setItem('AUTH_TOKEN', newUserData.token);
          setItem('REFRESH_TOKEN', newUserData.token);
          dispatch(login(newUserData));
          dispatch(setItemState(newUserData));
          navigate('../../../main');
        } else {
          setIsLoader(false);
          showNotification(user.data.message, 'error');
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showNotification(err.message, 'error');
      });
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-[#F0F0F0]">
        <div className="h-full w-[40%] px-[30px]">
          <div className="w-full max-w-[200px] px-[25px] py-[40px]">
            <img src={assets.images.mdaiderlogo} alt="urlaundry" />
          </div>
          <div className="pt-[150px]">
            <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
              log in
            </h1>
            <div className="">
              <div className="form-group w-full">
                <label
                  htmlFor="email"
                  className="mb-1 font-sans text-[14px] font-normal leading-[normal] text-[#06152B]"
                >
                  Email
                </label>
                <FormControl className="m-1 w-full" variant="standard">
                  <Input
                    className="border-1 border-solid border-secondary"
                    id="email"
                    type="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    disableUnderline
                  />
                </FormControl>
              </div>
              <div className="form-group w-full">
                <label htmlFor="password">Password</label>
                <FormControl className="m-1 w-full" variant="filled">
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
              </div>
              {/* <div className="form-group self-end">
                <NavLink
                  className="font-open-sans text-sm font-normal text-neutral-900"
                  to="../forgot-password"
                >
                  Forget Password?
                </NavLink>
              </div> */}
              <div className="mt-8 w-full px-4">
                <Button
                  disabled={!!isLoader}
                  className="w-full bg-[#3800F1] px-16 py-2 text-gray-50"
                  variant="contained"
                  color="inherit"
                  title="Login"
                  onClick={loginHandler}
                >
                  {!isLoader ? (
                    `Login`
                  ) : (
                    <CircularProgress color="inherit" size={24} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] p-3">
          <div className="mx-auto w-[800px] rounded-lg">
            <img
              src={assets.images.superadminbg}
              alt="urlaundry"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      {notification && (
        <Notify
          isOpen
          setIsOpen={hideNotification}
          displayMessage={notification}
        />
      )}
    </>
  );
}
export default memo(LoginPage);
