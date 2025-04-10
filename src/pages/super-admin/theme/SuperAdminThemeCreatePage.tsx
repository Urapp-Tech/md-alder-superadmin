import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import Service from '../../../services/superadmin/theme';
import SuperAdminThemeForm from './SuperAdminThemeForm';

function SuperAdminThemeCreatePage() {
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  // Notify
  const { notification, hideNotification, showNotification } =
    useNotification();

  /**
   * Handles the creation of a form.
   *
   * @param {any} data - The data from the form.
   * @returns {void}
   */
  const createFormHandler = (data: any) => {
    setIsLoader(true);
    if (data.key) {
      Service.createTheme(data)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            showNotification(item.data.message, 'success');
            navigate('../list');
          } else {
            setIsLoader(false);
            showNotification(item.data.message, 'error');
          }
        })
        .catch((err) => {
          setIsLoader(false);
          showNotification(err.message, 'error');
        });
    } else {
      setIsLoader(false);
      showNotification('All fields are required!', 'error');
    }
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Theme" isNestedRoute />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                Add new Themes
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <div className="Content p-5">
              <SuperAdminThemeForm
                onSubmit={createFormHandler}
                editMode={false}
                theme={null}
              />
            </div>
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

export default memo(SuperAdminThemeCreatePage);
