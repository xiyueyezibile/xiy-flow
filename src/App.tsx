import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodes';
import FlowOverlays from './components/FlowOverlays';
import { useFlowStore } from './stores/flowStore';


export default function App() {
  const nodes = useFlowStore(state => state.nodes);
  const edges = useFlowStore(state => state.edges);
  const setNodes = useFlowStore(state => state.setNodes);
  const setEdges = useFlowStore(state => state.setEdges);

  const onConnect = (params) => {
    setEdges(edges => addEdge(params, edges));
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls/>
        <MiniMap zoomable/>
        <Background variant={BackgroundVariant.Lines}/>
      </ReactFlow>
      <FlowOverlays />
    </div>
  );
}
