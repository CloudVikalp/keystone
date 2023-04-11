import { config,list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password,text,timestamp,relationship,select, image  } from '@keystone-6/core/fields';
import { withAuth, session } from './auth';
import { document } from '@keystone-6/fields-document';

const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
      password: password({ validation: { isRequired: true } })
    },
  }),
  Post:list({
    access:allowAll,
    fields: {
      title: text(),
      avatar:image({storage:"my_local_images"}),
      publishedAt: timestamp(),
      author: relationship({
        ref: 'User.posts',
        
      }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          {label:"Pending",value:"pending"}
        ],
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
      }),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      }),
    },
  })
   
  };
  
  export default config(
    withAuth({
      db: {
        provider: 'postgresql',
         url: 'postgres://postgres:Vikalp@99@localhost:5432/firstproject',
      },
      lists,
      storage: {
        my_local_images: {
          // Images that use this store will be stored on the local machine
          kind: 'local',
          // This store is used for the image field type
          type: 'image',
          // The URL that is returned in the Keystone GraphQL API
          generateUrl: path => `http://localhost:3000/images${path}`,
          // The route that will be created in Keystone's backend to serve the images
          serverRoute: {
            path: '/images',
          },
          // Set serverRoute to null if you don't want a route to be created in Keystone
          // serverRoute: null
          storagePath: 'public/images',
        },
        /** more storage */
      },
      session,
      ui: {
        isAccessAllowed: (context) => !!context.session?.data,
      },
    })
  );
