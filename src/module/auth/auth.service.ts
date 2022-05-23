import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(user: User) {
    const result = await this.userService.findByUsername(user);
    if (result && result.password === user.password) {
      const { password, ...res } = result;

      return res;
    }
    return null;
  }

  generateToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
