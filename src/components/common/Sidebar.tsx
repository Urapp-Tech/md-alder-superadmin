/* eslint-disable prettier/prettier */
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Fragment, useEffect, useState } from 'react';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
// import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
import { defineRules } from '../../services/permissions/permissions';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
import PermissionIcon from '../icons/PermissionIcon';
import RoleIcon from '../icons/RoleIcon';
import ShopIcon from '../icons/ShopIcon';
import ServiceIcon from '../icons/serviceIcon';
// import TenantIcon from '../icons/TenantIcon';
import UserPermission from '../icons/UserPermission';

const superAdminlinks = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   name: 'App Image',
  //   path: 'app/image-upload',
  //   icon: <CollectionsOutlinedIcon fontSize="inherit" />,
  // },
  {
    name: 'Doctor',
    path: 'doctor',
    icon: <GroupsOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   name: 'Shops',
  //   path: 'tenant/shop',
  //   icon: <ShopIcon />,
  // },
  // {
  //   name: 'Shop Type',
  //   path: 'shop-type',
  //   icon: <ShopIcon />,
  // },
  // {
  //   name: 'tenant',
  //   path: 'tenant',
  //   icon: <TenantIcon />,
  //   childLinks: [
  //     {
  //       name: 'shops',
  //       path: 'tenant/shop',
  //       icon: <ShopIcon />,
  //     },
  //     {
  //       name: 'users',
  //       path: 'tenant/user',
  //       icon: <GroupsOutlinedIcon className="w-[20px]" />,
  //     },
  //   ],
  // },
  // {
  //   name: 'Shops',
  //   path: 'tenant',
  //   icon: <ShopIcon />,
  //   childLinks: [
  //     {
  //       name: 'Type',
  //       path: 'tenant/type',
  //       icon: <CalendarViewWeekOutlinedIcon />,
  //     },
  //     {
  //       name: 'Vendors',
  //       path: 'tenant/shops',
  //       icon: <ShopIcon />,
  //     },
  //   ],
  // },
  {
    name: 'user permissions',
    path: 'role',
    icon: <UserPermission />,
    childLinks: [
      {
        name: 'Permission',
        path: 'user-permission/permission',
        icon: <PermissionIcon />,
      },
      {
        name: 'Role',
        path: 'user-permission/role',
        icon: <RoleIcon />,
      },
    ],
  },
  // {
  //   name: 'Theme',
  //   path: 'theme-configuration',
  //   icon: <ServiceIcon />,
  // },
];

function Sidebar() {
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const logo = useAppSelector(
    (state: any) => state?.persisitReducer?.appState?.logo
  );

  // console.log("appItems", logo);

  const [list, setList] = useState<any>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const dataRole = useAppSelector((state: any) => state);
  const [emptyVariable] = useState(null);

  // const dispatch = useAppDispatch();
  // const logOut = () => {
  //   dispatch(logout());
  //   dispatch(setItemState(null));
  //   dispatch(setLogo(null));
  //   dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
  // };
  // console.log("ei",expandedIndex);

  const handleToggle = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  function NavbarLinks(
    path: any,
    icon: any,
    name: string,
    index: number,
    padding: any,
    paddingLeft: any
  ) {
    return (
      <NavLink
        key={path}
        className={({ isActive }) =>
          isActive
            ? `is-active-img bg-opacity-5 text-gray-200 ${padding} ${paddingLeft} w-full pr-4`
            : `${padding} ${paddingLeft} w-full pr-4`
        }
        to={path}
      >
        <div className="flex items-center text-gray-50">
          <span className="text-base leading-3">{icon} </span>
          <div className="mr-2">&nbsp;</div>
          <span className="font-open-sans text-sm font-semibold">{name}</span>
        </div>
      </NavLink>
    );
  }

  function SideBarMenu(
    path: string,
    name: string,
    icon: any,
    childLinks: any,
    index: number
  ) {
    return childLinks?.length > 0 ? (
      <>
        <div
          onClick={() => handleToggle(index)}
          className="mx-[30px] flex cursor-pointer items-center justify-between"
        >
          <div className="my-3 flex items-center">
            <div className="pr-[7px]">
              <span className="text-base leading-3">{icon}</span>
            </div>
            <div className="mx-[8px] font-open-sans text-sm font-semibold capitalize">
              {name}
            </div>
          </div>
          <div className="">
            {expandedIndex === index ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {expandedIndex === index &&
          childLinks?.map((el: any, childIndex: number) => {
            return (
              <div key={childIndex} className="mx-8 flex">
                {NavbarLinks(
                  el.path,
                  el.icon,
                  el.name,
                  childIndex,
                  'py-2',
                  'pl-[21px]'
                )}
              </div>
            );
          })}
      </>
    ) : (
      NavbarLinks(path, icon, name, index, 'py-3', 'pl-8')
    );
  }

  useEffect(() => {
    defineRules(dataRole?.persisitReducer?.roleState?.role?.permissions);
    setList(superAdminlinks);
  }, [emptyVariable]);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: 'left-sidebar box-border w-64 border-r-0',
      }}
    >
      <List disablePadding>
        <Toolbar
          className={userData?.userType === 'SUPER_USER' ? 'mb-10' : 'my-3'}
        >
          <Stack
            className="h-[100%] w-full pl-4"
            direction="row"
            justifyContent="left"
          >
            <img
              className="mt-9 h-[29px] max-w-[150px]"
              src={assets.images.superadminLogo}
              alt=""
            />
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {/* {SideBarMenu("", "Dashboard", <GridViewOutlinedIcon fontSize="inherit" />)} */}
          {list &&
            list?.map((link: any, index: number) => {
              return (
                <Fragment key={link.path}>
                  {SideBarMenu(
                    link.path,
                    link.name,
                    link.icon,
                    link.childLinks,
                    index
                  )}
                </Fragment>
              );
            })}
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
