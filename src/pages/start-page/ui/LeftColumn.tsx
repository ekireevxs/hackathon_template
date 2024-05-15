import Coins from '../../../assets/coin.svg';
import { OpenDemoButton } from './buttons/open-demo';
import { StyledLeftColumn } from '../styled/left-column.styles.ts';

export const LeftColumn = () => (
  <StyledLeftColumn>
    <p className='label'>demo template</p>
    <h1 className='title'>
      <span className='title-text'>Xsolla PayStation Jam</span>
      <span className='title-image'>
        <img src={Coins} alt='coins'></img>
      </span>
    </h1>
    <p className='capture'>Take the challenge and create new solutions at Xsolla hack</p>
    <OpenDemoButton />
  </StyledLeftColumn>
);
