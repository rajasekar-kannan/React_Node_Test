const { Meetings } = require('../../model/schema/meeting');
const { NotFoundError } = require('../../utils/api-error');
const { STATUS, ERRORS, MESSAGE } = require('../../utils/constants');

const add = async (meetingDetail) => {
  meetingDetail.createdDate = new Date();
  const meeting = new Meetings(meetingDetail);
  await meeting.save();
  return { statusCode: STATUS.CREATED, data: meeting };
};

const index = async (query) => {
  query.deleted = false;

  let meetingList = await Meetings.find(query)
    .populate({
      path: 'createBy',
      match: { deleted: false },
      select: 'firstName lastName',
    })
    .select('agenda dateTime timestamp location notes attendes createBy deleted')
    .exec();

  return { data: meetingList };
};

const view = async (id) => {
  let meeting = await Meetings.findOne({ _id: id })
    .populate({
      path: 'createBy',
      match: { deleted: false },
      select: 'firstName lastName',
    })
    .select('agenda dateTime timestamp location notes attendes createBy deleted')
    .exec();

  if (!meeting) throw new NotFoundError(ERRORS.NOT_FOUND);

  return { data: meeting };
};

const deleteData = async (id) => {
  const meeting = await Meetings.findByIdAndUpdate(
    id,
    { deleted: true },
    { new: false } // Returns the document before the update
  );

  if (!meeting) throw new NotFoundError(ERRORS.NOT_FOUND);

  if (meeting.deleted) return { data: { message: MESSAGE.ALREADY_DELETED } };

  return { data: { message: MESSAGE.DELETED_SUCCESS } };
};

const deleteMany = async (ids) => {
  const result = await Meetings.updateMany(
    { _id: { $in: ids }, deleted: false },
    { $set: { deleted: true } }
  );

  if (result.matchedCount === 0) {
    return { data: { message: MESSAGE.NO_ACTIVE_RECORDS } };
  }

  return {
    data: {
      message: `${MESSAGE.DELETED_SUCCESS} Count: ${result.modifiedCount}`,
    },
  };
};

module.exports = { add, index, view, deleteData, deleteMany };
