export const Component = {
  RestApp: Symbol.for('RestApp'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  MongoDB: Symbol.for('MongoDB'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
  CategoryService: Symbol.for('CategoryService'),
  CategoryModel: Symbol.for('CategoryModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
} as const;
