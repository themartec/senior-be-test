export {};

import * as Models from '../../models/User';

declare global {
  namespace Express {
    interface User extends Models.User {}
    interface Request {
      locals: { user?: User | undefined };
    }
    export interface Request {
      user: Models.user
    }
  }
}
