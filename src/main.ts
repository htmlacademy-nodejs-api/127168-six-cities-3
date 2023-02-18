import Application from './app/application.js';
import { applicationContainer } from './app/application.container.js';
import { Component } from './types/component.types.js';
import { Container } from 'inversify';
import { userContainer } from './modules/user/user.container.js';
import { rentOfferContainer } from './modules/rent-offer/rent-offer.container.js';
import { commentContainer } from './modules/comment/comment.container.js';
import { favoriteOfferContainer } from './modules/favorite-offer/favorite-offer.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  rentOfferContainer,
  commentContainer,
  favoriteOfferContainer
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
