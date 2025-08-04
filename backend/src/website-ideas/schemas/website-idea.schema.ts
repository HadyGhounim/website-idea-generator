import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Section, SectionSchema } from './section.schema';

export type WebsiteIdeaDocument = WebsiteIdea & Document;

@Schema({ timestamps: true })
export class WebsiteIdea {
  @Prop({ required: true })
  idea: string;

  @Prop({ type: [SectionSchema], required: true })
  sections: Section[];
}

export const WebsiteIdeaSchema = SchemaFactory.createForClass(WebsiteIdea); 