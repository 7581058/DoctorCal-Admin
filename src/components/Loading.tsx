import styled from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <LoadingWrap />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoadingWrap = styled.span`
  font-size: 10px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  margin-left: 270px;
  text-indent: -9999em;
  animation: mulShdSpin 1.1s infinite ease;
  transform: translateZ(0);
  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow:
        0em -2.6em 0em 0em ${props => props.theme.primary},
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2),
        2.5em 0em 0 0em rgba(37, 64, 135, 0.2),
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.2),
        0em 2.5em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.2),
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.5),
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.7);
    }
    12.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.7),
        1.8em -1.8em 0 0em ${props => props.theme.primary},
        2.5em 0em 0 0em rgba(37, 64, 135, 0.2),
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.2),
        0em 2.5em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.2),
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.5);
    }
    25% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.5),
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.7),
        2.5em 0em 0 0em ${props => props.theme.primary},
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.2),
        0em 2.5em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.2),
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2);
    }
    37.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.2),
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.5),
        2.5em 0em 0 0em rgba(37, 64, 135, 0.7),
        1.75em 1.75em 0 0em ${props => props.theme.primary},
        0em 2.5em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.2),
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2);
    }
    50% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.2),
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2),
        2.5em 0em 0 0em rgba(37, 64, 135, 0.5),
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.7),
        0em 2.5em 0 0em ${props => props.theme.primary},
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.2),
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2);
    }
    62.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.2),
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2),
        2.5em 0em 0 0em rgba(37, 64, 135, 0.2),
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.5),
        0em 2.5em 0 0em rgba(37, 64, 135, 0.7),
        -1.8em 1.8em 0 0em ${props => props.theme.primary},
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2);
    }
    75% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.2),
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2),
        2.5em 0em 0 0em rgba(37, 64, 135, 0.2),
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.2),
        0em 2.5em 0 0em rgba(37, 64, 135, 0.5),
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.7),
        -2.6em 0em 0 0em ${props => props.theme.primary},
        -1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2);
    }
    87.5% {
      box-shadow:
        0em -2.6em 0em 0em rgba(37, 64, 135, 0.2),
        1.8em -1.8em 0 0em rgba(37, 64, 135, 0.2),
        2.5em 0em 0 0em rgba(37, 64, 135, 0.2),
        1.75em 1.75em 0 0em rgba(37, 64, 135, 0.2),
        0em 2.5em 0 0em rgba(37, 64, 135, 0.2),
        -1.8em 1.8em 0 0em rgba(37, 64, 135, 0.5),
        -2.6em 0em 0 0em rgba(37, 64, 135, 0.7),
        -1.8em -1.8em 0 0em ${props => props.theme.primary};
    }
  }
`;
