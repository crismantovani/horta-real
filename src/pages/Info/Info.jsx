import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Info.css";
import Groups from "../../model/Groups";
import Sensors from "../../model/sensors";
import { GetRecordsFromSession } from "../../model/Data";
import Container from "../../components/Container/Container";

const apiKey = "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";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-8I89LK6INrlnhpgk9FBeLGqc",
  apiKey,
});
const openai = new OpenAIApi(configuration);

const getDataFromGPT = async (itemName) => {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Qual a temperatura ideal para o cultivo de ${itemName}?`,
    temperature: 1,
    max_tokens: 595,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
};

const Info = () => {
  const [group, setGroup] = useState({});
  const [item, setItem] = useState({});
  const [sensors, setSensors] = useState([]);
  const { groupId, itemId } = useParams();
  const { choices, setChoices } = useState([]);

  useEffect(() => {
    function getGroupAndItem() {
      const groupFiltered = Groups.filter((group) => {
        return group.id === groupId;
      })[0];

      const itemFiltered = groupFiltered.items.filter((item) => {
        return item.id === itemId;
      })[0];

      return { groupFiltered, itemFiltered };
    }

    function getSensorsData() {
      const record = GetRecordsFromSession().filter((record) => {
        return record.item_id === itemId;
      })[0];
      const sensorsFiltered = Sensors.filter((sensor) => {
        return record.sensors.includes(sensor.id);
      });

      return sensorsFiltered;
    }

    const { groupFiltered, itemFiltered } = getGroupAndItem();

    setGroup(groupFiltered);
    setItem(itemFiltered);
    setSensors(getSensorsData());
    console.log(getDataFromGPT(itemFiltered.name));
    //setChoices(getDataFromGPT(itemFiltered.name).choices);
  }, [groupId, itemId]);

  return (
    <Fragment>
      <section className="info">
        <Container containerFluid="true">
          <div className="info__header">
            <p>
              <span>{item.name}</span>
              <span>{group.name}</span>
            </p>
            <p>
              {sensors.map((sensor) => (
                <span>
                  {sensor.name}: {sensor.value}
                </span>
              ))}
            </p>
          </div>
          <div className="info__content"></div>
        </Container>
      </section>

      <section className="info">
        <Container containerFluid="true">
          <div className="info__header">
            <p>
              Saiba mais <span>.</span>
            </p>
          </div>
          <div className="info__content">
            {/* {choices.map((choice) => (
              <p>{choice.text}</p>
            ))} */}
          </div>
        </Container>
      </section>
    </Fragment>
  );
};
export default Info;
