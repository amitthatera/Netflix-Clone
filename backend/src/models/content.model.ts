import mongoose, {Document, Schema} from "mongoose";

export enum ContentType {
    MOVIE = "MOVIE",
    WEB_SERIES = "WEB SERIES",
}

export interface Content extends Document {
    title: string;
    description: string;
    genre: string[];
    type: ContentType;
    releaseDate: Date;
    duration?: number;
    cast: string[];
    seasons: mongoose.Types.ObjectId[];
    directors: string[];
    writers: string[];
    rating: number;
    languages: string[];
    country: string;
    trailerUrl: string
    thumbnailUrl: string;
    videoUrl: string;
}

const ContentSchema: Schema<Content> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: Text,
    genre: [{
        type: String,
        required: true
    }],
    type: {
        type: String,
        required: true,
        enum: Object.values(ContentType)
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        require: true
    },
    cast: [{
        type: String,
        required: true
    }],
    seasons: [{
        type: Schema.Types.ObjectId,
        ref: "Season"
    }],
    directors: [{
        type: String,
        required: true
    }],
    writers: [{
        type: String,
        required: true
    }],
    rating: Number,
    languages: [{
        type: String,
        required: true
    }],
    trailerUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ContentModel = (mongoose.models.Content as mongoose.Model<Content>)
    || (mongoose.model<Content>("Content", ContentSchema));

export default ContentModel;