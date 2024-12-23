const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema(
    {

        prd_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        },
        full_name: {
            type: String,
            default: true,
        },
        email: {
            type: String,
            default: true,
        },
        body: {
            type: String,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comments", commentSchema, "comments");
module.exports = CommentModel;
