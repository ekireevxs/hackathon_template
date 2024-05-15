import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as https from 'https';
import * as express from 'express';

const app = express();

// for local development use {origin: '*'}, for firebase - {origin: 'https://headless-checkout-app.web.app'}.
// app.use(cors({ origin: "*" }));
app.use(cors({ origin: 'https://livedemo-hackathon.web.app' }));

app.get('/', async (req, res) => {
  const merchantId = 685156;
  const apiKey = '';
  const locale = req.query?.locale ? req.query.locale.toString() : 'en';
  const sandbox = req.query?.sandbox == '1' ? 1 : 0;
  const isPaymentMethodsListMode = req.query?.isPaymentMethodsListMode === 'true';
  const showFirstScreenCommunication = req.query?.showFirstScreenCommunication === 'true';
  const showPaymentFormCommunication = req.query?.showPaymentFormCommunication === 'true';

  const content = getTokenContent(
    locale,
    sandbox,
    isPaymentMethodsListMode,
    showFirstScreenCommunication,
    showPaymentFormCommunication,
  );
  const jsonContent = JSON.stringify(content);

  const encodedAuthData = Buffer.from(`${merchantId}:${apiKey}`, 'utf8').toString('base64');

  try {
    const options = {
      hostname: 'api.xsolla.com',
      port: 443,
      path: `/merchant/merchants/${merchantId}/token`,
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedAuthData}`,
        'Content-Type': 'application/json',
        'Content-Length': jsonContent.length,
        Accept: 'application/json',
      },
    };

    const payload = await requestAsPromise(options, jsonContent);

    return res.json(payload);
  } catch (error: unknown) {
    return res.json({
      error: (error as { message: unknown }).message || error,
    });
  }
});

const requestAsPromise = (options: unknown, data: string) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options as string, (res) => {
      let data = '';

      functions.logger.info(res.statusCode);
      functions.logger.info(res.statusMessage);

      res.on('data', (chunk) => {
        data += chunk.toString();
      });

      res.on('end', () => {
        try {
          const payload = JSON.parse(data);
          resolve(payload);
        } catch (error: unknown) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);

    req.end();
  });
};

// eslint-disable-next-line require-jsdoc
function getUserId(showFirstScreenCommunication: boolean, showPaymentFormCommunication: boolean) {
  if (showFirstScreenCommunication) {
    return 'firstScreenCommunication';
  }

  if (showPaymentFormCommunication) {
    return 'paymentFormPromotion';
  }

  return 'user_demo';
}

// eslint-disable-next-line require-jsdoc
function getTokenContent(
  locale: string,
  isSandbox: number,
  isPaymentMethodsListMode: boolean,
  showFirstScreenCommunication: boolean,
  showPaymentFormCommunication: boolean,
): unknown {
  return {
    user: {
      id: {
        value: getUserId(showFirstScreenCommunication, showPaymentFormCommunication),
      },
      name: {
        value: 'John Smith',
      },
      country: {
        value: 'US',
        allow_modify: true,
      },
      email: {
        value: 'support+1@xsolla.com',
      },
    },
    settings: {
      project_id: 260255,
      currency: 'USD',
      language: locale,
      save_payment_account: false,
      ui: {
        is_payment_methods_list_mode: isPaymentMethodsListMode,
      },
      ...(isSandbox === 1 ? { mode: 'sandbox' } : {}),
    },
    purchase: {
      description: {
        value: 'Superhelmet',
        items: [
          {
            name: 'Superhelmet',
            quantity: 1,
            price: {
              amount: '1',
            },
            image_url:
              'https://cdn3.xsolla.com/img/misc/images/565edcbfa661afade0b6a6ef558ecccf.png',
          },
        ],
      },
      checkout: {
        currency: 'USD',
        amount: 1,
      },
    },
  };
}

exports.generateToken = functions.https.onRequest(app);
