import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomDialog from '../../../components/common/CustomDialog';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { ShopType } from '../../../interfaces/superadmin/shoptype.interface';
import Service from '../../../services/superadmin/shopType';
import { PATTERN } from '../../../utils/constants';

function ShopTypePage() {
  // const authState: any = useAppSelector((state: any) => state?.authState);
  // const dataRole = useAppSelector(
  //   (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  // );
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState('');
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ShopType>();

  const inputFieldsData = [
    {
      fieldName: 'Shop Type Name',
      id: 'name',
      placeholder: 'Enter shop type name',
      register,
      error: errors.name,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Description',
      id: 'desc',
      placeholder: 'Enter Shop Type Description',
      register,
      error: errors.desc,
      type: 'textarea',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 100,
    },
  ];

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      Service.getListService(searchTxt, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    Service.getListService(search, newPage, rowsPerPage).then((item) => {
      setList(item.data.data.list);
      setTotal(item.data.data.total);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    Service.getListService(search, newPage, newRowperPage).then((item) => {
      setList(item.data.data.list);
      setTotal(item.data.data.total);
    });
  };

  const handleEdit = (id: string) => {
    setIsLoader(true);
    Service.getById(id).then((item: any) => {
      if (item.data.success) {
        setIsLoader(false);
        setValue('id', item.data.data.id);
        setValue('name', item.data.data.name);
        setValue('desc', item.data.data.desc);
        setOpenEditFormDialog(true);
      }
    });
  };

  useEffect(() => {
    Service.getListService(search, page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
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
  }, []);

  const createFormHandler = (data: ShopType) => {
    setIsLoader(true);
    Service.create(data)
      .then((item) => {
        if (item.data.success) {
          reset();
          setOpenFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([...list, item.data.data]);
        } else {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    delete data.id;
    Service.update(getValues('id'), data)
      .then((item) => {
        if (item.data.success) {
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList((prev: any) => {
            return prev.map((el: any) => {
              if (el.id === item.data.data.id) {
                el.name = item.data.data.name;
                el.desc = item.data.data.desc;
              }
              return { ...el };
            });
          });
          reset();
        } else {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleSwitchChange = (event: any, id: string) => {
    setIsLoader(true);
    const data = {
      isActive: event.target.checked,
    };
    Service.updateStatus(id, data)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.isActive = updateItem.data.data.isActive;
              }
              return { ...item };
            });
          });
        } else {
          setIsLoader(false);
        }
      })
      .catch(() => {
        setIsLoader(false);
      });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Shop Type" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Shop Types
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onKeyDown={(
                      event: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleClickSearch(event);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton aria-label="toggle password visibility">
                          <SearchIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => setOpenFormDialog(true)}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="w-[40%]">Description</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            <Avatar
                              className="avatar flex flex-row items-center"
                              sx={{
                                bgcolor: '#1D1D1D',
                                width: 35,
                                height: 35,
                                textTransform: 'uppercase',
                                fontSize: '14px',
                                marginRight: '10px',
                              }}
                            >
                              {item.name?.charAt(0)}
                            </Avatar>
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.name}`}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {dayjs(item.createdDate).isValid()
                                  ? dayjs(item.createdDate)?.format(
                                      'MMMM DD, YYYY'
                                    )
                                  : '--'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.desc}</td>
                        {/* <td>{item.phone}</td> */}
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ACTIVE</span>
                          ) : (
                            <span className="badge badge-danger">INACTIVE</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <div>
                              <IconButton
                                title="Edit Shop"
                                className="m-0 pl-1"
                                onClick={() => handleEdit(item.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {list?.length < 1 ? (
            <CustomText noroundedborders text="No Records Found" />
          ) : null}
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
      {openFormDialog && (
        <CustomDialog
          singleField
          DialogHeader="Add Shop Type"
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={createFormHandler}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
        />
      )}
      {openEditFormDialog && (
        <CustomDialog
          singleField
          DialogHeader="Edit Shop Type"
          type="edit"
          specailCase={false}
          reset={reset}
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={updateFormHandler}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
        />
      )}
    </>
  );
}

export default ShopTypePage;
