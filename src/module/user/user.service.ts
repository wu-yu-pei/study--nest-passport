import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async verify(user: User) {
    const res = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });
    console.log(res);
  }

  async findByUsername(user: User) {
    const res = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });
    return res;
  }

  async register(user: User) {
    let res;
    try {
      res = await this.usersRepository.save(user);
    } catch (error) {
      console.log('---用户名已存在---');
    }
    return res;
  }

  async findAll() {
    return await this.findByUsername({
      username: 'wuyupei',
      password: '123456',
    } as User);
  }
}
