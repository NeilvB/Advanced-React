import { createSchema, config } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';

import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { ProductImage } from './schemas/ProductImages';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add initial roles
  },
});

export default withAuth({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseUrl,
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
  }),
  ui: {
    isAccessAllowed: ({ session }) => {
      console.log(session);
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email',
  }),
});
