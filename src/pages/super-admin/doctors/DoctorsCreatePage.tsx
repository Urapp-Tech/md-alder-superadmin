import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
// import TopBar from '../../components/common/Md-Alder/TopBar';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import SmileFace from '../../../assets/images/smile-dark.png';
import ChipsInput from '../../../components/common/ChipsInput';
import service from '../../../services/superadmin/doctor';
import rolePermissionService from '../../../services/superadmin/RolePermissions';
// import SmileFace from '../../assets/images/smile-dark.png';
import DoctorsCreateSchedulePopup from './DoctorsCreateSchedulePopup';
import TopBar from '../../../components/common/TopBar';
import {
  imageAllowedTypes,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  MIN_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';
import { useSnackbar } from '../../../components/hooks/useSnackbar';
import { Doctor } from '../../../interfaces/superadmin/doctor.interface';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomInputBox from '../../../components/common/CustomInputBox';
import DoctorCreateSchedulePopup from './DoctorCreateSchedulePopup';
import { useAppSelector } from '../../../redux/redux-hooks';

const DoctorsCreatePage = () => {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const [scheduleAddPopup, setScheduleAddPopup] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(false);

  const [roleLov, setRoleLov] = useState([]);

  const workDays = useAppSelector((state) => state.scheduleState.workDays);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  console.log('workDays', workDays);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<Doctor>();

  const methods = useForm();

  useEffect(() => {
    rolePermissionService
      .roleLov()
      .then((item) => {
        if (item.data.success) {
          setRoleLov(item.data.data);
        } else {
          showMessage(item.data.message, 'error');
        }
      })
      .catch((err) => {
        showMessage(err.message, 'error');
      });
  }, []);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result?.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result?.toString());
      };
      reader.readAsDataURL(selectedFile);
      const fileType = selectedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setImage(event.target.files[0]);
      } else {
        showMessage('Only .png, .jpg, and .jpeg files are allowed', 'error');
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setImage(null);
  };

  const onSubmitHandler = (data: Doctor) => {
    // console.log('data', data.experience);
    setIsLoader(true);
    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('gender', data.gender);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('age', data.age);
    formData.append('address', data.address);
    formData.append('designation', data.designation);
    formData.append('role', data.role);
    formData.append('expertise', data.expertise);
    formData.append('boardCertification', data.boardCertification);
    formData.append('college', data.college);
    formData.append('university', data.university);
    formData.append('fellowship', data.fellowship);
    formData.append('bio', data.bio);

    if (data.experience?.length) {
      formData.append('experience', JSON.stringify(data.experience));
    }

    if (data.skills?.length) {
      formData.append('skill', JSON.stringify(data.skills));
    }

    if (data.languages?.length) {
      formData.append('languages', JSON.stringify(data.languages));
    }

    if (data.socialMedia?.length) {
      formData.append('socialMedia', JSON.stringify(data.socialMedia));
    }

    if (workDays?.length) {
      formData.append('addDateTime', JSON.stringify(workDays));
    }

    if (image) {
      formData.append('avatar', image);
    }

    service
      .create(formData)
      .then((item) => {
        if (item.data.success) {
          showMessage(item.data.message, 'success');
          setIsLoader(false);
          navigate(-1);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  };

  console.log('maxLength', errors);

  return (
    <>
      {/* <TopBar title="Add Doctor Profile" /> */}
      <TopBar title="Add Doctor Details" isNestedRoute />
      {/* <DoctorsCreateSchedulePopup
        scheduleAddPopup={scheduleAddPopup}
        setScheduleAddPopup={setScheduleAddPopup}
      /> */}
      <DoctorCreateSchedulePopup
        scheduleAddPopup={scheduleAddPopup}
        setScheduleAddPopup={setScheduleAddPopup}
      />
      <div className="mt-5 h-full min-h-[999px] pb-5 pr-5">
        <div className="alder-content alder-patient-visit-logs mt-5 h-full p-5">
          <div className="">
            <div className="">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="w-100 grid grid-cols-12 gap-2">
                    <div className="grid h-0 grid-cols-12 md:col-span-8">
                      {/* First Name */}
                      <div className="col-span-6 px-2">
                        <FormGroup>
                          <FormControl
                            className="FormControl"
                            variant="standard"
                          >
                            <Input
                              {...register('firstName', {
                                required: true,
                                pattern: PATTERN.CHAR_NUM_DASH,
                                validate: (value) => value.length <= 100,
                              })}
                              className="FormInput alder-form-control"
                              id="firstName"
                              name="firstName"
                              placeholder="John"
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
                        </FormGroup>
                      </div>
                      {/* Last Name */}
                      <div className="col-span-6 px-2">
                        <FormGroup>
                          <FormControl
                            className="FormControl"
                            variant="standard"
                          >
                            <Input
                              {...register('lastName', {
                                // required: true,
                                pattern: PATTERN.CHAR_NUM_DASH,
                                validate: (value) => value.length <= 100,
                              })}
                              className="FormInput alder-form-control"
                              id="lastName"
                              name="lastName"
                              placeholder="Smith"
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
                        </FormGroup>
                      </div>
                      {/* Gender */}
                      <div className="col-span-6 mt-2 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="gender"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'MALE', name: 'Male' },
                                { id: 'FEMALE', name: 'Female' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select Gender"
                          />
                        </FormControl>
                      </div>

                      {/* phone number */}
                      <div className="col-span-6 mt-2 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            // inputTitle="Phone"
                            placeholder="+92345345345"
                            id="phone"
                            customFontClass="font-semibold mb-1"
                            customClass="alder-form-control"
                            register={register}
                            // requiredType
                            error={errors.phone}
                            inputType="number"
                            // typeImportant
                          />
                        </FormControl>
                      </div>

                      {/* Email */}
                      <div className="col-span-6 px-2 py-2">
                        <FormGroup>
                          <FormControl
                            className="FormControl w-full"
                            variant="standard"
                          >
                            <CustomInputBox
                              pattern={PATTERN.EMAIL}
                              placeholder="johnsmith@gmail.com"
                              id="email"
                              customFontClass="font-semibold mb-1"
                              customClass="alder-form-control"
                              register={register}
                              error={errors.email}
                              inputType="text"
                            />
                          </FormControl>
                        </FormGroup>
                      </div>

                      {/* Password */}
                      <div className="col-span-6 w-full px-2 py-2">
                        <FormControl className="FormControl" variant="standard">
                          <Input
                            style={{ paddingRight: '0' }}
                            className="FormInput alder-form-control w-[100%]"
                            id="password"
                            placeholder="abc123... or 123... or abcd..."
                            autoComplete="new-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                              required: 'Password is required',
                              pattern: PATTERN.PASSWORD,
                              minLength: {
                                value: 8,
                                message: MIN_LENGTH_EXCEEDED,
                              },
                            })}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-label="toggle password visibility"
                                  className="mx-3"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            disableUnderline
                          />
                          {errors.password?.type === 'required' && (
                            <ErrorSpanBox error={errors.password?.message} />
                          )}
                          {errors.password?.type === 'pattern' && (
                            <ErrorSpanBox error={INVALID_CHAR} />
                          )}
                          {errors.password?.type === 'minLength' && (
                            <ErrorSpanBox error={MIN_LENGTH_EXCEEDED} />
                          )}
                        </FormControl>
                      </div>

                      {/* Age */}
                      <div className="col-span-6 px-3 py-2">
                        <FormGroup>
                          <FormControl
                            className="FormControl w-full"
                            variant="standard"
                          >
                            <CustomInputBox
                              pattern={PATTERN.ONLY_NUM}
                              maxLetterLimit={3}
                              // inputTitle="Phone"
                              placeholder="Enter age ex: 34"
                              id="age"
                              customFontClass="font-semibold mb-1"
                              customClass="alder-form-control"
                              register={register}
                              error={errors.age}
                              inputType="number"
                              typeImportant
                            />
                          </FormControl>
                        </FormGroup>
                      </div>
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="role"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: roleLov,
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select Role"
                          />
                        </FormControl>
                      </div>
                      {/* Address */}
                      <div className="col-span-12 px-2 py-2">
                        <FormGroup>
                          <FormControl
                            className="FormControl"
                            variant="standard"
                          >
                            <Input
                              {...register('address', {
                                // required: true,
                                pattern: PATTERN.CHAR_NUM_DASH,
                                validate: (value) => value.length <= 100,
                              })}
                              className="FormInput alder-form-control"
                              id="address"
                              name="address"
                              placeholder="Enter address ex: gulburg street # 2"
                              disableUnderline
                            />
                            {errors.address?.type === 'required' && (
                              <ErrorSpanBox error="address is required" />
                            )}
                            {errors.address?.type === 'pattern' && (
                              <ErrorSpanBox error={INVALID_CHAR} />
                            )}
                            {errors.address?.type === 'validate' && (
                              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                            )}
                          </FormControl>
                        </FormGroup>
                      </div>

                      {/* Designations */}
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="designation"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'Specialist', name: 'Specialist' },
                                { id: 'Surgeon', name: 'Surgeon' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select designation"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="expertise"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'Specialist', name: 'Specialist' },
                                { id: 'Surgeon', name: 'Surgeon' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select expertise"
                          />
                        </FormControl>
                      </div>
                      {/* Board Certification */}
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="boardCertification"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'Specialist', name: 'Specialist' },
                                { id: 'Surgeon', name: 'Surgeon' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select Board Certification"
                          />
                        </FormControl>
                      </div>
                      {/* College */}
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="college"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'Specialist', name: 'Specialist' },
                                { id: 'Surgeon', name: 'Surgeon' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select College"
                          />
                        </FormControl>
                      </div>
                      {/* College */}
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="university"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'Specialist', name: 'Specialist' },
                                { id: 'Surgeon', name: 'Surgeon' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select University"
                          />
                        </FormControl>
                      </div>
                      {/* Fellowship */}
                      <div className="col-span-6 px-2 py-2">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="fellowship"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{
                              roles: [
                                { id: 'Specialist', name: 'Specialist' },
                                { id: 'Surgeon', name: 'Surgeon' },
                              ],
                            }}
                            customHeight="h-[40px] rounded-xl alder-form-control"
                            customClassInputTitle="font-semibold"
                            // inputTitle=""
                            defaultValue="Select Fellowship"
                          />
                        </FormControl>
                      </div>
                      {/* Experience */}
                      <div className="col-span-12 mb-2 mt-2 px-2">
                        <ChipsInput
                          name="experience"
                          register={register}
                          setValue={setValue}
                          maxChips={3}
                        />
                      </div>
                      <div className="col-span-12 mb-2 px-2">
                        <ChipsInput
                          name="skills"
                          register={register}
                          setValue={setValue}
                          maxChips={3}
                        />
                      </div>
                      <div className="col-span-12 mb-2 px-2">
                        <ChipsInput
                          name="languages"
                          register={register}
                          setValue={setValue}
                          maxChips={3}
                        />
                      </div>
                      <div className="col-span-12 px-2">
                        <ChipsInput
                          name="socialMedia"
                          register={register}
                          setValue={setValue}
                          maxChips={3}
                        />
                      </div>
                      <div className="col-span-12 mt-2 px-2">
                        <FormGroup>
                          <FormControl
                            variant="outlined"
                            className="cursor-pointer"
                            fullWidth
                          >
                            <Input
                              disableUnderline
                              onClick={() => setScheduleAddPopup(true)}
                              type="button"
                              className="form-control alder-form-control text-gray-400"
                              value="Add Dates & Time"
                              componentsProps={{
                                input: {
                                  className: 'text-left',
                                },
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setScheduleAddPopup(true)}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </FormGroup>
                        {/* <Button
                      onClick={() => setScheduleAddPopup(true)}
                      className="btn btn-primary"
                    >
                      Add selection
                    </Button> */}
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <div
                        className="flex min-h-[400px] items-center justify-center rounded-[15px] bg-[#FFF]"
                        onClick={() =>
                          document?.getElementById('imageInput')?.click()
                        }
                      >
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-[400px] w-full"
                          />
                        )}
                        <div className={`${imagePreview ? 'hidden' : ''}`}>
                          <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            // onChange={handleUploadImage}
                            {...register(
                              'avatar'
                              //  { required: 'Icon is required' }
                            )}
                            onChange={(
                              event: React.InputHTMLAttributes<HTMLInputElement>
                            ) => {
                              handleFileChange(event);
                            }}
                            onClick={(
                              event: React.InputHTMLAttributes<HTMLInputElement>
                            ) => {
                              handleFileOnClick(event);
                            }}
                            style={{ display: 'none' }}
                          />
                          <div className="flex w-full justify-center">
                            <img
                              src={SmileFace}
                              alt="Upload"
                              className="h-[63px]"
                            />
                          </div>
                          <h2 className="mt-5">Upload Image</h2>
                        </div>
                      </div>

                      <div className="mt-5 w-full">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <label className="alder-content-title my-4 capitalize">
                            Doctor bio{' '}
                          </label>
                          <TextField
                            className="FormTextarea w-full bg-foreground"
                            id="bio"
                            multiline
                            rows={7}
                            defaultValue=""
                            placeholder="Write Note..."
                            {...register('bio', {
                              maxLength: {
                                value: 250,
                                message: MAX_LENGTH_EXCEEDED,
                              },
                            })}
                          />
                          {errors.bio && (
                            <ErrorSpanBox error={errors.bio?.message} />
                          )}
                        </FormControl>
                      </div>

                      <div className="mt-8">
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setImagePreview(null);
                              setImage(null);
                              reset();
                            }}
                            className="mx-3 flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-2 border-background"
                          >
                            <RefreshIcon
                              fontSize="inherit"
                              className="mr-2 text-background"
                            />
                            <span>Reset</span>
                          </button>
                          <button
                            type="submit"
                            className="flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-primary bg-background px-2 text-center text-primary"
                          >
                            {isLoader ? (
                              <CircularProgress
                                size={20}
                                className="text-foreground"
                              />
                            ) : (
                              <>
                                <SendIcon fontSize="inherit" className="mr-2" />
                                <span>Save</span>
                              </>
                            )}
                          </button>
                          {/* <Button
                        variant="outlined"
                        onClick={() => setImagePreview(null)}
                        className="mx-5 rounded"
                      >
                        <RefreshIcon className="mr-3" />
                        Reset{' '}
                      </Button>
                      <Button className="rounded border-primary bg-background text-primary">
                        <SendIcon className="mr-3" />
                        Save{' '}
                      </Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(DoctorsCreatePage);
