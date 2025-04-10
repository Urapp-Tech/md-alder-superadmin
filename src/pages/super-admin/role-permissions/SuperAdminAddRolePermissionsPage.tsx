import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/common/CustomButton';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import '../../../index.css';
import { RolePermissions } from '../../../interfaces/superadmin/rolepermissions.interface';
import Service from '../../../services/superadmin/RolePermissions';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  setText,
} from '../../../utils/constants';

function SuperAdminAddRolePermissionsPage() {
  const navigate = useNavigate();
  const [list, setList] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [selectAll, setSelectAll] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [emptyVariable] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RolePermissions>();

  useEffect(() => {
    Service.getRolePermissionService()
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data);
          // console.log("DAATAssP", item.data.data);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'success',
        });
        // console.log('error::::::::', error);
      });
  }, [emptyVariable]);
  // console.log("list", list);

  const onSubmit = (data: RolePermissions) => {
    // setIsLoader(true);
    const finalData = {
      name: data.roleName,
      desc: data.roleDescription,
      data: list,
    };

    const hasValidData = list.some((category: any) =>
      category.data.some((detail: any) => detail.status === true)
    );

    if (hasValidData) {
      Service.create(finalData)
        .then((item: any) => {
          if (item.data.success) {
            const clearedData = list.map((category: any) => ({
              ...category,
              data: category.data.map((detail: any) => ({
                ...detail,
                status: false,
              })),
            }));
            setList(clearedData);
            reset();
            setIsLoader(false);
            setText(item.data.message);
            navigate('../list');
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Select atleast one checkbox',
        type: 'error',
      });
    }
  };

  const handleCheckboxChange = (
    categoryIndex: number,
    detailIndex: number,
    checked: any
  ) => {
    const updatedData = [...list];
    updatedData[categoryIndex].data[detailIndex].status = checked;
    setList(updatedData);
    // console.log("updated", updatedData);
  };

  // const handleCategorySelectAll = (categoryIndex: number, checked: any) => {
  //   const updatedData = [...list];
  //   updatedData[categoryIndex].data.forEach((detail: any) => {
  //     detail.status = checked;
  //   });
  //   setList(updatedData);
  //   // console.log("updateds", updatedData);
  // };

  const handleSelectAllChange = (checked: any) => {
    const updatedData = list.map((category: any) => ({
      ...category,
      data: category.data.map((detail: any) => ({
        ...detail,
        status: checked,
      })),
    }));
    // console.log("UU", updatedData);

    setList(updatedData);
    setSelectAll(checked);
  };

  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Add Role Permissions" />
      <div className="m-auto mx-5 mt-5">
        <div className="w-full rounded-lg bg-white py-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="FormBody m-5">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="pb-2 font-bold">Role</label>
                <Input
                  className="FormInput m-0 h-[40px] w-[280px] rounded-lg border-2 border-secondary px-3 outline-none"
                  {...register('roleName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  id="roleName"
                  placeholder="Enter Role name"
                  disableUnderline
                />
                {errors.roleName?.type === 'required' && (
                  <ErrorSpanBox error="Role name is required" />
                )}
                {errors.roleName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.roleName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl my-5" variant="standard">
                <label className="pb-2 font-bold">Description</label>
                <TextareaAutosize
                  minRows={3}
                  maxRows={6}
                  {...register('roleDescription', {
                    minLength: {
                      value: 1,
                      message: 'Minimum Five Characters',
                    },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  placeholder="Enter Role description"
                  className="w-[280px] rounded-lg border-2 border-secondary p-3 outline-none"
                />
                {errors.roleDescription && (
                  <ErrorSpanBox error={errors.roleDescription?.message} />
                )}
              </FormControl>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="font-bold">Permissions</p>
                <FormControlLabel
                  className="text-[#949EAE]"
                  control={
                    <Checkbox
                      icon={
                        <CheckBoxOutlineBlankRoundedIcon
                          style={{ color: '#000000' }}
                        />
                      }
                      checkedIcon={
                        <CheckBoxRoundedIcon style={{ color: '#000000' }} />
                      }
                      onChange={(e) => handleSelectAllChange(e.target.checked)}
                      checked={selectAll}
                    />
                  }
                  label="Select all"
                />
              </div>
              {list?.map((items: any, mainIndex: number) => {
                return (
                  <div key={mainIndex} className="m-2 py-1">
                    <div className="flex items-center justify-between">
                      <p className="py-2 font-semibold underline underline-offset-2">
                        {items.name}
                      </p>
                      {/* <FormControlLabel
                                                    className='text-[#949EAE]'
                                                    control={
                                                        <Checkbox
                                                            icon={
                                                                <CheckBoxOutlineBlankRoundedIcon
                                                                    style={{ color: '#000000' }}
                                                                />
                                                            }
                                                            checkedIcon={
                                                                <CheckBoxRoundedIcon style={{ color: '#000000' }} />
                                                            }
                                                            onChange={(e) => handleCategorySelectAll(mainIndex, e.target.checked)}
                                                            checked={items.data.every((el: any) => el.status === true)}
                                                        />
                                                    }
                                                    label={"Select all"}
                                                /> */}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {items.data.map((item: any, detailIndex: number) => {
                        return (
                          <div key={detailIndex} className="">
                            <FormControlLabel
                              className="text-[#949EAE]"
                              control={
                                <Checkbox
                                  icon={
                                    <CheckBoxOutlineBlankRoundedIcon
                                      style={{ color: '#000000' }}
                                    />
                                  }
                                  checkedIcon={
                                    <CheckBoxRoundedIcon
                                      style={{ color: '#000000' }}
                                    />
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      mainIndex,
                                      detailIndex,
                                      e.target.checked
                                    )
                                  }
                                  checked={item.status}
                                />
                              }
                              label={item.name}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <CustomButton
                className="bg-black"
                buttonType="button"
                type="submit"
                title="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminAddRolePermissionsPage;
