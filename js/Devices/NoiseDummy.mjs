import Device from "./Device.mjs";

export default class NoiseDummy extends Device {
    read() {
        return Math.round(Math.random() * 0xFF);
    } 
}