export interface Serie{
  _id:number,
  title:string,
  studio: string,
  description:string,
  coverImage:{path:string,contentType:string},
  releaseDate: Date,
  genre: string,
  number_Of_episodes:number,
  saisons: any,
  createdAt:Date,
  updatedAt:Date,
}
