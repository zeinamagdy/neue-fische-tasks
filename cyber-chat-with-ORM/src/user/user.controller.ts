import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { returnResponse } from '../common/utils/returedResponse.util';
import { UserResponseDto } from './dto/user-response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = this.userService.findByUsername(username);
    return returnResponse(user, UserResponseDto, 'user');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
