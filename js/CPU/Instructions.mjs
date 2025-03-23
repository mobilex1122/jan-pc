


export default {
    NOP: 0x00, 
    // BUS Instructions
    BUS_SELECT: 0x01, 
    BUS_READ_REG: 0x02, 
    BUS_READ_MEM: 0x03, 
    BUS_WITE_LIT: 0x04, 
    BUS_WITE_REG: 0x05,
    /* BUS 16bit operations are only reserved for future */
    BUS_READ_REG_16: 0x06, 
    BUS_READ_MEM_16: 0x07, 
    BUS_WITE_LIT_16: 0x08, 
    BUS_WITE_REG_16: 0x09,


    MOV_LIT_REG: 0x10,
    MOV_REG_REG: 0x11,
    MOV_REG_MEM: 0x12,
    MOV_MEM_REG: 0x13,
    MOV_MEMPNT_REG: 0x14,
    /* MATH Operations */
    ADD_REG_REG: 0x20,
    ADD_REG_LIT: 0x21,


    /* Logical Operations */
    JMP_REG: 0x30,
    JMP_LIT: 0x31,
    JMP_NEQ_REG: 0x32,
    JMP_NEQ_LIT: 0x33,
    JMP_GT_REG: 0x34,
    JMP_GT_LIT: 0x35,
    JMP_LT_REG: 0x36,
    JMP_LT_LIT: 0x37,

    HLT: 0xFF
} 