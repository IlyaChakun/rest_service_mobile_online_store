export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';
export const USER_ID = 'id';
export const LANGUAGE = 'language';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const SUCCESS = 'success';
export const ERROR = 'error';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;


export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;


export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;


export const MAX_TAGS = 6;

export const MAX_PRICE = 1000000;
export const PRODUCT_NAME_MAX_LENGTH = 64;
export const PRODUCT_NAME_MIN_LENGTH = 5;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 512;
export const PRODUCT_TAG_MAX_LENGTH = 15;
export const PRODUCT_TAG_MIN_LENGTH = 3;
