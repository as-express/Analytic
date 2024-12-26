import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Param,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { userDto } from './dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('USER_ANALYTIC') private readonly userClient: ClientProxy,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async insertUsers(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Please update file');
    }
    const result = await this.userService.insertUsers(file);
    this.userClient.emit('insert_users', result);

    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() dto: userDto) {
    const result = await this.userService.createUser(dto);
    this.userClient.emit('insert_user', result.debt);

    return result;
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const result = await this.userService.removeUser(id);
    this.userClient.emit('remove_user', result);

    return true;
  }
}
