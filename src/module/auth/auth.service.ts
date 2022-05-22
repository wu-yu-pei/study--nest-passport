import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(user: User) {
    const result = await this.userService.findByUsername(user);
    if (result && result.password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...res } = result;

      return res;
    }
    return null;
  }
}
