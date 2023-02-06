import { UserRepository } from '@mongo-graphql/database';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<{ id: string, username: string }> {
    const user = await this.userRepository.findOne({ username })
    if (user && await bcrypt.compare(password, user.password)) {
      const { id, username } = user;
      return {
        id,
        username
      };
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: RegisterDto): Promise<{ id: string}> {
    const userExists = await this.userRepository.findOne({ username: data.username })
    if(userExists) {
      throw new BadRequestException('username already exists')
    }
    const { username, password } = data
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      password: passwordHash,
      username
    })
    return {
      id: user.id
    }
  }

}
