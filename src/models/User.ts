import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Subscriber } from './Subscriber';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  accessToken: string

  @Column()
  refreshToken: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Subscriber, (subscriber: Subscriber) => subscriber.user,{ eager: true })
  subscribers: Subscriber[]
}