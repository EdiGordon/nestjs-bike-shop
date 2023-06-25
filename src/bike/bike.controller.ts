import { Body, Controller, Delete, Get, HttpCode, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { IBikeData, IBikeRO } from './bike.interface';
import { BikeService } from './bike.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBikeDto } from './dto/create-bike.dto';

@ApiBearerAuth()
@ApiTags('bikes')
@Controller('bikes')
export class BikeController {

  constructor(private readonly bikeService: BikeService) { }

  @Get('')
  async getBikes(): Promise<IBikeData[]> {
    return this.bikeService.findAll();
  }

  @Post('')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        price: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // @UseInterceptors(FileExtender)
  @UseInterceptors(FileInterceptor('file'))
  async postBike(@UploadedFile('file') file: Express.Multer.File, @Body() bikeData: CreateBikeDto): Promise<IBikeData> {
    // console.log(file);
    return this.bikeService.postBike(bikeData, file);
    // return null;
  }

  // @Delete(':username/follow')
  // async unFollow(@Body('bike') bikeData: CreateBikeDto, @Param('username') username: string): Promise<IBikeRO> {
  //   return this.bikeService.unFollow(userId, username);
  //   return null;
  // }
}
