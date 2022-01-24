# smb-front-end

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start


# generate static project
$ yarn generate
```

Default API url is localhost:5000/api
Change by adding an environmental variable when running the nuxt server or by modifying the listing in ./nuxt.config.js:22


```
BASE_API_URL = http://localhost:5000/api
```

** Note: There may be CORS related issues when using the smb-back-end server on localhost. Uncomment the lines in smb-back-end/config/initializers/cors.rb and modify line 10 to:

```
origins: '*'
```


Requires Node.js v12+

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
