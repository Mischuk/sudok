import { Bar, Root } from "./ProgressBar.styles";

export const ProgressBar = () => {
  return (
    <Root>
      <Bar style={{ transform: `translateX(50%)` }} />
    </Root>
  );
};
