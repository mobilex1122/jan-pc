


export default {
    NOP: 0x00, 
    // BUS Instructions
    BUS_SELECT: 0x01, 
    BUS_READ_REG: 0x02, 
    BUS_READ_MEM: 0x03, 
    BUS_WITE_LIT: 0x04, 
    BUS_WITE_REG: 0x05,
    MOV_LIT_REG: 0x10,
    MOV_REG_REG: 0x11,
    MOV_REG_MEM: 0x12,
    MOV_MEM_REG: 0x13,
    ADD_REG_REG: 0x20,
    ADD_REG_LIT: 0x21,
    HLT: 0xFF
} 