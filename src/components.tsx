import React from 'react';
import { styled, keyframes, css } from 'goober';
import { reduceOpacity } from './util';

export const Button = styled('div')`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${(props: any) => props.bgcolor || '#000'};
  color: ${(props: any) => props.color || '#fff'};
  ${props => props.secondarycolor ? `
    border-width: 1px;
    border-style: solid;
    border-color: ${reduceOpacity(props.secondaryColor, 0.3) || '#d4d7de'};
  ` : `
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`

/**
 * Backdrop component
 */

const backdropAnimation = keyframes(`
0% {opacity:.5;}
100% {opacity:1;}
`);

const StyledBackdrop = styled('div')`
  background-color: ${(props: any) => (props.isdark === '1' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)')};
  backdrop-filter: blur(5px);
  animation: ${backdropAnimation} 150ms ease-in-out forwards;

  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Backdrop: React.FunctionComponent<{
  isDark: boolean;
  className?: string;
} & React.PropsWithChildren> = ({
  isDark,
  className,
  children,
}) => {
  return (
    <StyledBackdrop
      isdark={isDark ? '1' : '0'}
      className={className}
    >
      {children}
    </StyledBackdrop>
  );
};

/**
 * Dialog modal component
 */

const modalShared = `
flex: 1;
margin-left: 4px;
margin-right: 4px;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const modalAnimation = keyframes(`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`);

const StyledDialog = styled('div')`
  ${modalShared}
  animation: ${modalAnimation} 150ms ease-in-out forwards;

  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${(props: any) => props.bgcolor || 'white'};
  color: ${(props: any) => props.color || '#111827'};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`;

export const DialogModal: React.FunctionComponent<{
  backgroundColor?: string;
  color?: string;
  className?: string;
} & React.PropsWithChildren> = ({
  backgroundColor,
  color,
  className,
  children,
}) => {
  return (
    <StyledDialog
      bgcolor={backgroundColor}
      color={color}
      className={className}
    >
      {children}
    </StyledDialog>
  );
};

const StyledChat = styled('div')`
  ${modalShared}
  animation: ${modalAnimation} 150ms ease-in-out forwards;

  height: 80vh;
  max-width: 600px;
  background-color: ${(props: any) => props.bgcolor || 'white'};
  position: relative;
`;

export const ChatModal: React.FunctionComponent<{
  backgroundColor?: string;
  className?: string;
} & React.PropsWithChildren> = ({
  backgroundColor,
  className,
  children,
}) => {
  return (
    <StyledChat
      bgcolor={backgroundColor}
      className={className}
    >
      {children}
    </StyledChat>
  );
};

export const globalClasses = {
  title: css`
font-size: 1.25rem;
font-weight: 600;
text-align: center;
`,
 description: css`
margin-top: 1rem;
font-size: 1rem;
text-align: center;
opacity: 0.8;
`,
  buttons: css`
margin-top: 1.5rem;
display: flex;
flex-direction: column;
gap: 0.75rem;

@media (min-width: 576px) {
  flex-direction: row;
}
`,
}