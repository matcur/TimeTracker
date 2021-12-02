export type Task = {
  id: string
  name: string
  projectId: string
  startDate: string
  endDate: string
  createDate: string
  updateDate: string
  spendTime: string
  comments: Partial<TaskComment>[]
}
export type TaskComment = {
  id: number
  taskId: number
  type: 'FilePath' | 'Text'
  content: string
}
export type Project = {
  id: string
  name: string
  createDate: string
  updateDate: string
}
export type NewTask = Omit<Task, 'id' | 'createDate' | 'updateDate' | 'spendTime'>;
export type NewTaskComment = Omit<TaskComment, 'id' | 'taskId'>;
