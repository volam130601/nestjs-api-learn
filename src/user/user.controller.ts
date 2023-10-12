import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
@Controller('users')
export class UserController {

    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(MyJwtGuard) // you can also make own 'decorator' 
    @Get('me')
    me(@GetUser() user: User) {
        return user
    }
}
