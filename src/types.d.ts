import { IncomingMessage, ServerResponse } from 'http';

interface ContentSecurityPolicyDirectiveValueFunction {
  (req: IncomingMessage, res: ServerResponse): string
}

export declare type ContentSecurityPolicyDirectiveValue = string | ContentSecurityPolicyDirectiveValueFunction;
