# gitlab-deployment-status

## Project setup
```
cp .env .env.local
```

Edit `.env.local` to add the URL to your GitLab and your Private Token

```
npm install
```

## Running the project

You can run the project in two modes: development or production.

### Development

In development mode, the calls to the GitLab APIs are mocked and therefore you don't need to set the env variables
in `.env.local`.

#### Compiles and hot-reloads for development
```
npm run dev
```

During development you may also want to lint your files before committing with `npm run lint`.

### Production

In production mode, the GitLab APIs are called and therefore it's imperative that the env variables is `.env.local` are
set and correct.

#### Compiles, minifies and run for production
```
npm run build && npm run preview
```
