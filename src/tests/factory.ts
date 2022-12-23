import {
  Factory,
  FactorizedAttrs,
  LazyInstanceAttribute,
  EagerInstanceAttribute,
  SingleSubfactory,
  CollectionSubfactory
} from '@jorgebodega/typeorm-factory';
import { faker } from '@faker-js/faker';
import User from '../models/User';
import Subscriber from '../models/Subscriber';
import { Database } from '../database';

export class UserFactory extends Factory<User> {
  protected entity = User;
  protected dataSource = Database; // Imported datasource
  protected attrs(): FactorizedAttrs<User> {
    return {
      email: faker.internet.email(),
      accessToken: 'access token',
      refreshToken: 'refresh token',
      subscribers: new LazyInstanceAttribute((instance) => new CollectionSubfactory(SubscriberFactory, 3, {user: instance}))
    };
  };
}

export class SubscriberFactory extends Factory<Subscriber> {
  protected entity = Subscriber;
  protected dataSource = Database; // Imported datasource
  protected attrs(): FactorizedAttrs<Subscriber> {
    return {
      email: faker.internet.email(),
      user: new EagerInstanceAttribute((instance) => new SingleSubfactory(UserFactory, {subscribers: [instance]}))
    };
  };
}