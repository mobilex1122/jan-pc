import Instructions from "../../CPU/Instructions.mjs"
import { VarTypes } from "../Types.mjs"

export default (types) => {
    switch(types) {
        case VarTypes.NUM: return Instructions.BUS_SELECT
        default: return false
    }
}