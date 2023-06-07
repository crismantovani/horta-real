import React from "react";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";

import "./Home.css";
import Card from "../../components/Card/Card";

import Groups from "../../model/Groups";
import { GetRecordsFromSession, InitRecords } from "../../model/Data";

const filterGroupsByRecords = (records) => {
  const itemIds = records.map((record) => record.item_id);

  return Groups.map((group) => ({
    id: group.id,
    name: group.name,
    items: group.items.filter((item) => itemIds.includes(item.id)),
  })).filter((group) => group.items.length > 0);
};

const Article = ({ item, groupId }) => {
  return (
    <article>
      <Link to={`/informacoes/` + groupId + `/` + item.id}>
        <Card name={item.name}></Card>
      </Link>
    </article>
  );
};

const Section = ({ group }) => {
  return (
    <section className="group">
      <h1>{group.name}</h1>
      <ScrollContainer className="group__items">
        {group.items.map((item) => (
          <Article item={item} groupId={group.id} key={`item-` + item.id} />
        ))}
      </ScrollContainer>
    </section>
  );
};

const Home = () => {
  InitRecords();
  const sessionItems = GetRecordsFromSession();
  const groups = filterGroupsByRecords(sessionItems);

  return (
    <main className="main">
      {groups.map((group) => (
        <Section group={group} key={`group-` + group.id} />
      ))}
    </main>
  );
};

export default Home;
