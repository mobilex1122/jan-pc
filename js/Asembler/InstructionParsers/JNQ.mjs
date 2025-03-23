import Instructions from "../../CPU/Instructions.mjs"
import { VarTypes } from "../Types.mjs"

export default (types) => {
    switch(types) {
        case VarTypes.NUM + VarTypes.NUM: return Instructions.JMP_NEQ_LIT
        case VarTypes.LABEL + VarTypes.NUM: return Instructions.JMP_NEQ_LIT
        default: return false
    }
}