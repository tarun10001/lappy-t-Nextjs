import { Schema, model, models } from 'mongoose';

const LaptopSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    store_location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    screen_size: {
      type: String,
      required: true,
    },
    processor: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    cpu_brand: {
      type: String,
      required: true,
    },
    operating_system: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    graphics_card_memory: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    rates: {
      regular_price: {
        type: String,
      },
      discount_price: {
        type: String,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Laptop = models.Laptop || model('Laptop', LaptopSchema);

export default Laptop;