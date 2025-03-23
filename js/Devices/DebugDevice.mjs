import Device from "./Device.mjs";

export default class DebugDevice extends Device {
    constructor(name) {
        super();
        this.name = name;

        const mem = new ArrayBuffer(0xFF*0xFF);
        this.d = new DataView(mem);
    }

    log(msg) {
        console.log("Debug BUS Device ("+ this.name +"): " + msg);
    }

    selected() {
        this.log("Selected");
    }

    diselect() {
        this.log("Diselected");
    }

    read(address) {        
        this.log("Read: " + address);

        return this.d.getUint8(address);
    } 

    write(address,value) {
        this.log("Write: " + address + " -> " + value);
        this.d.setUint8(address,value);
    } 
}