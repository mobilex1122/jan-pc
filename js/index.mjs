import Asembler from "./Asembler/Asembler.mjs";
import Bus from "./Bus/Bus.mjs";
import CPU from "./CPU/CPU.mjs";
import ConsoleDevice from "./Devices/ConsoleDevice.mjs";
import DebugDevice from "./Devices/DebugDevice.mjs";
import NoiseDummy from "./Devices/NoiseDummy.mjs";
import { compileProgram } from "./testProgram.mjs";


const bus = new Bus(new NoiseDummy());


const consoleDiv = document.getElementById("console");

bus.addDevice(0,new DebugDevice("INDEX 1"));
bus.addDevice(1,new ConsoleDevice(consoleDiv));





const memBuf = new ArrayBuffer(0xFF);
const mem = new DataView(memBuf);


//compileProgram(new Uint8Array(memBuf));
//console.log(buf2hex(memBuf))

const asembler = new Asembler(mem);



fetch("./asembly/main.asm").then((res) => res.text().then((code) => {
    asembler.parse(code)
    console.log(buf2hex(memBuf))
    document.getElementById("compiler").innerHTML = buf2hex(memBuf)
}))


const cpu = new CPU(mem,bus, false);


function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}



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
                child.innerHTML = name + ": 0x" + cpu.getRegister(reg).toString(16).padStart(4,"0");
            }
        }
    }

}

updateRegisters();

const runBtn = document.getElementById("run");
runBtn.addEventListener("click", runCPU);

function runCPU() {
    cpu.run(() => {
        inspect(null);
    });
}


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

