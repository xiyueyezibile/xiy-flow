import { Handle, Position } from "@xyflow/react"

interface NodePorps {
  data: {
    label: string
  }
}
export function SaveNode({ data }: NodePorps) {
  return <div className="bg-red-500 w-[100px] h-[100px] text-center">
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Bottom} />


    <div>{data.label}</div>
  </div>
}