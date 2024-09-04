import { UUID } from "crypto";
import { v5 as uuidv5, v4 as uuidv4, NIL as NIL_UUID } from "uuid";

export default function generateUUID(): UUID {
  return uuidv5(uuidv4(), NIL_UUID) as UUID;
}
