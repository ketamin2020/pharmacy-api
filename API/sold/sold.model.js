const mongoose = require("mongoose");

const { Schema } = mongoose;

const soldSchema = new Schema(
  {
    items: [
      {
        qty: {
          type: Number,
          default: 1,
        },
        morion: {
          type: Number,
          required: true,
        },
        property: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
soldSchema.methods.updateItem = function (morion) {
  const items = this.items;
  let foundItem = false;

  for (let i = 0; i < items.length; i++) {
    if (items[i].morion === morion) {
      items[i].qty += 1;
      foundItem = true;
      break;
    }
  }

  if (!foundItem) {
    items.push({ total: "", qty: 1, morion });
  }

  return this.save();
};

//const sold = new Sold();
//sold.updateItem(12345)
//  .then(() => {
//    console.log('Объект обновлен или добавлен успешно');
//  })
//  .catch(error => {
//    console.error('Произошла ошибка при обновлении объекта:', error);
//  });

const soldModel = mongoose.model("Sold", soldSchema);

module.exports = soldModel;
