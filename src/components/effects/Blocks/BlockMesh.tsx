import { MeshProps } from "@react-three/fiber";
import { animated, easings, useSpring } from "@react-spring/three";
import { BlockSpawn, DESTROY_TIME } from "../../../constants/block";
import { Octaves } from "../../../store/input";

const BOX_SIZE = 0.2;
const X_POSITIONS: Record<Octaves, number> = {
  1: -3,
  2: -2,
  3: -1,
  4: 0,
  5: 1,
  6: 2,
  7: 3,
};
const COLORS: Record<Octaves, string> = {
  1: "#9400D3",
  2: "#4B0082",
  3: "#0000FF",
  4: "#00FF00",
  5: "#FFFF00",
  6: "#FF7F00",
  7: "#FF0000",
};

type Props = Partial<MeshProps> &
  BlockSpawn & {
    time: number;
    now: number;
  };

const BlockMesh = ({ now, time, note, ...props }: Props) => {
  const octave = note.slice(1) as Octaves;
  const positionX = X_POSITIONS[octave];
  const { position } = useSpring({
    config: { duration: DESTROY_TIME, easing: easings.easeOutCirc },
    // loop: true,
    from: {
      position: [positionX, -2, 0],
    },
    to: [{ position: [positionX, -2, 3] }],
  });
  return (
    // @ts-ignore Strange TS error/possible bug
    <animated.mesh {...props} position={position}>
      <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
      <meshPhysicalMaterial color={COLORS[octave]} />
    </animated.mesh>
  );
};
export default BlockMesh;
