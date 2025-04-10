import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import React, { Fragment } from 'react';
import '../../assets/css/PopupStyle.css';
import CustomButton from './CustomButton';
import CustomDropDown from './CustomDropDown';
import CustomInputBox from './CustomInputBox';
import TimePicker from './TimePicker';
// import WorkDaysForm from '../../pages/settings/WorkDaysForm';
import { INVALID_CHAR, MAX_LENGTH_EXCEEDED } from '../../utils/constants';
import ErrorSpanBox from './ErrorSpanBox';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  DialogHeader?: string;
  DialogSubHeader?: string;
  inputFieldsData?: any;
  inputScheduleData?: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  type?: any;
  reset?: any;
  setAvater?: any;
  specailCase?: boolean;
  singleField?: boolean;
  setWeekDays?: any;
  weekDays?: any;
  startTime?: any;
  endTime?: any;
  addScheduleFormat?: boolean;
  noweekdays?: boolean;
};

function CustomDialog({
  openFormDialog,
  setOpenFormDialog,
  DialogHeader,
  DialogSubHeader,
  inputFieldsData,
  handleSubmit,
  onSubmit,
  type,
  specailCase,
  setAvater,
  reset,
  singleField,
}: Props) {
  const handleFormClose = () => {
    if (type === 'edit' && specailCase) {
      reset({
        role: 'none',
        userLimits: '',
      });
      setOpenFormDialog(false);
    } else if (type === 'edit' && !specailCase) {
      setAvater && setAvater(null);
      reset();
      setOpenFormDialog(false);
    } else {
      setOpenFormDialog(false);
    }
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">{DialogHeader}</span>
          </div>
          <div className="FormBody">
            <div className={singleField ? 'FormField' : 'FormFields'}>
              {inputFieldsData?.map((items: any, index: number) => {
                return (
                  <Fragment key={index}>
                    {
                      // index !== inputFieldsData.length - 1 &&
                      items.type === 'select' ? (
                        <FormControl
                          key={index}
                          className="FormControl"
                          variant="standard"
                        >
                          <CustomDropDown
                            defaultValue={items.defaultValue}
                            validateRequired={items.validateRequired}
                            id={items.id}
                            control={items.control}
                            error={items.error}
                            register={items.register}
                            options={items.options}
                            inputTitle={items.fieldName}
                          />
                        </FormControl>
                      ) : items.type === 'number' ||
                        items.type === 'text' ||
                        items.type === 'password' ? (
                        <FormControl
                          key={index}
                          className="FormControl"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={items.pattern}
                            maxLetterLimit={items.maxLetterLimit}
                            requiredType={items.notRequired}
                            disable={items.disable}
                            inputTitle={items.fieldName}
                            placeholder={items.placeholder}
                            id={items.id}
                            value={items.value ? items.value : ''}
                            register={items.register}
                            error={items.error}
                            inputType={items.type}
                            onclick={items.onclick}
                            showPassVisibility={items.showPassVisibility}
                            typeImportant={items.typeImportant}
                          />
                        </FormControl>
                      ) : items.type === 'textarea' ? (
                        <div className="">
                          <FormControl
                            className="FormControl py-2"
                            variant="standard"
                          >
                            <label className="FormLabel">
                              {items.fieldName}
                              <span className="SubLabel">
                                Write 01-250 Characters
                              </span>
                            </label>
                            <TextField
                              className="FormTextarea"
                              id={items.id}
                              multiline
                              rows={4}
                              defaultValue=""
                              placeholder={items.placeholder}
                              {...items.register(items.id, {
                                pattern: {
                                  value: items.pattern,
                                  message: INVALID_CHAR,
                                },
                                required:
                                  items.notRequired === true
                                    ? false
                                    : `${items.fieldName} is required`,
                                minLength: {
                                  value: 1,
                                  message: 'Minimum Five Characters',
                                },
                                maxLength: {
                                  value: 250,
                                  message: MAX_LENGTH_EXCEEDED,
                                },
                              })}
                            />
                            {items.error && (
                              <ErrorSpanBox error={items.error.message} />
                            )}
                          </FormControl>
                        </div>
                      ) : items.type === 'datepicker' ? (
                        <TimePicker
                          timePickerLabel={items.fieldName}
                          timePickerSubLabel={items.placeholder}
                          timePickerValue={items.time}
                          setTimePickerValue={items.setTime}
                          id={items.id}
                          errors={items.error}
                          // setError={setError}
                        />
                      ) : null
                    }
                    {items.id === 'upload' && (
                      <>
                        <br />
                        <div style={{ minWidth: '204%', marginTop: '0.75rem' }}>
                          <div className="ImageBox">
                            <CustomButton
                              buttonType="upload"
                              title={items.fieldName}
                              register={items.register}
                              icon={
                                <FileUploadOutlinedIcon
                                  sx={{ marginRight: '0.5rem' }}
                                />
                              }
                              onchange={(
                                event: React.InputHTMLAttributes<HTMLInputElement>
                              ) => {
                                items.onchange(event);
                              }}
                              onclick={(
                                event: React.InputHTMLAttributes<HTMLInputElement>
                              ) => {
                                items.onclick(event);
                              }}
                            />
                            {items.avatar ? (
                              <div className="ShowImageBox">
                                <label className="ShowImageLabel">
                                  {items.avatar.name}
                                </label>
                                <IconButton
                                  className="btn-dot"
                                  onClick={() => items.setAvatar(null)}
                                >
                                  <CloseOutlinedIcon
                                    sx={{
                                      color: '#1D1D1D',
                                      fontSize: '1rem',
                                      lineHeight: '1.5rem',
                                    }}
                                  />
                                </IconButton>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </Fragment>
                );
              })}
            </div>
            {DialogSubHeader && (
              <div className="FormHeader">
                <span className="text-md mt-2 font-semibold">
                  {DialogSubHeader}
                </span>
              </div>
            )}
          </div>
          <div className="FormFooter">
            <CustomButton
              buttonType="button"
              title="Cancel"
              className="btn-black-outline"
              onclick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            />
            <CustomButton
              buttonType="button"
              title={type === 'edit' ? 'Edit' : 'Add'}
              type="submit"
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
                width: '90%',
                height: '35px',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default CustomDialog;
