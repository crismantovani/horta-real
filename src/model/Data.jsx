export const Records = [
  { id: "001", item_id: "002", sensors: ["001", "004"] },
  { id: "002", item_id: "020", sensors: ["001", "004"] },
  { id: "003", item_id: "018", sensors: ["001", "004"] },
  { id: "004", item_id: "029", sensors: ["001", "004"] },
  { id: "005", item_id: "030", sensors: ["001", "004"] },
  { id: "006", item_id: "031", sensors: ["001", "004"] },
];

export const InitRecords = () => {
  sessionStorage.setItem("records", JSON.stringify(Records));
};

export const GetRecordsFromSession = () => {
  return JSON.parse(sessionStorage.getItem("records"));
};

export const AddRecordsToSession = () => {
  let current_records = GetRecordsFromSession();
  console.log(current_records);
};

export const RemoveAllRecordsFromSession = () => {
  sessionStorage.remove("records");
};
