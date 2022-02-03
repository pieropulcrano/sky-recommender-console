# Requirements

node >= v.16.13.0

# Install project dependencies

## backend

```
npm i -g json-server
```

## frontend

```
yarn
```

# Run Project

## backend

```
json-server --watch db.json --port 3001 --delay 1000
```

## frontend

```
npm start
```

## test

### unit / integration

```
npm test
```

### e2e

```
npm start
yarn run cypress open
```

### coverage

```
yarn test --coverage .
```
