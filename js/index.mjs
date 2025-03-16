import Bus from "./Bus/Bus.mjs";
import CPU from "./CPU/CPU.mjs";
import DebugDevice from "./Devices/DebugDevice.mjs";
import NoiseDummy from "./Devices/NoiseDummy.mjs";
import { compileProgram } from "./testProgram.mjs";


const bus = new Bus(new NoiseDummy());

bus.addDevice(0,new DebugDevice("INDEX 1"));


const memBuf = new ArrayBuffer(0xFF);
const mem = new DataView(memBuf);

compileProgram(new Uint8Array(memBuf));

const cpu = new CPU(mem,bus, true);






const registers = document.getElementById("registers");
/**
 * Updates Register view on the Page
 */
function updateRegisters() {
    if (registers) {
        for (const child of registers.children) {
            const reg = child.dataset.reg ?? null;
            const name = child.dataset.name ?? null;

            if (reg && name) {
                child.innerHTML = name + ": 0x" + cpu.getRegister(reg).toString(16).padStart(2,"0");
            }
        }
    }

}

updateRegisters();

const stepBtn = document.getElementById("step");
stepBtn.addEventListener("click", stepCPU);
function stepCPU() {
    stepBtn.setAttribute("disabled","true");
    cpu.step();
    inspect(null);
    updateRegisters()
    stepBtn.removeAttribute("disabled");
}

const inspectView = document.getElementById("inspectView");
inspect(null);
function inspect(address) {
    inspectView.innerHTML = cpu.inspect(address);
}

