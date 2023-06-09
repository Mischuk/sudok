import { Request, Response, Router } from "express";
import { STATUS } from "../enums/status";
import { v1 as uuidv1 } from "uuid";
import { getRandomInt } from "../utils";

const router = Router();

const CHAR_CODES = [
  128048, 129418, 129409, 128055, 128053, 128020, 128023, 129412, 129408, 128008, 128063,
];

function getRandomChar(arr: number[]) {
  const index = getRandomInt(0, arr.length - 1);
  return arr[index];
}

router.get("/", async (_: Request, res: Response) => {
  try {
    const id = uuidv1();
    const charCode = getRandomChar(CHAR_CODES);

    res.status(STATUS.SUCCESSFUL).json({ id, charCode });
  } catch (e) {
    res.json({ charCode: CHAR_CODES[0] });
  }
});

export default router;
