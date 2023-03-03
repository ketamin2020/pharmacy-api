const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    alias: { type: String, required: true },
    active: { type: Boolean, required: true },
    remoteId: { type: String, required: true },
    brand: {
      alias: { type: String, required: true },
      id: { type: String, required: true },
    },
    bonus: {
      percent: { type: Number, required: false, default: 0 },
      value: { type: Number, required: false, default: 0 },
    },
    marketedName: {
      alias: { type: String, required: true },
      id: { type: String, required: true },
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
    delivery: {
      a24Courier: { type: Boolean, required: false, default: true },
      a24Pharmacies: { type: Boolean, required: false, default: true },
      externalServices: { type: Boolean, required: false, default: true },
      partnerPharmacies: { type: Boolean, required: false, default: true },
    },
    price: {
      currency: { type: String, required: false, default: "UAH" },
      current: { type: Number, required: true, default: 0 },
      date: { type: String, required: false, default: Date.now() },
    },
    restrictions: {
      prescription: { type: Boolean, required: false, default: false },
      thermolabile: { type: Boolean, required: false, default: false },
    },
    returnPolicy: {
      id: { type: String, required: false },
      name: { type: String, required: false },
      text: { type: String, required: false },
      url: { type: String, required: false },
    },
    seller: {
      alias: { type: String, required: false },
      id: { type: String, required: false },
      title: { type: String, required: false },
    },
    status: {
      id: { type: String, required: false },
      name: { type: String, required: false },
      type: { type: String, required: false },
    },
    preview: {
      title: {},
      alt: {},
      src: {},
    },
    instruction: {
      active: {},
      id: {},
      section: {},
    },
    basicAttributes: {
      name: {},
      alias: {},
      attributes: {},
    },
    sku: { type: String, required: false },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const productsModel = mongoose.model("Products", productsSchema);

module.exports = productsModel;

// active
// :
// true

// activeIngredients
// :
// [{…}]
// alias
// :
// "ikhtiolovaya-maz-10-30g-tuba"

// attributeGroups
// :
// [{…}, {…}, {…}]

// attributes
// :
// []

// basicAttributes
// :
// {alias: "basic-attributes", attributes: Array(8), i…}

// bonus
// :
// {percent: 2, value: 1.14}

// brand
// :
// {alias: "viola", id: "50023ef0-b17d-11ea-927d-0242c…}

// breadcrumbs
// :
// []

// classification
// :
// {alias: "1-5-6ls-obshchiy-rezhim", id: "892c7fd3-90…}

// delivery
// :
// {a24Courier: true, a24Pharmacies: true, externalSer…}
// description
// :
// ""

// files
// :
// []
// gtin
// :
// "4820085400313"
// id
// :
// "7d03e00b-bad3-11ea-96c2-0635d0043582"

// images
// :
// []

// images360
// :
// []

// marketedName
// :
// {alias: "ihtiolovaya-maz", id: "67edd604-5f12-11eb-…}
// name
// :
// "Іхтіолова мазь 10%, 30 г - ПрАТ ФФ Віола"

// newInstruction
// :
// {active: true, id: "f8f6bdb8-976e-11eb-9b20-0642120…}

// pharmacies
// :
// []

// preview
// :
// {alt: "Ихтиоловая мазь 10%, 30 г - ПрАТ ФФ Віола", …}

// price
// :
// {currency: "UAH", current: 57, date: "2023-03-03T00…}

// promotions
// :
// [{…}]
// remoteId
// :
// "19171"

// restrictions
// :
// {prescription: false, thermolabile: false}

// returnPolicy
// :
// {id: "unavailable", name: "Не подлежит возврату", t…}

// review
// :
// {comments: 6, id: "7d03e00b-bad3-11ea-96c2-0635d004…}

// seller
// :
// {alias: "badm", id: "448b2b16-b17d-11ea-927d-0242c0…}
// sku
// :
// "112.0125"

// status
// :
// {id: "in-stock", name: "Есть в наличии", type: "ava…}
// url
// :
// "/uk/ikhtiolovaya-maz-10-30g-tuba/"

// variations
// :
// []

// videos
// :
// []
