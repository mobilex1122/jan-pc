import Instructions from "../../CPU/Instructions.mjs"
import { VarTypes } from "../Types.mjs"

export default (types) => {
    switch(types) {
        case VarTypes.REG + VarTypes.NUM: return Instructions.ADD_REG_LIT
        case VarTypes.REG + VarTypes.REG: return Instructions.ADD_REG_REG
        default: return false
    }
}