import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schema/database/user.model';
import { Model } from 'mongoose';
import { Role } from '../common/enums/userRole';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // Generate JWT Token
  async generateJwtToken(userId: string, email: string, isAdmin: boolean) {
    const payload = { sub: userId, email, isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate the JWT Token
  async validateJwtToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded; // You can return the decoded payload (e.g., user info)
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email, password });

    if (!user)
      throw new BadGatewayException('Login failed', 'Invalid credentials');

    const token = await this.generateJwtToken(
      user._id.toString(),
      email,
      user.role == Role.ADMIN,
    );
    return token.access_token;
  }

  async getProfile(email: string) {
    return await this.userModel.findOne({ email }).populate('data').exec();
  }
}
