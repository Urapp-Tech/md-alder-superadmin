import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import { NewPassword } from '../../../interfaces/auth.interface';
import { login } from '../../../redux/features/authStateSlice';
import { useAppDispatch } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/admin';
import AlertBox from '../../../utils/Alert';
import { setItem } from '../../../utils/storage';

function NewPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<NewPassword>();

  const onSubmit = (data: NewPassword) => {
    setIsLoader(true);
    if (data && data.password) {
      const newData = {
        password: data.password,
        code,
      };
      Service.createNewPassword(newData).then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          const newUserData = item.data.data;
          setItem('AUTH_TOKEN', newUserData.accessToken);
          setItem('REFRESH_TOKEN', newUserData.refreshToken);
          delete newUserData.role;
          dispatch(login(newUserData));
          if (newUserData.isSuperAdmin) {
            navigate('../../../main');
          } else {
            navigate('../../../dashboard');
          }
        } else {
          setIsLoader(false);
          setAlertMsg(item.data.message);
          setAlertSeverity('error');
          setShowAlert(true);
        }
      });
    }
  };

  const validatePassword = (val: any) => {
    if (password !== val) {
      setError('confirmPassword', {
        message: 'Passwords do not match',
      });
    } else {
      clearErrors('confirmPassword');
    }
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
            <img className="mb-6 mt-4" src={assets.images.logoBlack} alt="" />
            <div className="form-group w-full">
              <label htmlFor="password">New Password</label>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  className="input-with-icon after:border-b-secondary"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  onChange={(event: any) => {
                    setPassword(event.target.value);
                  }}
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
                {errors.password && (
                  <span role="alert">{errors.password?.message}</span>
                )}
              </FormControl>
            </div>
            <div className="form-group w-full">
              <label htmlFor="password">Confirm Password</label>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  className="input-with-icon after:border-b-secondary"
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                  })}
                  onChange={(event: any) => {
                    validatePassword(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
                {errors.confirmPassword && (
                  <span role="alert">{errors.confirmPassword?.message}</span>
                )}
              </FormControl>
            </div>
            <div className="py-6" />
            <div className="mt-8 w-full px-4">
              <Button
                type="submit"
                className="w-full bg-neutral-900 px-16 text-gray-50"
                variant="contained"
                color="inherit"
              >
                {!isLoader ? (
                  `Login`
                ) : (
                  <CircularProgress color="inherit" size={24} />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
    </>
  );
}

export default NewPasswordPage;
