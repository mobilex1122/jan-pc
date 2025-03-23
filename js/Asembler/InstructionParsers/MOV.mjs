import Instructions from "../../CPU/Instructions.mjs"
import { VarTypes } from "../Types.mjs"

export default (types) => {
    switch(types) {
        case VarTypes.NUM + VarTypes.REG: return Instructions.MOV_LIT_REG
        case VarTypes.VAR + VarTypes.REG: return Instructions.MOV_LIT_REG
        case VarTypes.REG + VarTypes.REG: return Instructions.MOV_REG_REG
        case VarTypes.MEMPNT + VarTypes.REG: return Instructions.MOV_MEMPNT_REG
        default: return false
    }
}