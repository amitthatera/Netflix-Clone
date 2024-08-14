import mongoose, {Schema} from "mongoose";


export interface Episode extends Document {
    seasonId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    duration: number;
    episodeNumber: number;
    videoUrl: string;
    thumbnailUrl: string;
}

const EpisodeSchema: Schema<Episode> = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: Text,
    duration: {
        type: Number,
        require: true
    },
    episodeNumber: {
        type: Number,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    thumbnailUrl: {
        type: String,
        require: true
    },
});

const EpisodeModel = (mongoose.models.Episode as mongoose.Model<Episode>)
    || (mongoose.model<Episode>("Episode", EpisodeSchema));

export default EpisodeModel;