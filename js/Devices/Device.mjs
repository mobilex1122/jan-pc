/* eslint-disable no-unused-vars */
/**
 * @class Device
 * @abstract
 */
export default class {
    constructor() {

    }

    /**
     * Executes when device is selected from the bus (Might be usefull).
     */
    selected() {}

    /**
     * Executes when device is diselected.
     */
    diselect() {}

    /**
     * Used to write data to specified address.
     * @param {number} address Address to write to.
     * @param {number} value 16bit Value to write.
     * @abstract
     */
    write(address, value) {}

    /**
     * Used to read data from specified address.
     * @param {number} address Address to write to.
     * @returns {number} 16bit Value stored in that adress
     * @abstract
     */
    read(address) {}


    /**
     * Used to write data to specified address.
     * NOTE: Device is not required to respond to this call
     * @param {number} address Address to write to.
     * @param {number} value 16bit Value to write.
     * @abstract
     */
    write16(address, value) {}

    /**
     * Used to read data from specified address.
     * NOTE: Device is not required to respond to this call
     * @param {number} address Address to write to.
     * @returns {number} 16bit Value stored in that adress
     * @abstract
     */
    read16(address) {
        return 0;
    }
}