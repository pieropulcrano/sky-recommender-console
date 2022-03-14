import { rest } from 'msw';
import { db } from './db';

export const handlers = [
  //Login
  rest.post(process.env.REACT_APP_API_LOGIN_URL, (req, res, ctx) => {
    try {
      const user = db.user.findFirst({
        where: {
          user_name: {
            equals: req.body.user_name,
          },
        },
      });

      if (user) {
        return res(ctx.json({ status: '0', message: '' }));
      } else {
        return res(ctx.json({ status: '999', message: 'Not authorized' }));
      }
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
  //Get reccomendations for scheduler
  rest.get(process.env.REACT_APP_API_RECOMMENDATIONS_URL, (req, res, ctx) => {
    try {
      const allReccomendations = db.reccomendation.getAll();

      return res(
        ctx.json({ status: '0', message: '', items: allReccomendations }),
      );
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
  //Get reccomendation by ID
  rest.get(
    process.env.REACT_APP_API_RECOMMENDATION_URL + '/:id',
    (req, res, ctx) => {
      try {
        const { id } = req.params;
        const reccomendation = db.reccomendation.findFirst({
          where: {
            id: {
              equals: id,
            },
          },
        });
        return res(
          ctx.json({ status: '0', message: '', items: [reccomendation] }),
        );
      } catch (error) {
        return res(ctx.status(400));
      }
    },
  ),
  //Get reccomendation by Date and Cluster
  rest.get(process.env.REACT_APP_API_RECOMMENDATION_URL, (req, res, ctx) => {
    try {
      const cluster = req.url.searchParams.get('cluster');
      const reccomendation = db.reccomendation.findFirst({
        where: {
          cluster: {
            equals: cluster,
          },
          type: {
            equals: 'VOD',
          },
        },
      });
      let rec = reccomendation ? reccomendation : {};
      return res(ctx.json({ status: '0', message: '', item: rec }));
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
  //Create reccomendation
  rest.post(process.env.REACT_APP_API_RECOMMENDATION_URL, (req, res, ctx) => {
    try {
      var body = req.body;
      body.id = Math.floor(Math.random() * 1000) + '';
      db.reccomendation.create(body);
      return res(ctx.json({ status: '0', message: '', createdItem: [body] }));
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
  //Update reccomendation
  rest.put(
    process.env.REACT_APP_API_RECOMMENDATION_URL + '/:id',
    (req, res, ctx) => {
      try {
        const body = req.body;
        const { id } = req.params;
        const updatedReccomendation = db.reccomendation.update({
          where: {
            id: {
              equals: id,
            },
          },
          data: body,
        });
        return res(
          ctx.json({
            status: '0',
            message: '',
            createdItem: [updatedReccomendation],
          }),
        );
      } catch (error) {
        return res(ctx.status(400));
      }
    },
  ),
  //Delete reccomendation
  rest.delete(
    process.env.REACT_APP_API_RECOMMENDATION_URL + '/:id',
    (req, res, ctx) => {
      try {
        const body = req.body;
        const { id } = req.params;
        db.reccomendation.delete({
          where: {
            id: {
              equals: id,
            },
          },
          data: body,
        });
        return res(ctx.json({ status: '0', message: '' }));
      } catch (error) {
        return res(ctx.status(400));
      }
    },
  ),
  //Get events
  rest.get(process.env.REACT_APP_API_EVENT_URL, (req, res, ctx) => {
    try {
      const type = req.url.searchParams.get('type');
      const title = req.url.searchParams.get('title');
      let events;
      if (type === 'VOD') {
        events = db.eventVod.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        });
      } else if (type === 'LIN') {
        events = db.eventLin.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        });
      } else {
        throw new Error();
      }

      return res(ctx.json({ status: '0', message: '', items: events }));
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
  //Get Fallback
  rest.get(
    process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL,
    (req, res, ctx) => {
      try {
        const fallback = db.fallback.getAll();
        return res(ctx.json({ status: '0', message: '', items: fallback }));
      } catch (error) {
        return res(ctx.status(400));
      }
    },
  ),
  //Update Fallback
  rest.put(
    process.env.REACT_APP_API_FALLBACK_RECOMMENDATION_URL,
    (req, res, ctx) => {
      try {
        const body = req.body;
        const updatedFallback = db.fallback.update({
          where: {
            id: {
              equals: 'FALLBACK#1970-10-01T00:00:00Z#2099-12-31T23:59:59Z',
            },
          },
          data: body,
        });
        return res(
          ctx.json({
            status: '0',
            message: '',
            createdItem: [updatedFallback],
          }),
        );
      } catch (error) {
        return res(ctx.status(400));
      }
    },
  ),
];
