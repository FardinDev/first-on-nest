import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
   @Prop()
    id: number;
    @Prop()
    date: Date;
    @Prop()
    title: string;
    @Prop()
    body: string;
    @Prop()
    category: string;
    @Prop()
    image: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);