import I from "./Instructions.mjs";
import R , {REGCOUNT} from "./Registers.mjs";

/**
 * @typedef {import("../Memory/Memory.mjs")} Memory
 * @typedef {import("../Bus/Bus.mjs")} Bus
 */

/**
 * @class CPU
 * 
 * Main CPU
 */
export default class {

    /**
     * @param {DataView} memory Memory used by the CPU
     * @param {Bus} bus Device BUS
     */

    /** @type {Bus} */
    bus;

    constructor(memory, bus, debug = false) {
        const regBuf = new ArrayBuffer(REGCOUNT * 2);
        this.registers = new DataView(regBuf);
        this.memory = memory;
        
        this.bus = bus;

        this.debug = debug;
        if (debug) {
            this.stepCount = 0;
            console.warn("Debug ON! Expect Slower CPU Steps!")
        }

        this.setRegister(R.IP,0);
    }

    inspect(address) {
        if (address == null) {
            address = this.registers.getUint16(R.IP);
        }
        const viewSize = 5 * 2;
        var out = "";
        for (var i = address - viewSize; i <= address + viewSize; i+= 1) {
            if (i == address) {
                out += " <span class='c-addr'>" + this.memory.getUint8(i).toString(16).padStart(2,"0") + "</span>";
            } else if (i >= 0 && i < this.memory.byteLength - 1 ) {
                out += " " + this.memory.getUint8(i).toString(16).padStart(2,"0");
            } else {
                out += " --";
            }
        }
        return out;
    }

    log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }

    slog(system,msg) {
        if (this.debug) {
            console.log(system + ": "+ msg);
        }
    }

    svalue8(val) {
        return val.toString(16).padStart(2, "0");
    }

    fetch() {
        const ip = this.getRegister(R.IP);
        const value = this.memory.getUint8(ip);
        this.setRegister(R.IP, ip + 1);
        this.slog("Fetch", this.svalue8(value));
        return value;
    }

    fetch16() {
        const ip = this.registers.getUint16(R.IP);
        const value = this.memory.getUint16(ip);
        this.registers.setUint16(R.IP, ip + 2);
        this.slog("Fetch16",this.svalue8(value));
        return value;
    }

    step() {
        if (this.debug) {
            console.group("Cpu Step " + this.stepCount + " (IP: " + this.getRegister(R.IP) + " )");
            this.stepCount++;
            const returnState = this.exec(this.fetch());
            console.groupEnd();
            return returnState;
        }
        return this.exec(this.fetch());
        
    }

    setRegister(address,value) {
        this.registers.setUint16(address * 2,value);
    }

    setMem(address,value) {
        this.memory.setUint16(address,value);
    }

    getMem(address) {
        this.memory.getUint16(address);
    }

    getRegister(address) {
        return this.registers.getUint16(address * 2);
    }

    exec(instruction) {
        this.slog("Exec", this.svalue8(instruction));

        switch(instruction) {
            case I.MOV_LIT_REG: {
                this.log("Move LIT REG");
                const lit = this.fetch16();
                const reg = this.fetch();
                this.setRegister(reg,lit);
                return;
            }
            case I.MOV_MEM_REG: {
                this.log("Move MEM REG");
                const memAdr = this.fetch16();
                const value = this.getMem(memAdr);
                const reg = this.fetch();
                this.setRegister(reg,value);
                return;
            }
            case I.MOV_REG_MEM: {
                this.log("Move REG MEM");
                const lit = this.fetch16();
                const reg = this.fetch();
                this.setRegister(reg,lit);
                return;
            }
            case I.BUS_SELECT: {
                this.log("BUS Select");
                const lit = this.fetch16();
                this.setRegister(R.BUS,lit);
                this.bus.selectDevice(lit);
                return;
            }
            case I.BUS_READ_REG: {
                this.log("Bus to REG");
                const reg = this.fetch();
                const lit = this.fetch16();
                const value = this.bus.read(lit)
                this.setRegister(reg,value);
                console.log("Move")
                return;
            }
            case I.BUS_WITE_LIT: {
                this.log("Bus Write");
                const val = this.fetch16();
                const lit = this.fetch16();
                this.bus.write(lit,val);
                return;
            }
            case I.HLR: {
                this.log("HALT");
                return true;
            }
        }
    }


    run() {
        if (this.step() != true) {
            requestAnimationFrame(() => {
                this.run();
            })
        } else {
            alert("System Halt!");
        }
    }
}