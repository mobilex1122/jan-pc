
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
        if (this.devices[this.selectedDevice] && this.devices[this.selectedDevice].diselected) {
            this.devices[this.selectedDevice].diselected();
        }
        this.selectedDevice = index;
        if (this.devices[this.selectedDevice]) {
            this.devices[this.selectedDevice].selected();
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

    write16(address,value) {
        const device = this.devices[this.selectedDevice];
        if (device != null) {
            device.write16(address,value);
        } else {
            this.dummy.write16(address,value);
        }
    }

    /**
     * Reads from Bus Device
     * @param {number} address 
     * @returns {number} Value at that address
     */
    read16(address) {
        const device = this.devices[this.selectedDevice];
        if (device != null) {
            return device.read16(address);
        } else {
            return this.dummy.read16(address);
        }
    }
}