import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      required: true,
    },

    hint: {
      type: String,
      default: "N/A",
    },

    isNew: {
      type: Boolean,
      default: true,
    },

    loved: {
      type: Boolean,
      default: false,
    },
    
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  { suppressReservedKeysWarning: true },
);

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MessageModel;
