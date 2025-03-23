import Instructions from "../../CPU/Instructions.mjs"
import { VarTypes } from "../Types.mjs"

export default (types) => {
    switch(types) {
        case VarTypes.REG + VarTypes.NUM: return Instructions.BUS_WITE_REG
        case VarTypes.NUM + VarTypes.NUM: return Instructions.BUS_WITE_LIT
        default: return false
    }
}