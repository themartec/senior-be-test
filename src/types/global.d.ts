export {};

import { IncomingMessage, ServerResponse } from 'http';

declare global {

  interface ContentSecurityPolicyDirectiveValueFunction {
    (req: IncomingMessage, res: ServerResponse): string
  }

  type ContentSecurityPolicyDirectiveValue = string | ContentSecurityPolicyDirectiveValueFunction;
}