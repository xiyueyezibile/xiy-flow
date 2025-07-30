import { Handle, Position } from "@xyflow/react"

interface NodePorps {
  data: {
    label: string
  }
}
export function TimeLineNode({ data }: NodePorps) {
  return <div style={{background: 'red', width: '100px', height: '100px', textAlign: 'center'}}>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Bottom} />


    <div>{data.label}</div>
  </div>
}