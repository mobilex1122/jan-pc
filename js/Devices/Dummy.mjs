import Device from "./Device.mjs";

export default class Dummy extends Device {
    read() {
        return 0;
    } 
}