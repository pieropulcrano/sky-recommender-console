# Console Editoriale SKY

- [FAQ](#faq)
- [Come eseguire il progetto](#come-avviare-il-progetto)
- [Come contribuire](#come-contribuire)
- [Principali librerie utilizzate](#principali-librerie-utilizzate)

## FAQ

### Scopo del progetto

Fornire agli operatori SKY uno strumento che consenta la creazione di gruppi schedulati di raccomandazioni.

### Come funziona?

L'operatore SKY dispone di un'interfaccia web che consente di:

- visualizzare tutte le raccomandazioni all'interno di un un intervallo di giorni -7, +21 a partire dal giorno corrente
  - es: supponendo la data odierna sia 16/02/22, si visualizzeranno nello scheduler tutte le raccomandanzioni nell'intervallo 9/02 - 9/03
- creare raccomandazioni LIN:
  - inserendo il cluster
  - inserendo data di inizio e fine della raccomandazione
  - inserendo almeno un evento lineare (con risoluzione hd o sd);
- creare raccomandazioni VOD:
  - inserendo il cluster
  - inserendo la data di inizio della raccommandazione
  - inserendo 5 eventi vod, che possono essere recuperati dalla precedente raccomandazione lineare utilizzando il taso LOAD.
- editare raccomandazioni lineari:
  - se attualmente in onda, sarà possibile cambiare solo la data di fine;
  - se scedulata in un data futura, sarà possibile editare tutti i campi;
- editare raccomandazioni vod:
  - se schedulata in una data futura, sarà possibile editare tutti i campi;

## Come eseguire il progetto

### Pre-requisiti

- accesso alla VPN Sky tramite richiesta creazione utenza

### Requisiti

node >= v.16.13.0

### Installazione dipendenze progetto

#### backend

```
npm i -g json-server
```

#### frontend

```
yarn
```

### Istruzioni per l'esecuzione della console

#### backend

```
json-server --watch db.json --port 3001 --delay 1000
```

#### frontend

```
npm start
```

### Istruzioni per l'esecuzione dei test

#### unit / integration

```
npm test
```

#### e2e

```
npm start
yarn run cypress open
```

#### coverage

```
yarn test --coverage .
```

## Come contribuire

- clonare il repository
- creare un branch: feature / bugfix / hotfix
- aprire pull request su develop

## Principali librerie utilizzate

- [React](https://it.reactjs.org/)
- [Material UI](https://mui.com/)
- [Swr](https://swr.vercel.app/)
- [Formik](https://formik.org/)
- [FullCalendar](https://fullcalendar.io/)
