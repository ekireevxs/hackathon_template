import { useEffect } from 'react';
import { StyledRootDiv } from './styled/root.styles.ts';
import { Header } from './ui/header';
import { LeftColumn } from './ui/LeftColumn.tsx';
import { RightColumn } from './ui/RightColumn.tsx';
import { StyledBody } from './styled/body.styles.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/redux/hooks.ts';
import { selectTokenGenerated } from '@src/redux/token-configuration';
import { Routes } from '@src/routes/routes.enum.ts';

export function StartPage() {
  const tokenGenerated = useAppSelector(selectTokenGenerated);
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenGenerated) {
      navigate(`/${Routes.demoPage}`);
    }
  }, [tokenGenerated]);

  return (
    <StyledRootDiv>
      <Header />

      <StyledBody>
        <LeftColumn />
        <RightColumn />
      </StyledBody>
    </StyledRootDiv>
  );
}
