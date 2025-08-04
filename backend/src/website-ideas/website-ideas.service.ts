import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWebsiteIdeaDto } from './dto/create-website-idea.dto';
import { WebsiteIdea, WebsiteIdeaDocument } from './schemas/website-idea.schema';
import { Section } from './schemas/section.schema';

@Injectable()
export class WebsiteIdeasService {
  constructor(
    @InjectModel(WebsiteIdea.name) private websiteIdeaModel: Model<WebsiteIdeaDocument>,
  ) {}

  async create(createWebsiteIdeaDto: CreateWebsiteIdeaDto): Promise<WebsiteIdea> {
    try {
      const sections = this.generateSections(createWebsiteIdeaDto.idea);
      
      const websiteIdea = new this.websiteIdeaModel({
        idea: createWebsiteIdeaDto.idea,
        sections,
      });

      const savedWebsiteIdea = await websiteIdea.save();
      return savedWebsiteIdea.toObject();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create website idea');
    }
  }

  async findAll(): Promise<WebsiteIdea[]> {
    try {
      const websiteIdeas = await this.websiteIdeaModel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();
      return websiteIdeas;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch website ideas');
    }
  }

  async findOne(id: string): Promise<WebsiteIdea> {
    try {
      const websiteIdea = await this.websiteIdeaModel.findById(id).lean().exec();
      if (!websiteIdea) {
        throw new NotFoundException('Website idea not found');
      }
      return websiteIdea;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch website idea');
    }
  }

  private generateSections(idea: string): Section[] {
    // This is a simple mock implementation that generates dummy sections
    // In a real application, this would call an AI service like OpenAI
    const sections: Section[] = [
      {
        id: this.generateId(),
        name: 'Hero',
        content: `Welcome to our ${idea.toLowerCase()}. We provide exceptional services and products that meet your needs. Discover what makes us unique and why you should choose us for your requirements.`,
        order: 1,
      },
      {
        id: this.generateId(),
        name: 'About',
        content: `Learn more about our ${idea.toLowerCase()}. We are passionate about delivering quality and excellence in everything we do. Our team is dedicated to providing the best experience for our customers.`,
        order: 2,
      },
      {
        id: this.generateId(),
        name: 'Contact',
        content: `Get in touch with us to learn more about our ${idea.toLowerCase()}. We're here to help and answer any questions you may have. Contact us today to get started.`,
        order: 3,
      },
    ];

    return sections;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
} 