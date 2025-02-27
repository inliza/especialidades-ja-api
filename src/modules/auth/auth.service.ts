import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'), // Usa el secreto desde .env
        });
    }

    async generateToken(payload): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email }; // Retorna los datos del usuario en el request
    }
}
