import dotenv from 'dotenv';

dotenv.config();

import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import requestLogger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import logger from './libs/logger';

import { ContentSecurityPolicyDirectiveValue } from './types';
import { AppDataSource } from './database';

AppDataSource
  .initialize()
  .then(() => { logger('Database connected'); })
  .catch(error => logger(error));

import indexRouter from './routes/index';

const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const csp: {[p: string]: Iterable<ContentSecurityPolicyDirectiveValue>} = helmet.contentSecurityPolicy.getDefaultDirectives();
(csp['script-src'] as ContentSecurityPolicyDirectiveValue[]).push("'unsafe-inline'");
(csp['script-src'] as ContentSecurityPolicyDirectiveValue[]).push('https://cdn.jsdelivr.net/npm/');

app.use(
  helmet(
    {
      contentSecurityPolicy: {
        directives: csp
      },
    }
  )
);

app.use(cors());
app.use(requestLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: { message: string; status: number; }, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;