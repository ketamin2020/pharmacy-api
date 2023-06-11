const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const DeliveryTypeNum = {
  PICKUP: 1,
  NOVA_POSHTA: 2,
  DELIVERY: 3,
};
const PaymentTypeNum = {
  CARD: 1,
  IN_SHOP: 2,
};

const StatusTypeNum = {
  ACTIVE: 1,
  INACTIVE: 2,
};
const orderedSchema = new Schema(
  {
    user_id: { type: ObjectId, required: true, unique: true },
    basket_id: { type: ObjectId, required: true, unique: true },
    delivery_type: {
      type: Number,
      required: true,
      default: DeliveryTypeNum.PICKUP,
    },
    status: { type: Number, required: true, default: StatusTypeNum.ACTIVE },
    status_history: { type: Array, required: false, default: [] },
    total: { type: Number, required: true },
    callback: { type: Boolean, required: true, default: false },
    comment: { type: String, required: false, default: "" },
    completed: { type: Boolean, required: false, default: false },
    client: {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      middle_name: { type: String, required: true },
      email: { type: String, required: false },
      phone: { type: String, required: true },
      user_id: { type: ObjectId, required: true, unique: true },
    },
    discount: {
      usedBonus: { type: Number, required: true, default: 0 },
      warehouseId: { type: Number, required: true, default: 0 },
    },
    products: { type: Array, required: true, default: [] },
    payment: {
      type: { type: Number, required: true, default: PaymentTypeNum.IN_SHOP },
      name: { type: String, required: false, default: 0 },
      price: {
        description: { type: String, required: false },
        totalToPay: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
    delivery: {
      city: {
        id: { type: String, required: false },
        latitude: { type: String, required: false },
        longitude: { type: String, required: false },
        name: { type: String, required: true, default: "Київ" },
      },
      recipient: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        middle_name: { type: String, required: true },
        email: { type: String, required: false },
        phone: { type: String, required: true },
        user_id: { type: ObjectId, required: true, unique: true },
        itself: { type: Boolean, required: true },
        street: { type: String, required: false },
        house_number: { type: String, required: false },
        flat_number: { type: String, required: false },
      },
    },
    warehouse: {
      houseNumber: { type: String, required: false },
      id: { type: String, required: false },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
      loyalty: { type: Boolean, required: false },
      name: { type: String, required: false },
      number: { type: String, required: false },
      postcode: { type: String, required: false },
      selfService: { type: Boolean, required: false },
      street: { type: String, required: false },
      typeSlug: { type: String, required: false },
      workTime: { type: String, required: false },
      workTimeArray: { type: Array, required: false },
    },
  },
  { timestamps: true }
);

const orderedModel = mongoose.model("Ordered", orderedSchema);

module.exports = orderedModel;
