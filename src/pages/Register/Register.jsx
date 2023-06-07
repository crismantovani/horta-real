import React from "react";
import { useNavigate } from "react-router-dom";

import Select from "../../components/Select/Select";
import Container from "../../components/Container/Container";

import "./Register.css";

import { AddRecordsToSession } from "../../model/Data";
import Groups from "../../model/Groups";
import Sensors from "../../model/Sensors";

const Register = () => {
  const navigate = useNavigate();

  const [groupId, setGroup] = React.useState("");
  const [item, setItem] = React.useState("");
  const [sensor, setSensor] = React.useState("");

  function transformArrayToObject(array) {
    return array.map((item) => {
      return { value: item.id, label: item.name };
    });
  }

  const [items, setItems] = React.useState([]);
  const [sensors, setSensors] = React.useState(transformArrayToObject(Sensors));

  const groups = transformArrayToObject(Groups);

  function getItemsFromGroupId(groupId) {
    return Groups.filter((group) => {
      return group.id === groupId;
    });
  }

  function setGroupAndGetItems(groupId) {
    setGroup(groupId);
    const itemsObject = transformArrayToObject(
      getItemsFromGroupId(groupId)[0].items
    );

    setItems(itemsObject);
  }

  function handleSubmit(event) {
    event.preventDefault();
    AddRecordsToSession({ item_id: item, sensors: [sensor] });
    return navigate("/");
  }

  return (
    <section className="registry">
      <Container>
        <form onSubmit={handleSubmit} className="registry-form">
          <div className="registry-form__group">
            <label htmlFor="groups">Grupo</label>
            <Select
              id="groups"
              key="groups"
              options={groups}
              value={groupId}
              setValue={setGroupAndGetItems}
              required
            ></Select>
          </div>

          <div className="registry-form__group">
            <label htmlFor="items">Item</label>
            <Select
              id="items"
              key="items"
              options={items}
              value={item}
              setValue={setItem}
              required
            ></Select>
          </div>

          <div className="registry-form__group">
            <label htmlFor="sensors">Sensores</label>
            <Select
              id="sensors"
              key="sensors"
              options={sensors}
              value={sensor}
              setValue={setSensor}
              required
            ></Select>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </Container>
    </section>
  );
};
export default Register;
