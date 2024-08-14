import mongoose, {Schema, Document} from "mongoose";

export interface Season extends Document {
    seasonNumber: number;
    webSeriesId: mongoose.Types.ObjectId;
    episodes: mongoose.Types.ObjectId[];
    releaseDate: Date;
}

const SeasonSchema: Schema<Season> = new Schema({
    seasonNumber: {
        type: Number,
        required: true,
    },
    webSeriesId: {
        type: Schema.Types.ObjectId,
        ref: "Content"
    },
    episodes: [{
        type: Schema.Types.ObjectId,
        ref: "Episode"
    }],
    releaseDate: {
        type: Date,
        default: Date.now,
    },
});

const SeasonModel = (mongoose.models.Season as mongoose.Model<Season>)
    || (mongoose.model<Season>("Season", SeasonSchema));

export default SeasonModel;