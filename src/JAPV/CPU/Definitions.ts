export enum Instructions {
    NOP = 0x00,
    
    // BUS
    BSI = 0x01,
    NOP = 0x02,
    NOP = 0x03,
    NOP = 0x04,
    NOP = 0x05,

    // MOV
    MOV_LIT_REG = 0x10,
    MOV_REG_REG = 0x11,
    MOV_REG_MEM = 0x12,
    MOV_MEM_REG = 0x13,
    SCK_PUSH_MEM = 0x14,
    SCK_PUSH_LIT = 0x15,
    SCK_POP = 0x16,
    INC_REG = 0x17,
    DEC_REG = 0x18,
    NOP = 0x00,
    NOP = 0x00,
    NOP = 0x00,
    NOP = 0x00,
    NOP = 0x00,
    NOP = 0x00,
}

export enum Registers {
    IP = 0,
    ACC = 2,
    R1 = 4,
    R2 = 6,
    R3 = 8,
    R4 = 12,
    R5 = 14,
    R6 = 16,
    R7 = 18,
    R8 = 20,
    SP = 22,
    FP = 24,
    BUS = 26,
}