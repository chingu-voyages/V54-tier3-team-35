import UserModel from "../models/users-models";

class UserService {
  public static checkDuplicateUser(email: string, username: string): Promise<{ emailExists: boolean; usernameExists: boolean }> {
    return Promise.all([
      UserModel.isUserEmailExists(email),
      UserModel.isUsernameExists(username),
    ]).then(([emailExists, usernameExists]) => ({ emailExists, usernameExists }));
  }

  public static createUser(username: string, email: string, password: string) {
    return UserModel.createUser(username, email, password);
  }
}

export default UserService;