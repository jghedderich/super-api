import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateDirectoryDTO,
  PatchDirectoryDTO,
  UpdateDirectoryDTO,
} from './directory.dto';
import { Origin } from './origin.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  status() {
    return 'pong';
  }

  @Post('directories')
  create(@Body() data: CreateDirectoryDTO) {
    return this.appService.create(data);
  }

  @Put('directories/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateDirectoryDTO,
  ) {
    return this.appService.update(id, data);
  }

  @Patch('directories/:id')
  patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: PatchDirectoryDTO,
  ) {
    return this.appService.update(id, data);
  }

  @Get('directories/:id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.getById(id);
  }

  @Get('directories/:page/:perPage')
  async paginated(
    @Param('page', ParseIntPipe) page: number,
    @Param('perPage', ParseIntPipe) perPage: number,
    @Origin() origin: string,
  ) {
    const { results, nextPage, previousPage, count } =
      await this.appService.getPaginated(page, perPage);
    return {
      results,
      count,
      next: `${origin}/directories/${nextPage}/${perPage}`,
      previous: `${origin}/directories/${previousPage}/${perPage}`,
    };
  }

  @Delete('directories/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.delete(id);
  }
}
