import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client'
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    // url: "postgresql://postgres:Abc12345678@localhost:5434/testdb?schema=public"
                    //we need to secure this !
                    url: configService.get('DATABASE_URL')
                }
            }
        })
    }
}
