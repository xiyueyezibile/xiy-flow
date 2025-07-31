import { MusicNode } from "./MusicNode";
import { SaveNode } from "./SaveNode";
import { ProgressNode } from "./ProgressNode";
import { TimeLineNode } from "./TimeLineNode";
import { VideoNode } from "./VideoNode";

export const nodeTypes = {
  MusicNode,
  SaveNode,
  ProgressNode,
  TimeLineNode,
  VideoNode,
};

export const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "VideoNode",
    data: { label: "1" },
  },
  {
    id: "2",
    position: { x: 200, y: 300 },
    type: "MusicNode",
    data: { label: "2" },
  },
];

export const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
