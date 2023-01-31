import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { RatingInterval } from '../../common/rent-offer-generator/rent-offer-generator.const.js';
import { RentOfferEntity } from '../rent-offer/rent-offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public text!: string;

  @prop({
    required: true,
    min: RatingInterval.MinRating,
    max: RatingInterval.MaxRating
  })
  public rating!: number;

  @prop({
    ref: RentOfferEntity,
    required: true
  })
  public offerId!: Ref<RentOfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
