export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  RentOfferServiceInterface: Symbol.for('RentOfferServiceInterface'),
  RentOfferModel: Symbol.for('RentOfferModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
