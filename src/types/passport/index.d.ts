export {};

import * as Models from '../../models/User';

declare global {
  namespace Express {
    interface User extends Models.User {}
  }
}
