import React, { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { Note, useInputStore } from "../../../store/input";
import BlockMesh from "./BlockMesh";
import { BlockSpawn, DESTROY_TIME } from "../../../constants/block";
import * as Tone from "tone";
import { createDateHash } from "../../../utils/hash";

type Props = {};

const Blocks = (props: Props) => {
  const [spawnPool, setSpawnPool] = useState<BlockSpawn[]>([]);
  const { input } = useInputStore();
  const now = Tone.now();

  // console.log("spawnPool", spawnPool);

  const addBlock = (newBlock: BlockSpawn) => {
    setSpawnPool((prevSpawns) => [...prevSpawns, newBlock]);
  };
  const throttledAddBlock = throttle(
    (key: Note) =>
      addBlock({
        note: key,
        time: Tone.now(),
        hash: createDateHash(),
      }),
    1000
  );

  useEffect(() => {
    // Find out what input changed
    const inputKeys = Object.keys(input) as Note[];
    const pressedKeys = inputKeys.filter((key) => input[key]);

    // Launch blocks for each key pressed
    pressedKeys.forEach((key) => throttledAddBlock(key));
  }, [input]);

  useEffect(() => {
    const removeBlocks = () => {
      const now = Tone.now();
      setSpawnPool((prevSpawns) => {
        if (prevSpawns.length <= 0) return prevSpawns;
        const safePool = prevSpawns.filter((spawn) => {
          return now - spawn.time < DESTROY_TIME / 1000;
        });

        return safePool;
      });
    };

    const interval = setInterval(removeBlocks, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {spawnPool.map((spawn) => (
        <BlockMesh
          key={`${spawn.note}-${spawn.time}-${spawn.hash}`}
          {...spawn}
          now={now}
        />
      ))}
    </>
  );
};

export default Blocks;
