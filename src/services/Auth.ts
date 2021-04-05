import { User } from "../entity/User";
import md5 from "md5";

// Authentication actions in the PGSQL DB

export class AuthService {
  constructor() {}

  // registration flow in the DB
  public async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    // look if the user already exists using the email since it's unique
    const doesUserExist = await User.findOne({ email: email });
    if (doesUserExist !== undefined) throw new Error("Email Taken");

    try {
      // hash the password using md5
      const passwordHashed = md5(password);
      const user = new User();
      // trim is used to remove the extra white spaces at the start and the end of the string
      user.email = email.trim();
      user.password = passwordHashed;
      user.firstName = firstName.trim();
      user.lastName = lastName.trim();
      //save the user in the DB
      await user.save();
    } catch (err) {
      throw new Error(err);
    }

    return { email };
  }

  public async login(email: string, password: string) {
    // look for the user to log him in
    const doesUserExist = await User.createQueryBuilder("user")
    /* the add select is the password column has select : false so to get it I need to 
    add it*/
      .addSelect("user.password")
      .where("user.email = :email", { email: email })
      .getOne();
    if (doesUserExist !== undefined) {
      try {
        // compare the password used in login with the password that exists already
        const inputPasswordHashed = md5(password);
        if (inputPasswordHashed === doesUserExist.password) {
          const userDetails = {
            email: doesUserExist.email,
            firstName: doesUserExist.firstName,
            lastName: doesUserExist.lastName,
            id: doesUserExist.id,
          };
          // return user's data except the password for jwt purposes
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
    // look for the user to delete based on his id
    const doesUserExist = await User.findOne(user_id);
    if (doesUserExist !== undefined) {
      try {
        // make a Cascade delete means the users and his articles will be deleted
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
