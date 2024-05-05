import styled from 'styled-components';

export const StyledDemoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  iframe {
    border-radius: 20px;
    border: none;
    width: 800px;
    height: 800px;
  }
`;
