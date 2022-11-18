import { techniques } from "../config/techniques";

export const getTechnique = (techniqueId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return techniques.find((x) => x.id === techniqueId)!;
};
