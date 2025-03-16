import I from "./CPU/Instructions.mjs"
import R from "./CPU/Registers.mjs"

const program = [
    I.MOV_LIT_REG,
    0x00,0x01,
    R.R1,
    I.BUS_SELECT,
    0x00,0x00,
    I.BUS_WITE_LIT,
    0x05,0x00,
    0x00,0x01,
    I.BUS_READ_REG,
    R.R2,
    0x00,0x02,
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