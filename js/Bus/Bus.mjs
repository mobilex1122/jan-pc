
/**
 * @typedef {import("../Devices/Device.mjs")} Device
 */
export default class Bus {
    dummy = null;
    selectedDevice = 0;

    /** @type {Device[]} */
    devices = [];
    /**
     * @param {Device} dummyDevice Dummy Device used when no device is on specified adress
     */
    constructor(dummyDevice) {
        this.dummy = dummyDevice
    }

    selectDevice(index) {
        if (this.devices[this.selectDevice]) {
            this.devices[this.selectDevice].diselected();
        }
        this.selectDevice = index;
        if (this.devices[this.selectDevice]) {
            this.devices[this.selectDevice].selected();
        }
    }

    addDevice(index,device) {
        this.devices[index] = device;
    }

    write(address,value) {
        const device = this.devices[this.selectedDevice];
        if (device != null) {
            device.write(address,value);
        } else {
            this.dummy.write(address,value);
        }
    }

    /**
     * Reads from Bus Device
     * @param {number} address 
     * @returns {number} Value at that address
     */
    read(address) {
        const device = this.devices[this.selectedDevice];
        if (device != null) {
            return device.read(address);
        } else {
            return this.dummy.read(address);
        }
    }
}