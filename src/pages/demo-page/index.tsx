import { StyledDemoPageContainer } from '@src/pages/demo-page/styled/root.styles.ts';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks.ts';
import {
  createToken,
  selectIsSandbox,
  selectToken,
  selectTokenIsFetching,
} from '@src/redux/token-configuration';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@src/routes/routes.enum.ts';
import {
  selectCustomizationConfig,
  setPaymentListMode,
  setShowFirstCommunication,
  setShowPaymentFormCommunication,
} from '@src/redux/customization-config';
import { getPayStationUrlFunction } from '@src/shared/get-pay-station-url.function.ts';

export const DemoPage: FC = () => {
  const token = useAppSelector(selectToken);
  const tokenIsFetching = useAppSelector(selectTokenIsFetching);
  const { isPaymentMethodsListMode, showFirstScreenCommunication, showPaymentFormCommunication } =
    useAppSelector(selectCustomizationConfig);
  const isSandbox = useAppSelector(selectIsSandbox);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const url = getPayStationUrlFunction(!!isSandbox);

  useEffect(() => {
    if (!token) {
      navigate(`/${Routes.startPage}`);
    }
  }, [token, navigate]);

  const setFirstScreenCommunicationHandler = useCallback(() => {
    dispatch(setShowFirstCommunication(!showFirstScreenCommunication));
    dispatch(setShowPaymentFormCommunication(false));

    dispatch(createToken({}));
  }, [dispatch, showFirstScreenCommunication]);

  const setupListModeHandler = useCallback(() => {
    dispatch(setPaymentListMode(!isPaymentMethodsListMode));
    dispatch(createToken({}));
  }, [dispatch, isPaymentMethodsListMode]);

  const setShowPaymentFormCommunicationHandler = useCallback(() => {
    dispatch(setShowPaymentFormCommunication(!showPaymentFormCommunication));
    dispatch(setShowFirstCommunication(false));

    dispatch(createToken({}));
  }, [dispatch, showFirstScreenCommunication]);

  return (
    <StyledDemoPageContainer>
      <button disabled={tokenIsFetching} onClick={setFirstScreenCommunicationHandler}>
        Setup first screen communication
      </button>
      <button disabled={tokenIsFetching} onClick={setShowPaymentFormCommunicationHandler}>
        Setup payment form communication
      </button>
      <button disabled={tokenIsFetching} onClick={setupListModeHandler}>
        Setup list mode
      </button>

      <iframe ref={iframeRef} src={`${url}?token=${token}`}></iframe>
    </StyledDemoPageContainer>
  );
};
