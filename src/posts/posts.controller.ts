import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { Controller, Get, Post, Delete, Put, Param, Body, ParseIntPipe, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Posts } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('posts')
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.'})
    public findAll(): Array<Posts> {
      return this.postsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Post retrieved successfully.'})
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public findOne(@Param('id', ParseIntPipe) id: number): Posts {
    return this.postsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ description: 'Post created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    public create(@Body() post: Posts): Posts {
      return this.postsService.create(post);
    }
  
    @Delete(':id')
    @ApiOkResponse({ description: 'Post deleted successfully.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public delete(@Param('id', ParseIntPipe) id: number): void {
      this.postsService.delete(id);
    }
  
    @Put(':id')
    @ApiOkResponse({ description: 'Post updated successfully.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    public update(
      @Param('id', ParseIntPipe) id: number,
      @Body() post: Posts,
    ): Posts {
      return this.postsService.update(id, post);
    }
}