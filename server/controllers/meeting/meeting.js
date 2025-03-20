const { Meetings } = require('../../model/schema/meeting');
const { STATUS } = require('../../utils/constants');

const add = async (req, res) => {
  req.body.createdDate = new Date();
  const meeting = new Meetings(req.body);
  await meeting.save();
  return { statusCode: STATUS.CREATED, data: meeting };
};

const index = async (req, res) => {
  try {
    const query = req.query;
    query.deleted = false;

    let allData = await Meetings.find(query)
      .populate({
        path: 'createBy',
        match: { deleted: false },
        select: 'firstName lastName',
      })
      .select('agenda dateTime timestamp location notes attendes createBy')
      .lean()
      .exec();

    res.send(allData);
  } catch (error) {
    res.send(error);
  }
};

const view = async (req, res) => {
  try {
    let meeting = await Meetings.findOne({ _id: req.params.id })
      .populate({
        path: 'createBy',
        match: { deleted: false },
        select: 'firstName lastName',
      })
      .select('agenda dateTime timestamp location notes attendes createBy')
      .lean()
      .exec();

    if (!meeting) return res.status(404).json({ message: 'No data found.' });

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error });
  }
};

const deleteData = async (req, res) => {
  try {
    await Meetings.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });
    res.status(200).json({ message: 'done' });
  } catch (err) {
    res.status(404).json({ message: 'error', err });
  }
};

const deleteMany = async (req, res) => {
  try {
    await Meetings.updateMany(
      { _id: { $in: req.body } },
      { $set: { deleted: true } }
    );
    res.status(200).json({ message: 'done' });
  } catch (err) {
    res.status(404).json({ message: 'error', err });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
