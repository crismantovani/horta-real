export const Records = [
  { id: "001", item_id: "002", sensors: ["001", "004"] },
  { id: "002", item_id: "020", sensors: ["001", "004"] },
  { id: "003", item_id: "018", sensors: ["001", "004"] },
  { id: "004", item_id: "029", sensors: ["001", "004"] },
  { id: "005", item_id: "030", sensors: ["001", "004"] },
  { id: "006", item_id: "031", sensors: ["001", "004"] },
  { id: "007", item_id: "028", sensors: ["001", "004"] },
];

export const InitRecords = () => {
  if (!GetRecordsFromSession())
    localStorage.setItem("records", JSON.stringify(Records));
};

export const GetRecordsFromSession = () => {
  return JSON.parse(localStorage.getItem("records"));
};

const HasRecordOnSession = (itemId, currentRecords) => {
  return !currentRecords.filter((record) => {
    return record.item_id === itemId;
  }).length;
};

const GetNextId = (currentRecords) => {
  let maxId = currentRecords.length + 1;
  return "00" + maxId;
};

export const AddRecordsToSession = (record) => {
  let current_records = GetRecordsFromSession();

  if (HasRecordOnSession(record.item_id, current_records)) {
    const { item_id, sensors } = record;
    current_records.push({ id: GetNextId(current_records), item_id, sensors });
    localStorage.setItem("records", JSON.stringify(current_records));
  }
};

export const RemoveAllRecordsFromSession = () => {
  localStorage.remove("records");
};
