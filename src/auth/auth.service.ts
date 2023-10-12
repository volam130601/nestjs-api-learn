import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import * as argon from 'argon2';
import { AuthDTO } from "./dto"
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
@Injectable({})
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService) {

    }
    async register(authDTO: AuthDTO) {
        //generate password to hashedPassword
        const hashedPassword = await argon.hash(authDTO.password)
        //insert data to database
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                    firstName: '',
                    lastName: '',
                },
                //only select id, email, createAt
                select: {
                    id: true,
                    email: true,
                    createAt: true
                }
            })
            return await this.signJwtToken(user.id, user.email)


        } catch (err) {
            if (err.code === 'P2002') {
                throw new ForbiddenException('User with this email already exists')
            }
        }
    }

    async login(authDTO: AuthDTO) {
        //find user with input email
        const user = await this.prismaService.user.findUnique(
            {
                where: {
                    email: authDTO.email
                }
            }
        )
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const passwordMatched = await argon.verify(
            user.hashedPassword,
            authDTO.password
        )
        if (!passwordMatched) {
            throw new ForbiddenException('Incorrect password');
        }
        delete user.hashedPassword //remove 1 field in the object

        //it doesn't affect to the Database
        return await this.signJwtToken(user.id, user.email)
    }

    //now convert to an object, not string
    async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email: email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '10m',
            secret: this.configService.get('JWT_SECRET'),
        });

        return {
            accessToken: jwtString,
        }
    }


}