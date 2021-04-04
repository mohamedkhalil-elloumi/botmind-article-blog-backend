import { User } from "../entity/User";
import md5 from "md5";

export class AuthService {
  constructor() {}

  public async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const doesUserExist = await User.findOne({ email: email });
    if (doesUserExist !== undefined) throw new Error("Email Taken");

    try {
      const passwordHashed = md5(password);
      const user = new User();
      user.email = email.trim();
      user.password = passwordHashed;
      user.firstName = firstName.trim();
      user.lastName = lastName.trim();
      await user.save();
    } catch (err) {
      throw new Error(err);
    }

    return { email };
  }

  public async login(email: string, password: string) {
    const doesUserExist = await User.createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email: email })
      .getOne();
    if (doesUserExist !== undefined) {
      try {
        const inputPasswordHashed = md5(password);
        if (inputPasswordHashed === doesUserExist.password) {
          const userDetails = {
            email: doesUserExist.email,
            firstName: doesUserExist.firstName,
            lastName: doesUserExist.lastName,
            id: doesUserExist.id,
          };
          return userDetails;
        } else {
          throw new Error("Invalid email or password");
        }
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("User does not exist");
    }
  }

  public async deleteUser(user_id: number) {
    const doesUserExist = await User.findOne(user_id);
    if (doesUserExist !== undefined) {
      try {
        await User.remove(doesUserExist);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("User does not exist");
    }
  }
}
