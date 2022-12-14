import { googleAnalytics } from "./google-analytics";
import { mailing } from "./mailing";

export const config = {
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || 'production',
  },
  google: {
    analytics: googleAnalytics
  },
  mailing: mailing
}