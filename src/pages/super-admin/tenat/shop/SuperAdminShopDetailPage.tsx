import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColorRowWithTooltips from '../../../../components/common/ColorRowWithTooltips';
import Loader2 from '../../../../components/common/Loader2';
import Notify from '../../../../components/common/Notify';
import TopBar from '../../../../components/common/TopBar';
import Service from '../../../../services/superadmin/Tenant';
import Theme from '../../../../services/superadmin/theme';
import SuperAdminCreatePopup from './SuperAdminCreatePopup';
import SuperAdminShopDetailsDialog from './SuperAdminShopDetailsDialog';
import SuperAdminUpdatePopup from './SuperAdminUpdatePopup';
import SuperAdminUserDialog from './SuperAdminUserDialog';

function SuperAdminShopDetailPage() {
  const params = useParams();
  const tenant = params.id ?? '';
  const [emptyVariable] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isLoader, setIsLoader] = useState(true);
  const [detail, setDetail] = useState<any>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [branchDialog, setBranchDialog] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const [formDetail, setFormDetail] = useState<any>(null);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [rolelist] = useState<any>([]);
  // const [isTrialMode, setIsTrialMode] = React.useState<boolean>(false);
  const [lovList, setLovList] = useState<any>();
  const [themeList, setThemeList] = useState<any>();

  const getUserById = (id: any, type: any) => {
    let service;
    setIsLoader(true);
    if (type === 'shop') {
      service = Service.detailShopUser(id);
    } else {
      service = Service.detailBranchUser(id);
    }
    service
      .then((item: any) => {
        // console.log('item.data.data::::::', item.data.data);
        if (item.data.success) {
          setUserDialog(true);
          type === 'shop'
            ? setFormDetail([item.data.data])
            : setFormDetail(item.data.data);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setUserDialog(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setUserDialog(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const getShopService = (id: any, setModalHandler: any) => {
    Service.getShop(id)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setFormDetail(item.data.data);
          setModalHandler(true);
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
  };

  const editHandler = (id: any, identifierType: string) => {
    setIsLoader(true);
    setIdentifier(identifierType);
    getShopService(id, setOpenEditFormDialog);
  };

  const createFormBranchHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('tenantName', data.tenantName);
    formData.append('email', data.email);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('trialMode', data.trialMode);
    formData.append('developmentDomain', data.developmentDomain);
    formData.append('liveDomain', data.liveDomain);
    formData.append('role', data.role);
    formData.append('maxBranchLimit', data.maxBranchLimit);
    formData.append('maxUserLimit', data.maxUserLimit);
    formData.append(
      'trialModeLimit',
      data.trialModeLimit ? data.trialModeLimit : 0
    );
    // console.log('formdata 2', formData);

    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.createShopBranch(formData, tenant)
        .then((item: any) => {
          if (item.data.success) {
            // console.log('ITEMMM', item.data);
            setIsLoader(false);
            setDetail((prevDetail: any) => ({
              ...prevDetail,
              branches: [...prevDetail.branches, item.data.data],
            }));
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
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
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  // const handleSwitchChange = (event: any, id: string) => {
  //   setIsLoader(true);
  //   const data = {
  //     isActive: event.target.checked,
  //     // trialMode: event.target.checked,
  //     updatedBy: authState.user.id,
  //   };
  //   Service.updateShopStatus(id, data)
  //     .then((updateItem) => {
  //       if (updateItem.data.success) {
  //         const newTempArr = detail.branches.map((item: any) => {
  //           // console.log('itemss', item);
  //           if (item.id === id) {
  //             item.isActive = updateItem.data.data.isActive;
  //             // item.trialMode = updateItem.data.data.trialMode;
  //           }
  //           return { ...item };
  //         });
  //         setDetail({ ...detail, newTempArr });
  //         setIsLoader(false);
  //       } else {
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: updateItem.data.message,
  //           type: 'error',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  // console.log('DETAILS DATA', detail);

  const updateFormBranchHandler = (id: string, data: any) => {
    setIsLoader(true);
    // console.log('data:::::::::', data);
    // if (data.trialUpdateMode) setIsTrialMode(true);
    // console.log('formDATA1', data);
    const formData = {
      tenantName: data.tenantName,
      firstName: data.firstName,
      lastName: data.lastName,
      trialMode: data.trialMode,
      domain: data.domain,
      theme: data.theme,
      trialModeLimit: data.trialModeLimit ? data.trialModeLimit : 0,
      role: data.role,
      maxBranchLimit: data.maxBranchLimit,
      maxUserLimit: data.maxUserLimit,
      loyaltyCoinConversionRate: data.enableLoyaltyProgram
        ? data.loyaltyCoinConversionRate
          ? data.loyaltyCoinConversionRate
          : 0
        : 0,
      requiredCoinsToRedeem: data.enableLoyaltyProgram
        ? data.requiredCoinsToRedeem
          ? data.requiredCoinsToRedeem
          : 0
        : 0,
      enableLoyaltyProgram: data.enableLoyaltyProgram,
    };
    // console.log('formDATA2', formData);
    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.updateShop(id, formData)
        .then((items: any) => {
          if (items.data.success) {
            Service.getShopWithBranch(tenant).then((item: any) => {
              if (item.data.success) {
                setIsLoader(false);
                setIsNotify(true);
                setNotifyMessage({
                  text: item.data.message,
                  type: 'success',
                });
                const tempTheme = item.data.data.theme?.map((el: any) => {
                  return {
                    id: el.id,
                    name: el.key,
                    value: el.value.themeColor.primary,
                  };
                });
                setDetail(item.data.data);
                setThemeList(tempTheme);
              }
            });
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: items.data.message,
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
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    Service.getShopWithBranch(tenant)
      .then(async (shopItems: any) => {
        if (shopItems.data.success) {
          const temp = shopItems.data.data.theme?.map((el: any) => {
            return {
              id: el.id,
              name: el.key,
              value: el.value.themeColor.primary,
            };
          });
          setDetail(shopItems.data.data);
          setThemeList(temp);
          await Theme.lovList()
            .then((item: any) => {
              if (item.data.success) {
                const templovlist = item.data.data.list.map((el: any) => {
                  return {
                    id: el.id,
                    name: el.key,
                  };
                });
                setLovList(templovlist);
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
            });
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: shopItems.data.message,
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
  }, [emptyVariable]);

  const getDate = (date: any) => {
    const formatDate = dayjs(date)?.format('ddd MMM DD YYYY HH:mm:ss');
    const toString = dayjs(date)?.toString().split(' ').pop();
    const timeZone = dayjs(date)?.format('ZZ');
    return `${formatDate} ${toString} ${timeZone}`;
  };

  const getRemainingTime = (data: any) => {
    const addTime = dayjs(data.trialStartDate).add(
      Number(data.trialModeLimit) - 1,
      'days'
    );
    const endTime: any = dayjs(addTime).format('YYYY-MM-DD HH:mm:ss');
    const diffBetween = dayjs.duration(dayjs().diff(endTime));
    const remainingTime = Math.abs(Math.round(diffBetween.asDays()));
    let dayTxt = 'day';
    if (remainingTime > 1) {
      dayTxt = 'days';
    }
    let remainingTxt;
    if (remainingTime <= 0) {
      remainingTxt = 'Expired';
    } else {
      remainingTxt = `Remaining ${remainingTime} ${dayTxt} left`;
    }
    return remainingTxt;
  };

  // console.log('SHOP', userDialog);

  return (
    <>
      <TopBar isNestedRoute title="Shop Detail" />
      <div className="container m-auto mt-5">
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="col-span-12 min-h-[500px] rounded-lg bg-white py-3 shadow-lg">
            {isLoader ? (
              <Loader2 />
            ) : (
              <div>
                <Notify
                  isOpen={isNotify}
                  setIsOpen={setIsNotify}
                  displayMessage={notifyMessage}
                />
                {detail === null && (
                  <div className="mx-5">
                    <span className="font-open-sans text-lg font-semibold text-secondary">
                      Shop Name
                    </span>
                  </div>
                )}
                {detail ? (
                  <div className="grid w-full gap-3 xl:grid-cols-8 2xl:grid-cols-12">
                    <div className="col-span-4 flex w-full justify-between py-[2rem]">
                      <div className="flex flex-col px-5">
                        <div className="flex">
                          <div className="flex w-full flex-col">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Shop Name
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {detail.name}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="">
                              <IconButton
                                disabled={detail.isActive === false && true}
                                title="Shop User Detail"
                                className="m-0"
                                onClick={() => getUserById(tenant, 'shop')}
                              >
                                <AccountBoxIcon />
                              </IconButton>
                            </div>
                            {/* <div className="">
                              <IconButton
                                disabled={detail.isActive === false && true}
                                title="Shop Setting"
                                className="m-0"
                                onClick={() => getSettingById(tenant)}
                              >
                                <SettingsIcon />
                              </IconButton>
                            </div> */}
                            <div>
                              <IconButton
                                disabled={detail.isActive === false && true}
                                title="Edit Shop"
                                className="m-0 pl-1"
                                onClick={() => editHandler(tenant, 'owner')}
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>

                        <div className="grid w-[100%] grid-cols-4">
                          <div className="col-span-2 mt-4">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Created Date
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {dayjs(detail.createdDate).isValid() ? (
                                <>{getDate(detail.createdDate)}</>
                              ) : (
                                '--'
                              )}
                            </div>
                          </div>
                          <div className="col-span-2 mt-4 flex flex-col items-end justify-center">
                            <span className="px-[9px] font-open-sans text-base font-semibold not-italic text-secondary">
                              Status
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {detail.isActive ? (
                                <span className="badge badge-success">
                                  Enabled
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Disabled
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {detail.desc && (
                          <div className="mt-4 flex w-full flex-col">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Description
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {detail.desc}
                            </div>
                          </div>
                        )}

                        <div className="grid w-[100%] grid-cols-4">
                          <div className="col-span-2 mt-4">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Trial Start Date
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {dayjs(detail.trialStartDate).isValid() ? (
                                <>{getDate(detail.trialStartDate)}</>
                              ) : (
                                '--'
                              )}
                            </div>
                          </div>
                          <div className="col-span-2 mt-4 flex flex-col items-end justify-center">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Trial End Date
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {dayjs(detail.trialStartDate).isValid() ? (
                                <>{getRemainingTime(detail)}</>
                              ) : (
                                '--'
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid w-[100%] grid-cols-6">
                          <div className="col-span-2 mt-4 ">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Employees
                            </span>
                            <div className="mt-1 flex w-[90px] items-center justify-center font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              <span className="badge badge-primary w-full text-xs">
                                {detail.userCounts}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2 mt-4 flex flex-col items-center justify-center">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Branches
                            </span>
                            <div className="mt-1 flex w-[100px] items-center justify-center text-center font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              <span className="badge badge-primary w-full text-xs">
                                {detail.maxBranchLimit} -{' '}
                                {detail.branches?.length}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2 mt-4 flex flex-col items-end justify-center">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Total Employees
                            </span>
                            <div className="mt-1 flex w-[100px] items-center justify-center font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              <span className="badge badge-primary w-full px-4 text-xs">
                                {detail.maxUserLimit} - {detail.totalUserCounts}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid w-[100%] grid-cols-4">
                          <div className="col-span-2 mt-4">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Address
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {detail?.tenantExt
                                ? detail?.tenantExt?.shopAddress
                                : '--'}
                            </div>
                          </div>
                          <div className="col-span-2 mt-4 flex flex-col items-end justify-center">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Trial Mode
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              {detail?.trialMode ? (
                                <span className="badge badge-success text-xs">
                                  started
                                </span>
                              ) : (
                                <span className="badge badge-danger text-xs">
                                  not started
                                </span>
                              )}
                              {/* <Switch
                                checked={detail?.trialMode}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled
                              /> */}
                            </div>
                          </div>
                        </div>
                        <div className="grid w-[100%] grid-cols-4">
                          <div className="col-span-4 mt-4">
                            <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                              Theme
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              <ColorRowWithTooltips
                                colors={themeList ?? []}
                                type="array"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex justify-end px-5 xl:col-span-4 2xl:col-span-8">
                      <div className="mt-5">
                        <Button
                          variant="contained"
                          className="btn-black-fill btn-icon"
                          onClick={handleFormClickOpenNewBranch}
                        >
                          <AddOutlinedIcon /> Add New Branch
                        </Button>
                      </div>
                    </div> */}
                  </div>
                ) : (
                  <div>
                    <div className="col-span-12 grid items-center justify-center">
                      <p>No Shop Owner Found!</p>
                    </div>
                  </div>
                )}
                <div>
                  <hr className="mx-5 my-3" />
                  <div className="m-5">
                    <p className="text-lg font-semibold text-secondary">
                      Shop Branches
                    </p>
                    <div className="mt-4 grid grid-cols-12 gap-6">
                      {detail?.branches?.length > 0 ? (
                        detail?.branches?.map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="rounded-2xl shadow xl:col-span-6 2xl:col-span-4"
                            >
                              <div className="flex h-full w-full justify-between py-[1rem]">
                                <div className="flex h-full flex-col justify-between px-5">
                                  <div className="flex w-full flex-col">
                                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                                      Shop Name
                                    </span>
                                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                      {item.name}
                                    </div>
                                  </div>
                                  <div className="mt-1 flex w-full flex-col">
                                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                                      Address
                                    </span>
                                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                      {item.tenantExt?.shopAddress
                                        ? item.tenantExt?.shopAddress
                                        : '--'}
                                    </div>
                                  </div>
                                  <div className="flex w-[100%]">
                                    <div className="mt-1 flex w-full flex-col">
                                      <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                                        Employees
                                      </span>
                                      <div className="mt-1 flex w-[90px] items-center justify-center font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                        <span className="badge badge-primary w-full text-xs">
                                          {item.userCounts}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="h-full flex-col justify-between">
                                  <div className="flex justify-end">
                                    <div className="">
                                      <IconButton
                                        disabled={
                                          detail.isActive === false && true
                                        }
                                        title="User Detail"
                                        className="m-0"
                                        onClick={() =>
                                          getUserById(item.id, 'branch')
                                        }
                                      >
                                        <AccountBoxIcon />
                                      </IconButton>
                                    </div>
                                    {/* <div className="flex items-center justify-end">
                                      <IconButton
                                        disabled={
                                          item.isActive === false && true
                                        }
                                        title="Branch Setting"
                                        className="m-0"
                                        onClick={() => getSettingById(item.id)}
                                      >
                                        <SettingsIcon />
                                      </IconButton>
                                    </div> */}
                                    {/* <div className="flex items-center justify-end">
                                      <IconButton
                                        disabled={
                                          item.isActive === false && true
                                        }
                                        title="Edit Branch"
                                        className="m-0"
                                        onClick={() =>
                                          editHandler(item.id, 'branch')
                                        }
                                      >
                                        <EditIcon />
                                      </IconButton>
                                    </div> */}
                                  </div>
                                  <div className="flex h-[100%] items-center justify-end px-3 font-open-sans font-normal">
                                    {item.isActive ? (
                                      <span className="badge badge-success">
                                        Enabled
                                      </span>
                                    ) : (
                                      <span className="badge badge-danger">
                                        Disabled
                                      </span>
                                    )}
                                    {/* <div>
                                      <Switch
                                        checked={item.isActive}
                                        onChange={(
                                          event: React.ChangeEvent<HTMLInputElement>
                                        ) => handleSwitchChange(event, item.id)}
                                        inputProps={{
                                          'aria-label': 'controlled',
                                        }}
                                      />
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-span-12 grid items-center justify-center">
                          <p>No Branches Found!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {branchDialog && (
                  <SuperAdminShopDetailsDialog
                    setIsNotify={setIsNotify}
                    setNotifyMessage={setNotifyMessage}
                    items={formDetail}
                    openFormDialog={branchDialog}
                    setOpenFormDialog={setBranchDialog}
                  />
                )}

                {userDialog && (
                  <SuperAdminUserDialog
                    items={formDetail}
                    openFormDialog={userDialog}
                    setOpenFormDialog={setUserDialog}
                  />
                )}

                {openFormDialog && (
                  <SuperAdminCreatePopup
                    type
                    roles={rolelist}
                    setIsNotify={setIsNotify}
                    setNotifyMessage={setNotifyMessage}
                    openFormDialog={openFormDialog}
                    setOpenFormDialog={setOpenFormDialog}
                    callback={createFormBranchHandler}
                  />
                )}

                {openEditFormDialog && (
                  <SuperAdminUpdatePopup
                    lovList={lovList}
                    themeList={themeList}
                    type={identifier}
                    // role={formDetail?.backofficeUser?.role}
                    // roles={formDetail?.roles}
                    setIsNotify={setIsNotify}
                    setNotifyMessage={setNotifyMessage}
                    item={formDetail}
                    openFormDialog={openEditFormDialog}
                    setOpenFormDialog={setOpenEditFormDialog}
                    callback={updateFormBranchHandler}
                    isLoader={isLoader}
                    setIsLoader={setIsLoader}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminShopDetailPage;
