import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';

type Props = {
  items: any;
  openFormDialog: boolean;
  setOpenFormDialog: any;
};

function SuperAdminUserDialog({
  items,
  openFormDialog,
  setOpenFormDialog,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    items[0] && (
      <Dialog
        open={openFormDialog}
        onClose={handleFormClose}
        PaperProps={{
          className: 'Dialog',
          style: { maxWidth: '100%', maxHeight: 'auto' },
        }}
      >
        <div className="Content">
          <span className="font-open-sans text-xl font-semibold not-italic text-secondary">
            User Details
          </span>
          <div className="grid w-full grid-cols-12 gap-3 bg-transparent">
            <div className="col-span-8 mx-2 my-1">
              <div className="flex flex-col px-5 py-[1rem]">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Avatar
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    <Avatar
                      className="avatar flex flex-row items-center"
                      alt="Remy Sharp"
                      src={items[0].avatar}
                      sx={{
                        width: 50,
                        height: 50,
                        textTransform: 'uppercase',
                        fontSize: '14px',
                        marginRight: '10px',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Name
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {`${items[0].firstName} ${items[0].lastName}`}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Email
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {items[0].email}
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-8 gap-6">
                  <div className="col-span-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                      Created Date
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {dayjs(items[0].createdDate).isValid()
                        ? dayjs(items[0].createdDate)?.format(
                            'ddd MMM DD YYYY HH:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                      Updated Date
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {dayjs(items[0].updatedDate).isValid()
                        ? dayjs(items[0].updatedDate)?.format(
                            'ddd MMM DD YYYY HH:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-8 gap-6">
                  <div className="col-span-4 mt-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                      Status
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {items[0].isActive ? (
                        <span className="badge badge-success">ACTIVE</span>
                      ) : (
                        <span className="badge badge-danger">INACTIVE</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 mt-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                      Sent Email
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {items[0].sendToEmail ? (
                        <span className="badge badge-success">sent</span>
                      ) : (
                        <span className="badge badge-danger">NOt Sent</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  );
}

export default SuperAdminUserDialog;
