import { factory, primaryKey } from '@mswjs/data';
import { setDay, generateFutureDate, generatePastDate } from './utils';
import reccomendations from './data/recommendations';
import linearEvents from './data/linear-events';
import vodEvents from './data/vod-events';
import fallback from './data/fallback-recommendation';

export const db = factory({
  // Create a "user" model,
  user: {
    // ...with these properties and value getters.
    id: primaryKey(() => '1'),
    user_name: () => 'test',
    password: () => 'test',
  },
  //create a reccomendation model
  reccomendation: {
    id: primaryKey(String),
    cluster: String,
    type: String,
    validFrom: String,
    validTo: String,
    recommendation: Array,
  },
  //create a Event Linear model
  eventLin: {
    id: primaryKey(String),
    type: String,
    title: String,
    startProgram: String,
    endProgram: String,
    channel: String,
    channelName: String,
    linearSummaryLong: String,
    warningMessage: String,
  },
  //create a Event VOD model
  eventVod: {
    id: primaryKey(String),
    type: String,
    title: String,
    startProgram: String,
    endProgram: String,
    branding: String,
    vodSummaryLong: String,
    thumbnailType: String,
    warningMessage: String,
  },
  //create a Fallback model
  fallback: {
    id: primaryKey(String),
    type: String,
    validFrom: String,
    validTo: String,
    recommendation: Array,
  },
});

db.user.create();
//LIN PRESENT;
//dal 1 del mese corrente
reccomendations[0].validFrom = setDay(1);
//termina domani
reccomendations[0].validTo = generateFutureDate(1);
//LIN FUTURE;
reccomendations[1].validFrom = generateFutureDate(1);
reccomendations[1].validTo = generateFutureDate(2);
//Primo Vod
//nel passato
reccomendations[2].validFrom = generatePastDate(1, 'day');
//Secondo Vod
//nel Futuro
reccomendations[3].validFrom = generateFutureDate(1);
//create reccomendations
for (var i = 0; i < reccomendations.length; i++) {
  db.reccomendation.create(reccomendations[i]);
}
//create linear events
for (var j = 0; j < linearEvents.length; j++) {
  db.eventLin.create(linearEvents[j]);
}
//create vod events
for (var y = 0; y < vodEvents.length; y++) {
  db.eventVod.create(vodEvents[y]);
}
//create fallback
db.fallback.create(fallback);
