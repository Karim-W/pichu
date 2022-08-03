export interface ISocketMessage{
  command:string;
  data:any
}

export interface IPresenceUpdate{
  addedUsers?:string[]
  removedUsers?:string[]
}

export interface IRosterUpdate{
  roomId:string
  users:string
}

