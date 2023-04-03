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
            value: { type: ObjectId, ref: "Substance" },
          },
          marked_name: {
            title: { type: String, default: "Торгівельна назва" },
            value: { type: ObjectId, ref: "TradeName" },
          },
          manufacturing_country: {
            title: { type: String, default: "Країна виробник" },
            value: { type: String, default: "" },
          },
          groups: {
            main_group: {
              value: { type: ObjectId, ref: "Groups" },
              slug: { type: String, required: true },
            },
            first_lavel_group: {
              value: { type: String, required: true },
              slug: { type: String, required: true },
            },
            second_lavel_group: {
              value: { type: String, required: true },
              slug: { type: String, required: true },
            },
          },
          maker: {
            title: { type: String, default: "Виробник" },
            value: { type: ObjectId, ref: "Makers" },
          },
          imported: {
            title: { type: String, default: "Ні" },
            value: { type: String, default: "" },
          },
          dosage: {
            title: { type: String, default: "Дозування" },
            value: { type: ObjectId, ref: "Dosage" },
          },
          production_form: {
            title: { type: String, default: "Форма" },
            value: { type: ObjectId, ref: "Form" },
          },
          prescription: {
            title: { type: String, default: "Без рецепта" },
            value: { type: String, default: "" },
          },
          morion: {
            title: { type: String, default: "Код Моріон" },
            value: { type: String, default: "" },
          },
          administration_route: {
            title: { type: String, default: "Спосіб введення" },
            value: { type: ObjectId, ref: "AdministrationRoute" },
          },
          quantity: {
            title: { type: String, default: "Кількість в упаковці" },
            value: { type: ObjectId, ref: "Quantity" },
          },

          expiration: {
            title: { type: String, default: "Термін придатності" },
            value: { type: String, default: "" },
          },
          atc: {
            title: { type: String, default: "Код АТС/ATX" },
            value: { type: String, default: "" },
          },
          storage_temperature: {
            title: { type: String, default: "Температура зберігання" },
            value: { type: ObjectId, ref: "Temperature" },
          },

          package: {
            title: { type: String, default: "Упаковка" },
            value: { type: ObjectId, ref: "Package" },
          },
        },
      },
      warnings: {
        id: { type: ObjectId, default: ObjectId() },
        title: { type: String, default: "Кому можна" },
        items: {
          allergy_warning: {
            title: { type: String, default: "Алергікам" },
            value: { type: String, default: "" },
          },
          diabetes_warning: {
            title: { type: String, default: "Діабетикам" },
            value: { type: String, default: "" },
          },
          driving_warning: {
            title: { type: String, default: "Водіям" },
            value: { type: String, default: "" },
          },
          pregnancy_warning: {
            title: { type: String, default: "Вагітним" },
            value: { type: String, default: "" },
          },
          breastfeeding_warning: {
            title: { type: String, default: "Матерям, що годують" },
            value: { type: String, default: "" },
          },
          alcohol_warning: {
            title: { type: String, default: "Взаємодія з алкоголем" },
            value: { type: String, default: "" },
          },
          child_warning: {
            title: { type: String, default: "Дітям" },
            value: { type: String, default: "" },
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
