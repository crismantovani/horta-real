import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Info.css";
import Groups from "../../model/Groups";
import Sensors from "../../model/Sensors";
import arrowDown from "../../assets/icons/arrow-down.svg";
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
  const [more, setMore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

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
    setLoading(true);
    return await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Qual a temperatura ideal para o cultivo de ${itemName}? E qual é a estação do ano mais propícia para o cultivo?`,
      temperature: 1,
      max_tokens: 595,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  };

  const getMoreInfoFromGPT = async (itemName) => {
    if (!more.length && !loadingMore) {
      setLoadingMore(true);
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Conte dicas para o cultivo de ${itemName}`,
        temperature: 1,
        max_tokens: 595,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setMore(result.data.choices);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const { groupFiltered, itemFiltered } = getGroupAndItem();

    setGroup(groupFiltered);
    setItem(itemFiltered);
    setSensors(getSensorsData());
    getDataFromGPT(itemFiltered.name).then((res) => {
      setChoices(res.data.choices);
      setLoading(false);
    });
  }, [groupId, itemId]);

  return (
    <>
      {!loading && (
        <section className="info">
          <Container containerFluid="true">
            <div className="info__header">
              <p>
                <span className="info__header__title">{item.name}</span>
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
            {Array.isArray(choices) && (
              <div className="info__content">
                {choices.length > 0 &&
                  choices.map((choice) => <p>{choice.text}</p>)}
              </div>
            )}
          </Container>
        </section>
      )}

      {!loading && (
        <section className="info">
          <Container containerFluid="true">
            <div
              className={`info__header pointer ${
                !more.length && !loadingMore ? "no-content" : ""
              }`}
              onClick={() => getMoreInfoFromGPT(item.name)}
            >
              <p className="info__header__title">
                <span>Saiba mais</span>
              </p>
              <p>
                <img src={arrowDown} />
              </p>
            </div>

            {!!more.length && !loadingMore && (
              <div className="info__content">
                {more.length > 0 && more.map((choice) => <p>{choice.text}</p>)}
              </div>
            )}

            {loadingMore && (
              <div className="info__content">
                <div
                  className="loader flip-horizontal-bottom"
                  style={{ width: "20px", height: "20px", padding: "10px" }}
                ></div>
              </div>
            )}
          </Container>
        </section>
      )}

      {loading && (
        <div className="backdrop">
          <div className="loader flip-horizontal-bottom"></div>
        </div>
      )}
    </>
  );
};

export default Info;
