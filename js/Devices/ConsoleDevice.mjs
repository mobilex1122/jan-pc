import Device from "./Device.mjs";

export default class ConsoleDevice extends Device {
    /**
     * Simple console. Write to address 00 to add character use 0x03 to send to console
     * User input read is not yet awailable. :)
     * @param {HTMLElement} consoleDiv Div to use as the console output
     */
    constructor(consoleDiv, debug = false) {
        super();
        this.name = "Console"
        this.toSend = "";
        this.debug = debug;

        this.el = consoleDiv
    }

    log(msg) {
        if (this.debug) {
        console.log("Debug BUS Device ("+ this.name +"): " + msg);
        }
    }

    selected() {
        this.log("Selected");
    }

    diselect() {
        this.log("Diselected");
    }

    read() {
        return 0;
    } 

    sendToConsole() {
        let send = this.toSend;

        send = send.replaceAll("\n", "<br>");
        send = send.replaceAll(" ", "&nbsp;");

        this.el.innerHTML += send;
        this.toSend = "";
    }

    write(address,value) {
        if (address == 0x00) {
            if (value == 0x03) {
                this.log("EOT")
                this.sendToConsole();
            } else {
                let char = String.fromCharCode(value);
                this.log(char)
                this.toSend += char;
            }
        } else {
            this.log("Not valid")
        }
    } 
}