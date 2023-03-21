"use client";
import styles from "../styles/Page.module.css";
import Header from "./Header";
import Cards from "./Cards";
import Form from "./Form";
import { useState } from "react";

const HomePage = () => {
  const [cards, setCards] = useState<any>([
    {
      title: "Test Title",
      description: "This is brief info about this card",
      rank: 4.7,
    },
  ]);

  return (
    <main className={styles.main}>
      <div className="w-full max-w-screen-xl">
        <Header />
        <div className="flex items-start justify-between flex-col md:flex-row">
          <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-2 justify-center mt-6 max-w-full md:max-w-[70%]">
            {cards.map((card: any, i: number) => {
              return (
                <Cards
                  key={i}
                  title={card.title}
                  description={card.description}
                  rank={card.rank}
                />
              );
            })}
          </div>
          <div className="w-full md:max-w-[30%] max-w-full ml-0 md:ml-4 mt-4 px-2 py-1 border border-gray-800 rounded-xl">
            <Form setCards={setCards} cards={cards} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
