export interface LogonRequestInfo {
  userAccount: string;
  password: string;
  authenticationKey?: string;
}

export interface UserInfo {
  userAccount: string;
  userName: string;
}