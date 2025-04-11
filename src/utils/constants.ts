// const HOST = 'https://dev.urapptech.com';
const HOST = 'https://dev.urapptech.com';
export const BASE_URL =
  import.meta.env.VITE_BASE_URL || `${HOST}/api/v1/admin/`;
export const BASE_SYSTEM_URL =
  import.meta.env.VITE_SYSTEM_BASE_URL || `${HOST}/api/v1/system/config/`;
export const PROFILE_PREFIX = 'profile';
export const THEME_PREFIX = 'theme';
export const BACKOFFICE_PREFIX = 'back-office-user';
export const PERMISSION_PREFIX = 'permission';
export const RATING = 'rating';
export const SHOP_TYPE = 'shop-type';
export const TENANT_PREFIX = 'tenant';
export const ROLE_PREFIX = 'role';
export const SHOP_PREFIX = 'shop';
export const APP_IMAGE_PREFIX = 'appImage';

export const DOMAIN_PREFIX = '.urapptech.com';
export const DOMAIN_PROTOCOL = 'https://';
export const NOT_AUTHORIZED_MESSAGE = 'You dont have permission for this.';
export const SYSTEM_CONFIG_PREFIX = 'theme';

let TEXT_STORE_KEY = '';
export const setText = (text: string) => {
  TEXT_STORE_KEY = text;
};
export { TEXT_STORE_KEY };

// patterns
export const PATTERN = {
  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9\s.@]+$/,
  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9.@_-]+$/, // used for email fields
  // CHAR_SPACE_DASH: /^[A-Za-z\s-]+$/, // used for textfield fields
  // CHAR_NUM_SPACE_DASH: /^[A-Za-z0-9\s-]+$/, // used for textfield fields
  // ADDRESS_ONLY: /^[A-Za-z0-9\s@.,#-]+$/, // used for textfield address
  // CHAR_NUM_DASH: /^[A-Za-z0-9-]+$/, // used for only num,chars,dash like; postal code
  // NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  // ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  // PASSWORD: /^[^\s]+$/,
  // NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  // PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  // ONLY_NUM: /^\d+$/, // used for string type text
  // ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  // POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  // CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  // CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,

  CHAR_NUM_DOT_AT: /^[\s\S]+$/, // used for email fields
  CHAR_SPACE_DASH: /^[\s\S]+$/, // used for textfield fields
  CHAR_NUM_SPACE_DASH: /^[\s\S]+$/, // used for textfield fields
  ADDRESS_ONLY: /^[\s\S]+$/, // used for textfield address
  CHAR_SPEC_NUM_DASH: /^[\s\S]+$/, // used for textfield address
  CHAR_NUM_DASH: /^[\s\S]+$/, // used for only num,chars,dash like; postal code
  NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  PASSWORD: /^[\s\S]+$/,
  NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  ONLY_NUM: /^\d+$/, // used for string type text
  ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
};

export const MAX_LENGTH_EXCEEDED = 'Maximum length exceeded';
export const INVALID_CHAR = 'Invalid characters';
export const PH_MINI_LENGTH = 'Minimum length should be 15';

export const VALIDATE_NON_NEGATIVE_NUM = (value: any) => {
  return parseInt(value, 10) >= 0 || 'Must be a non-negative number';
};

export const VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH = (
  value: any,
  length: number
) => {
  const parsedValue = parseInt(value, 10);

  if (parsedValue >= 0 && parsedValue > length) {
    return true; // Validation passes
  }
  if (parsedValue < 0) {
    return 'Must be a non-negative number';
  }
  return `Must be greater than ${length}`;
};

export const imageAllowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

export const THEME_COLORS = [
  'primary',
  'background',
  'foreground',
  'secondary',
  'faded',
  'secondary2',
];

export const CATEGORY_COLORS_COUNT = 6;
