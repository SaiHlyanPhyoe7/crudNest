import { DeleteResult, UpdateResult } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '../todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private TodoService: TodoService) {}

  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.TodoService.getAll();
  }
  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return await this.TodoService.create(todo);
  }
  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOne(@Param('id') id: number): Promise<Todo> {
    // console.log(id);
    return await this.TodoService.getOne(id);
  }
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: number,
    @Body() todo: Todo,
  ): Promise<UpdateResult> {
    // console.log(id);
    // console.log(todo);
    const updateData = await this.TodoService.update(id, todo);
    console.log(updateData);
    return updateData;
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.TodoService.delete(id);
  }
}
