import {UserDAO} from "@/model/dao";

declare global {
  namespace Express {
    interface Request {
      currentUser: UserDAO;
    }
  }
}