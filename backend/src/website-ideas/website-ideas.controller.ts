import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { WebsiteIdeasService } from './website-ideas.service';
import { CreateWebsiteIdeaDto } from './dto/create-website-idea.dto';

interface WebsiteIdea {
  id: string;
  idea: string;
  sections: any[];
  createdAt: string;
}

@Controller('website-ideas')
export class WebsiteIdeasController {
  constructor(private readonly websiteIdeasService: WebsiteIdeasService) {}

  @Post()
  async create(@Body() createWebsiteIdeaDto: CreateWebsiteIdeaDto): Promise<any> {
    try {
      const result = await this.websiteIdeasService.create(createWebsiteIdeaDto);
      return {
        success: true,
        data: result,
        message: 'Website idea created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to create website idea',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<any> {
    try {
      const result = await this.websiteIdeasService.findAll();
      return {
        success: true,
        data: result,
        message: 'Website ideas retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to retrieve website ideas',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.websiteIdeasService.findOne(id);
      return {
        success: true,
        data: result,
        message: 'Website idea retrieved successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            success: false,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to retrieve website idea',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 