import { tokenApiClient } from '../client';

export const getToken = async (parameters: {
  sandbox?: boolean;
  locale?: string;
  isPaymentMethodsListMode: boolean;
  showFirstScreenCommunication: boolean;
  showPaymentFormCommunication: boolean;
}): Promise<string> => {
  const {
    sandbox,
    locale,
    isPaymentMethodsListMode,
    showFirstScreenCommunication,
    showPaymentFormCommunication,
  } = parameters;
  const response = await tokenApiClient.get('', {
    params: {
      ...(sandbox ? { sandbox: '1' } : {}),
      locale,
      isPaymentMethodsListMode,
      showFirstScreenCommunication,
      showPaymentFormCommunication,
    },
  });

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }

  return response.data.token;
};
