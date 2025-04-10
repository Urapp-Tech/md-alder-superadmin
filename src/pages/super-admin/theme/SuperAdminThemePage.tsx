import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, TablePagination } from '@mui/material';
import dayjs from 'dayjs';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import ColorRow from '../../../components/common/ColorRow';
import ColorRowWithTooltips from '../../../components/common/ColorRowWithTooltips';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import SearchControl from '../../../components/common/SearchControl';
import TopBar from '../../../components/common/TopBar';
import Service from '../../../services/superadmin/theme';

function SuperAdminThemePage() {
  const navigate = useNavigate();
  const [list, setList] = useState<Array<any>>([]);
  const [isLoader, setIsLoader] = useState(true);
  const [search, setSearch] = useState('');

  //   Pagination
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //   Notify
  const { notification, hideNotification, showNotification } =
    useNotification();

  /**
   * Handle error and show error message.
   * @param {string} errorMessage message to display when error is encountered.
   */
  const handleErrorMessage = (errorMessage: string) => {
    showNotification(errorMessage, 'error');
  };

  /**
   * Get the list of supported themes configurations.
   * @param {number} page define the current page
   * @param {number} [size] define the size of the dataset (default: 10)
   * @param {string} [search] define the size of the dataset (default: 10)
   */
  const fetchThemeConfigList = async (page: number, size = 10, search = '') => {
    try {
      const response = _.isEmpty(search)
        ? await Service.listTheme(page, size)
        : await Service.searchTheme(search, page, size);
      const item = response.data;
      if (item.success) {
        setList(item.data.list);
        setTotal(item.data.total);
      } else {
        handleErrorMessage(item.message);
      }
    } catch (error: any) {
      handleErrorMessage(error?.message || 'Internal Server Error');
    } finally {
      setIsLoader(false);
    }
  };

  /**
   * Handles the change of the current page number.
   * @param event Mouse event
   * @param newPage current page
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    fetchThemeConfigList(page, rowsPerPage, search);
  };

  /**
   * Handle the page size change event from the pagination
   * @param event new page change event
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const size = parseInt(event.target.value, 10);
    setRowsPerPage(size);
    setPage(0);
    fetchThemeConfigList(0, size, search);
  };

  /**
   * Handle the change of the current search field in the theme config list.
   * @param e Event object containing the event data of input key up event
   */
  const handleSearch = (v: string) => {
    setSearch(_.toString(v).trim());
    setPage(0);

    fetchThemeConfigList(0, rowsPerPage, v);
  };

  useEffect(() => {
    fetchThemeConfigList(page, rowsPerPage);
  }, []);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Theme" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Themes
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                {/* Search Control */}
                <SearchControl onSearch={handleSearch} />

                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon flex items-center"
                  onClick={() => navigate('../create')}
                >
                  <AddOutlinedIcon /> <span className="text-xs">Add New</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Key</th>
                  <th>Theme Colors</th>
                  <th>Category Colors</th>
                  <th>Created At</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="avatar flex flex-row items-center">
                        <div className="flex flex-col items-start justify-start">
                          <span className="text-sm font-semibold">
                            {item?.key}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <ColorRowWithTooltips colors={item?.value?.themeColor} />
                    </td>
                    <td>
                      <ColorRow colors={item?.value?.categoryColor} />
                    </td>
                    <td>
                      {dayjs(item.createdDate).isValid() ? (
                        <>
                          {dayjs(item.createdDate)?.format('ddd, MMM DD, YYYY')}
                          <br />
                          {dayjs(item.createdDate)?.format('hh:mm:ss A')}
                        </>
                      ) : (
                        '--'
                      )}
                    </td>
                    <td>
                      <div className="flex flex-row-reverse">
                        <IconButton
                          className="icon-btn mr-3.5 p-0"
                          onClick={() => navigate(`../edit/${item?.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
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

export default memo(SuperAdminThemePage);
