import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import TimePicker from '../../../components/common/TimePicker';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { setWordDays } from '../../../redux/features/shopScheduleStateSlice';
import { useAppSelector } from '../../../redux/redux-hooks';
import { WorkDay } from '../../../interfaces/superadmin/shop-schedule.interface';
import { useSnackbar } from '../../../components/hooks/useSnackbar';

function AllDays() {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const workDays = useAppSelector((state) => state.scheduleState.workDays);
  const { showMessage } = useSnackbar();

  const [devices, setDevices] = useState(() => []);
  const [openTime, setOpenTime] = useState<any>(null);
  const [closeTime, setCloseTime] = useState<any>(null);

  const handleDevices = (
    event: React.MouseEvent<HTMLElement>,
    newDevices: any
  ) => {
    if (newDevices.length) {
      setDevices(newDevices);
      // console.log(newDevices);
    }
  };

  // eslint-disable-next-line consistent-return
  const updateAllSelectedDays = () => {
    if (!openTime || !closeTime)
      return showMessage('Please select both times', 'error');

    const updatedDays = [...workDays];

    devices.forEach((day) => {
      const index = updatedDays.findIndex((x) => x.day === day);

      const newDay = {
        day,
        openTime,
        closeTime,
      };

      if (index > -1) {
        updatedDays[index] = { ...updatedDays[index], ...newDay };
      } else {
        updatedDays.push(newDay);
      }
    });

    dispatch(setWordDays(updatedDays));
  };

  const handleDeleteDays = (i: number) => {
    const days = [...workDays];
    days.splice(i, 1);
    dispatch(setWordDays(days));
  };

  return (
    <div className="height-230">
      <div className="FormField">
        <ToggleButtonGroup
          value={devices}
          onChange={handleDevices}
          aria-label="device"
        >
          <ToggleButton
            className="CustomToggleBtn"
            value="Sunday"
            aria-label="Sunday"
            disableRipple
          >
            Sun
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Monday"
            aria-label="Monday"
            disableRipple
          >
            Mon
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Tuesday"
            aria-label="Tuesday"
            disableRipple
          >
            Tue
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Wednesday"
            aria-label="Wednesday"
            disableRipple
          >
            Wed
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Thursday"
            aria-label="Thursday"
            disableRipple
          >
            Thu
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Friday"
            aria-label="Friday"
            disableRipple
          >
            Fri
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Saturday"
            aria-label="Saturday"
            disableRipple
          >
            Sat
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="FormFields">
        <FormControl>
          <TimePicker
            timePickerLabel="Open Time"
            timePickerValue={openTime}
            setTimePickerValue={setOpenTime}
            id="shopInTimePicker"
          />
          {errors.shopOpenTime && (
            <ErrorSpanBox error="This field is required" />
          )}
        </FormControl>

        <FormControl>
          <TimePicker
            timePickerLabel="Close Time"
            timePickerValue={closeTime}
            setTimePickerValue={setCloseTime}
            id="shopOutTimePicker"
          />
          {errors.shopCloseTime && (
            <ErrorSpanBox error="This field is required" />
          )}
        </FormControl>
      </div>
      <div className="mt-3">
        <Button
          className="btn-black-fill"
          sx={{
            padding: '0.375rem 2rem !important',
          }}
          onClick={updateAllSelectedDays}
        >
          Set Timings
        </Button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Open</th>
              <th>Close</th>
              {/* <th>Break</th> */}
              {/* <th>Break End</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workDays?.map((d, index) => {
              return (
                <tr key={d.day}>
                  <th>{d.day}</th>
                  <td>
                    {' '}
                    {dayjs(d.openTime).isValid()
                      ? d?.openTime?.format('h:mm A')
                      : '--'}{' '}
                  </td>
                  <td>
                    {' '}
                    {dayjs(d.closeTime).isValid()
                      ? d?.closeTime?.format('h:mm A')
                      : '--'}{' '}
                  </td>
                  {/* <td>
                    {d.breakTime && d.breakTime?.isValid()
                      ? d.breakTime?.format('h:mm A')
                      : '--'}
                  </td>
                  <td>
                    {' '}
                    {d.breakOffTime && d.breakOffTime?.isValid()
                      ? d.breakOffTime?.format('h:mm A')
                      : '--'}
                  </td> */}
                  <td>
                    <Button
                      color="warning"
                      variant="text"
                      onClick={() => handleDeleteDays(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDays;
