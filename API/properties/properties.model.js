const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const propertiesSchema = new Schema(
  {
    morion: { type: Number, required: true, unique: true },
    external_code: { type: String, required: false },
    name: { type: String, required: true, default: "Властивості препарату" },
    attributes: {
      main: {
        id: { type: ObjectId, default: ObjectId() },
        title: { type: String, default: "Основні" },
        items: {
          active_ingredient: {
            title: { type: String, default: "Діюча речовина" },
            value: { type: String },
          },
          marketed_name: {
            title: { type: String, default: "Торгівельна назва" },
            value: { type: String },
          },
          manufacturing_country: {
            title: { type: String, default: "Країна виробник" },
            value: { type: String },
          },
          maker: {
            title: { type: String, default: "Виробник" },
            value: { type: String },
          },
          imported: {
            title: { type: String, default: "Ні" },
            value: { type: String },
          },
          dosage: {
            title: { type: String, default: "Дозування" },
            value: { type: String },
          },
          production_form: {
            title: { type: String, default: "Форма" },
            value: { type: String },
          },
          prescription: {
            title: { type: String, default: "Без рецепта" },
            value: { type: String },
          },
          morion: {
            title: { type: String, default: "Код Моріон" },
            value: { type: String },
          },
          administration_route: {
            title: { type: String, default: "Спосіб введення" },
            value: { type: String },
          },
          quantity: {
            title: { type: String, default: "Кількість в упаковці" },
            value: { type: String },
          },

          expiration: {
            title: { type: String, default: "Термін придатності" },
            value: { type: String },
          },
          atc: {
            title: { type: String, default: "Код АТС/ATX" },
            value: { type: String },
          },
          storage_temperature: {
            title: { type: String, default: "Температура зберігання" },
            value: { type: String },
          },

          package: {
            title: { type: String, default: "Упаковка" },
            value: { type: String },
          },
        },
      },
      warnings: {
        id: { type: ObjectId, default: ObjectId() },
        title: { type: String, default: "Кому можна" },
        items: {
          allergy_warning: {
            title: { type: String, default: "Алергікам" },
            value: { type: String },
          },
          diabetes_warning: {
            title: { type: String, default: "Діабетикам" },
            value: { type: String },
          },
          driving_warning: {
            title: { type: String, default: "Водіям" },
            value: { type: String },
          },
          pregnancy_warning: {
            title: { type: String, default: "Вагітним" },
            value: { type: String },
          },
          breastfeeding_warning: {
            title: { type: String, default: "Матерям, що годують" },
            value: { type: String },
          },
          alcohol_warning: {
            title: { type: String, default: "Взаємодія з алкоголем" },
            value: { type: String },
          },
        },
      },
    },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const propertyModel = mongoose.model("Properties", propertiesSchema);

module.exports = propertyModel;
