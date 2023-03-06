const httpStatus = require("http-status");
const instructionsModel = require("./instructions.model");

const getInstructions = async (req, res, next) => {
  const allInstrucrion = await instructionsModel.find({});
  const instructionList = allInstrucrion.reduce((list, instruction) => {
    list.push({
      id: instruction._id,
      name: instruction.name,
      section: instruction.section,
      morion: instruction.morion,
      external_code: instruction.external_code,
    });
    return list;
  }, []);
  return res.status(200).send({ data: instructionList });
};
const postInstruction = async (req, res, next) => {
  const instruction = new instructionsModel(req.body);
  await instruction.save();
  return res.status(200).send({ data: httpStatus[200] });
};
const putInstruction = async (req, res, next) => {
  const { id } = req.body;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });

  await instructionsModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  return res
    .status(200)
    .send({ message: "Instruction was updated successfuly!" });
};
const deleteInstruction = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await instructionsModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Substances was deleted successfuly!" });
};

module.exports = {
  getInstructions,
  postInstruction,
  putInstruction,
  deleteInstruction,
};
