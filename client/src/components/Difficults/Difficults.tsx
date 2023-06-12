import { DifficultSelector, Root } from "./Difficults.styles";
import { socket } from "../../api/instances";
import { Diff, EVENTS } from "utils";
import { FC } from "react";

interface Props {}

export const Difficults: FC<Props> = () => {
  const onSelect = (diff: Diff) => socket.emit(EVENTS.DIFF.CLIENT, { diff });

  return (
    <Root>
      <DifficultSelector
        style={{ marginBottom: 15, marginTop: "auto" }}
        onClick={() => onSelect(Diff.Easy)}
      >
        {Diff.Easy}
      </DifficultSelector>
      <DifficultSelector
        style={{ marginBottom: 15, marginTop: "auto" }}
        onClick={() => onSelect(Diff.Normal)}
      >
        {Diff.Normal}
      </DifficultSelector>
      <DifficultSelector
        style={{ marginTop: 15, marginBottom: "auto" }}
        onClick={() => onSelect(Diff.Hard)}
      >
        {Diff.Hard}
      </DifficultSelector>
      <DifficultSelector
        onClick={() => onSelect(Diff.Ultra)}
        style={{ marginTop: 15, marginBottom: "auto" }}
      >
        {Diff.Ultra}
      </DifficultSelector>
    </Root>
  );
};
