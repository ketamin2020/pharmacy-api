const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const instructionsSchema = new Schema(
  {
    morion: { type: Number, required: true, unique: true },
    external_code: { type: String, required: false },
    name: { type: String, required: true },
    section: {
      composition: {
        title: { type: String, default: "Склад" },
        html: { type: String },
      },
      medicinal_form: {
        title: { type: String, default: "Лікарська форма" },

        html: { type: String },
      },
      medicinal_group: {
        title: { type: String, default: "Фармакотерапевтична група" },
        html: "",
      },
      pharmacodynamics: {
        title: { type: String, default: "Фармакодинаміка" },
        html: { type: String },
      },
      pharmacokinetics: {
        title: { type: String, default: "Фармакокінетика" },
        html: { type: String },
      },
      indications_for_use: {
        title: { type: String, default: "Показання" },
        html: { type: String },
      },
      contraindication: {
        title: { type: String, default: "Протипоказання" },
        html: { type: String },
      },
      interaction_with_other: {
        title: {
          type: String,
          default:
            "Взаємодія з іншими лікарськими засобами та інші види взаємодій",
        },
        html: { type: String },
      },
      features_of_application: {
        title: { type: String, default: "Особливості застосування" },
        html: { type: String },
      },
      ability_to_influence: {
        title: {
          type: String,
          default:
            "Здатність впливати на швидкість реакції при керуванні автотранспортом або іншими механізмами",
        },
        html: { type: String },
      },
      use_during_pregnancy: {
        title: {
          type: String,
          default: "Застосування у період вагітності або годування груддю",
        },
        html: { type: String },
      },

      application_and_dosage: {
        title: { type: String, default: "Спосіб застосування та дози" },
        html: { type: String },
      },
      children: {
        title: { type: String, default: "Діти" },
        html: { type: String },
      },
      overdose: {
        title: { type: String, default: "Передозування" },
        html: { type: String },
      },

      adverse_reactions: {
        title: { type: String, default: "Побічні реакції" },
        html: { type: String },
      },
      expiration_date: {
        title: { type: String, default: "Термін придатності" },
        html: { type: String },
      },
      storage_conditions: {
        title: { type: String, default: "Умови зберігання" },
        html: { type: String },
      },
      packaging: {
        title: { type: String, default: "Упаковка" },
        html: { type: String },
      },

      leave_category: {
        title: { type: String, default: "Категорія відпуску" },
        html: { type: String },
      },
      producer: {
        title: { type: String, default: "Виробник" },
        html: { type: String },
      },
      location: {
        title: {
          type: String,
          default:
            "Місцезнаходження виробника та його адреса місця провадження діяльності",
        },
        html: { type: String },
      },

      source_of_instructions: {
        title: { type: String, default: "Джерело інструкції" },
        html: { type: String },
      },
    },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const instructionModel = mongoose.model("Instructions", instructionsSchema);

module.exports = instructionModel;
