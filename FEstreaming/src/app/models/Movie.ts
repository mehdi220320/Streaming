export interface Movie{
  _id:number,
  title:string,
  studio: string,
  description:string,
  coverImage:{path:string,contentType:string},
  releaseDate: Date,
  genre: string,
  duration: Date,
  createdAt:Date,
  updatedAt:Date,
}
