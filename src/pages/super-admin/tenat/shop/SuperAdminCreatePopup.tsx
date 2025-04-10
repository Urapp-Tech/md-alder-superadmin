import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../../../components/common/CustomMultipleSelect';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';
import { Tenant } from '../../../../interfaces/superadmin/tenant.interface';
import Theme from '../../../../services/superadmin/theme';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH,
} from '../../../../utils/constants';

type Props = {
  roles?: any;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  type?: boolean;
  isLoader?: boolean;
  setIsLoader?: any;
};

function SuperAdminTenantCreatePopup({
  roles,
  openFormDialog,
  setOpenFormDialog,
  setIsNotify,
  setNotifyMessage,
  type,
  setIsLoader,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<Tenant>();
  const [lovList, setLovList] = useState<any>();

  useEffect(() => {
    Theme.lovList()
      .then((item: any) => {
        if (item.data.success) {
          const temp = item.data.data.list.map((el: any) => {
            return {
              id: el.id,
              name: el.key,
            };
          });
          setLovList(temp);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error: any) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
        // console.log('error::::::::', error);
      });
  }, []);

  const onSubmit = (data: Partial<Tenant>) => {
    // console.log('datA', data);
    if (data.enableLoyaltyProgram === false) {
      delete data.loyaltyCoinConversionRate;
      delete data.requiredCoinsToRedeem;
    }
    if (data.tenantName) {
      setOpenFormDialog(false);
      callback(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog open={openFormDialog} onClose={handleFormClose} scroll="paper">
      <div className="Content p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <div className="FormHeader">
            <span className="Title">{type ? 'Add Branch' : 'Add Shop'}</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  Shop Name{' '}
                  <span className="text-xs text-gray-400">
                    ( max 150 characters )
                  </span>
                </label>
                <Input
                  className="FormInput"
                  type="text"
                  id="tenantName"
                  placeholder="Enter shop name"
                  disableUnderline
                  {...register('tenantName', {
                    required: true,
                    pattern: PATTERN.CHAR_NUM_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  // onChange={(val: any) => shopFieldHangler(val.target.value)}
                />
                {errors.tenantName?.type === 'required' && (
                  <ErrorSpanBox error="Shop name is required" />
                )}
                {errors.tenantName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.tenantName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email</label>
                <Input
                  className="FormInput"
                  {...register('email', {
                    required: true,
                    pattern: PATTERN.CHAR_NUM_DOT_AT,
                    validate: (value) => value.length <= 100,
                  })}
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  disableUnderline
                />
                {errors.email?.type === 'required' && (
                  <ErrorSpanBox error="Email is required" />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.email?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  First Name{' '}
                  <span className="text-xs text-gray-400">
                    ( max 50 characters )
                  </span>
                </label>
                <Input
                  className="FormInput"
                  {...register('firstName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 50,
                  })}
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  disableUnderline
                />
                {errors.firstName?.type === 'required' && (
                  <ErrorSpanBox error="First name is required" />
                )}
                {errors.firstName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.firstName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  Last Name{' '}
                  <span className="text-xs text-gray-400">
                    ( max 50 characters )
                  </span>
                </label>
                <Input
                  className="FormInput"
                  {...register('lastName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 50,
                  })}
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  disableUnderline
                />
                {errors.lastName?.type === 'required' && (
                  <ErrorSpanBox error="Last name is required" />
                )}
                {errors.lastName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.lastName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Max branch limits</label>
                <Input
                  className="FormInput"
                  {...register('maxBranchLimit', {
                    required: 'Branch limit is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 20,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  type="number"
                  id="maxBranchLimits"
                  placeholder="Enter max branch limits"
                  disableUnderline
                />
                {errors?.maxBranchLimit && (
                  <span role="alert" className="error-color">
                    *{errors?.maxBranchLimit?.message}
                  </span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Max User Limits</label>
                <Input
                  className="FormInput"
                  {...register('maxUserLimit', {
                    required: 'User limit is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 20,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  type="number"
                  id="maxUserLimits"
                  placeholder="Enter max user limits"
                  disableUnderline
                />
                {errors?.maxUserLimit && (
                  <span role="alert" className="error-color">
                    *{errors?.maxUserLimit?.message}
                  </span>
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <CustomDropDown
                validateRequired
                id="role"
                control={control}
                error={errors}
                register={register}
                options={{ roles }}
                inputTitle="Role"
              />
              <CustomMultipleSelectBox
                validateRequired
                id="theme"
                control={control}
                error={errors}
                setValue={setValue}
                register={register}
                options={{ roles: lovList }}
                customClassInputTitle="font-bold"
                inputTitle="Theme"
                defaultVal="-- Select Theme --"
              />
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Address</label>
                <Input
                  className="FormInput"
                  type="text"
                  id="address"
                  placeholder="Enter shop address"
                  disableUnderline
                  {...register('address', {
                    required: true,
                    pattern: PATTERN?.ADDRESS_ONLY,
                    validate: (value) => value.length <= 200,
                  })}
                />
                {errors.address?.type === 'required' && (
                  <ErrorSpanBox error="Address is required" />
                )}
                {errors.address?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.address?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Domain</label>
                <TextField
                  className="FormInput"
                  sx={{ padding: 0 }}
                  id="development_domain"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {DOMAIN_PROTOCOL}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {DOMAIN_PREFIX}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  {...register('domain', {
                    required: true,
                    pattern: PATTERN?.CHAR_NUM_DASH,
                    validate: (value) => value.length <= 100,
                  })}
                />
                {errors.domain?.type === 'required' && (
                  <ErrorSpanBox error="domain is required" />
                )}
                {errors.domain?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.domain?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={
                      <RadioButtonUncheckedOutlinedIcon
                        style={{ color: '#1D1D1D' }}
                      />
                    }
                    checkedIcon={
                      <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                    }
                    {...register('trialMode')}
                  />
                }
                label="Trial Mode"
              />
            </div>
            {watch('trialMode') === true && (
              <div>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Trial Mode Limit ( Days )</label>
                  <Input
                    className="FormInput"
                    {...register('trialModeLimit', {
                      required:
                        watch('trialMode') === true &&
                        'Trial Mode limit is required in numbers',
                      value: 15,
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH(value, 10),
                    })}
                    type="number"
                    id="trialModeLimit"
                    placeholder="Enter Trial Mode limit in days"
                    disableUnderline
                  />
                  {errors?.trialModeLimit && (
                    <ErrorSpanBox error={errors?.trialModeLimit?.message} />
                  )}
                </FormControl>
              </div>
            )}
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default SuperAdminTenantCreatePopup;
