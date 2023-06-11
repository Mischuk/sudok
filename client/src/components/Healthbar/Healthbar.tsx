import { FC } from "react";
import { Icon, Root } from "./Healthbar.styles";

interface Props {
  HP: number;
}

export const Healthbar: FC<Props> = ({ HP }) => {
  return (
    <Root>
      {HP === 3 && (
        <>
          <Icon>❤️</Icon>
          <Icon>❤️</Icon>
          <Icon>❤️</Icon>
        </>
      )}
      {HP === 2 && (
        <>
          <Icon>❤️</Icon>
          <Icon>❤️</Icon>
          <Icon>🖤</Icon>
        </>
      )}
      {HP === 1 && (
        <>
          <Icon>❤️</Icon>
          <Icon>🖤</Icon>
          <Icon>🖤</Icon>
        </>
      )}
      {HP === 0 && (
        <>
          <Icon>🖤</Icon>
          <Icon>🖤</Icon>
          <Icon>🖤</Icon>
        </>
      )}
    </Root>
  );
};
