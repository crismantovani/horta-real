import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Info.css";
import Groups from "../../model/Groups";
import Sensors from "../../model/Sensors";
import { GetRecordsFromSession } from "../../model/Data";
import Container from "../../components/Container/Container";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

import { Configuration, OpenAIApi } from "openai";

const Info = () => {
  const [group, setGroup] = useState({});
  const [item, setItem] = useState({});
  const [sensors, setSensors] = useState([]);
  const { groupId, itemId } = useParams();
  const [choices, setChoices] = useState([]);

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

  const configuration = new Configuration({
    organization: "org-6MEOC5EmSLxCtsnVrfL2ny1a",
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

  useEffect(() => {
    const { groupFiltered, itemFiltered } = getGroupAndItem();

    setGroup(groupFiltered);
    setItem(itemFiltered);
    setSensors(getSensorsData());
    getDataFromGPT(itemFiltered.name).then(res => {
      console.log(res)
      setChoices(res.data.choices)
    });
  }, [groupId, itemId]);

  console.log(choices,"oi");
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
              Saiba mais
            </p>
          </div>
          <div className="info__content">
            { Array.isArray(choices) && choices.length > 0 && 
                choices.map((choice) => (
              <p>{choice.text}</p>
            ))}
          </div>
        </Container>
      </section>
    </Fragment>
  );
};
export default Info;
