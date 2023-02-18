import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { RentOfferEntity } from '../rent-offer/rent-offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface FavoriteOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorite-offers'
  }
})
export class FavoriteOfferEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: RentOfferEntity,
    required: true
  })
  public offerId!: Ref<RentOfferEntity>;
}

export const FavoriteOfferModel = getModelForClass(FavoriteOfferEntity);
