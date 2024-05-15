import { useCallback } from 'react';
import { Loader } from '@src/components/loader';
import { StyledShopButton } from '../../../styled/shop-button.styles.ts';

import { useAppDispatch, useAppSelector } from '@src/redux/hooks.ts';
import { createToken, selectTokenIsFetching } from '@src/redux/token-configuration';

export const OpenDemoButton = () => {
  const isFetching = useAppSelector(selectTokenIsFetching);
  const dispatch = useAppDispatch();

  const handleOpenDemoClick = useCallback(() => {
    if (isFetching) {
      return;
    }

    dispatch(createToken({}));
  }, [isFetching]);

  return (
    <StyledShopButton onClick={handleOpenDemoClick}>
      <span>{isFetching ? <Loader /> : 'See it live'}</span>
    </StyledShopButton>
  );
};
