export {};

import * as Models from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      locals: { user?: Models.User | undefined };
      user?: Models.user;
    }
    export interface AuthenticatedRequest extends Request{
      user: Models.user;
    }
  }
}
