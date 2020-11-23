export default function getNextIdValue(db, sequenceName){
  const sequenceDocument = db.findAndModify(
    {
      query:{_id: sequenceName },
      update: {$inc:{sequence_value:1}},
      "new":true
    });
  return sequenceDocument.sequence_value;
};