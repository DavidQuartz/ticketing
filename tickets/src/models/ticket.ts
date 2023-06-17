import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new ticket
interface TicketAttributes {
  title: number;
  price: number;
  userId: string;
}

// An interface that describes the properties
// that a ticket model has
interface TicketDoc extends mongoose.Document {
  title: number;
  price: number;
  userId: string;
}

// An interface that describes the properties
// that a user document has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttributes): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttributes) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
