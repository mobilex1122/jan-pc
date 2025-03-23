import I from "./CPU/Instructions.mjs"
import R from "./CPU/Registers.mjs"

const program = [
    I.BUS_SELECT,
    0x00,0x01,
    I.MOV_LIT_REG,
    0x00,0x1D,
    R.R2,

    I.ADD_REG_LIT,
    R.R2,
    0x00,0x01,
    I.MOV_MEMPNT_REG,
    R.ACC,
    R.R1,
    I.BUS_WITE_REG,
    R.R1, // Read Register 1
    0x00,0x00, // Address 0
    I.MOV_REG_REG,
    R.ACC,
    R.R2,
    I.MOV_REG_REG,
    R.R1,
    R.ACC,
    I.JMP_NEQ_LIT,
    0x00,0x03,
    0x00,0x07,
    I.HLT,
    /*
      H    e    l    l    o         W    o    r    l    d   EOT
    */
    0x48,0x65,0x6C,0x6C,0x6F,0x20,0x57,0x6F,0x72,0x6C,0x64,0x03
]


/**
 * Compiles Array
 * @param {Uint8Array} mem Memory to compile to
 */
export function compileProgram(mem) {
    program.forEach((value,index) => {
        mem[index] = value;
    })
}