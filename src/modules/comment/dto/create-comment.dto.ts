import { Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateCommentDTO {
  @MinLength(5, {message: 'Minimum text length must be 5'})
  @MaxLength(1024, {message: 'Maximum text length must be 1024'})
  public text!: string;

  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  public userId!: string;

  public offerId!: string;
}
