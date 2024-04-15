export function usernameValidator(username: string | null): string | null {
  if (!username) return "user name required.";
  let countValidChar = 0;
  for (let i=0; i!=username.length; i++) {
    if (
      (username[i] >= "a" && username[i] <= "z") ||
      (username[i] >= "A" && username[i] <= "Z") ||
      (username[i] >= "0" && username[i] <= "9")
    )
      countValidChar = countValidChar + 1;
  }
  if (username.length < 5 || username.length >8)
    return "user name Should be between 5 to 8 characters.";
  else if (countValidChar != username.length)
    return "user name should contain only letters & numbers.";
  else return null;
}

export function emailValidator(email: string | null): string | null {
  if (!email) return "email required.";
  const regularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regularExpression.test(email)) return null;
  else return "Invalid email";
}

export function passwordValidator(password: string | null): string | null {
  if (!password) return "Password required.";
  let character: number = 0,
    number: number = 0,
    special: number = 0;
  for (let i=0;i!=password.length; i++) {
    if (
      (password[i] >= "a" && password[i] <= "z") ||
      (password[i] >= "A" && password[i] <= "Z")
    )
      character = 1;
    else if (password[i] >= "0" && password[i] <= "9") number = 1;
    else if (password[i] == "@" || password[i] == "#" || password[i] == "&")
      special = 1;
  }

  if (character * number * special * password.length >= 8) return null;
  else
    return "Password should contain at least 8 characters and at least one letter, number and special character @ or # or &";
}
