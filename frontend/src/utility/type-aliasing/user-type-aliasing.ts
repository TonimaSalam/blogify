export type userType = {
  userID: number;
  username: string;
  useremail: string;
};

export type RegistrationFormFieldsType = {
  username: string;
  useremail: string;
  password: string;
  reEnteredPassword: string;
};

export type LogInFormFieldsType = {
  username: string;
  password: string;
};

export type updateUserFormFieldsType = {
  newPassword: string;
  oldPassword: string;
};

export const toastObj = {
  autoClose: 1000
}
