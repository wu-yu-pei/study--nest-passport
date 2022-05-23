import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/common/guard/JwtAuthGuard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from './role.enum';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() user) {
    const res = await this.userService.register(user);
    if (!res) throw new BadRequestException();
    return res;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.User)
  @Get('getAll')
  async getAll(@Request() req) {
    return await this.userService.findAll();
  }
}
