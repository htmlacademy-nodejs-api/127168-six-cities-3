import { Expose } from 'class-transformer';

export default class CommentResponse {
  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public createdAt!: number;

  //userId - TODO сделать позже
  // @Expose()
  // public userId!: string;
}
