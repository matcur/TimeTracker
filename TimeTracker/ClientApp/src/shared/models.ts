export type Task = {
  id: string
  name: string
  projectId: string
  startDate: string
  endDate: string
  createDate: string
  updateDate: string
  spendTime: string
}
export type TaskComment = {
  id: number
  taskId: number
  Type: 'FilePath' | 'Text'
  content: string
}
export type Project = {
  id: number
  name: string
  createDate: string
  updateDate: string
}
export type NewTask = Omit<Task, 'id' | 'createDate' | 'updateDate' | 'spendTime'>
