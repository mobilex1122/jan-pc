import Instructions from "../CPU/Instructions.mjs";
import Registers from "../CPU/Registers.mjs";
import InstructionMap from "./InstructionMap.mjs";
import { VarTypes } from "./Types.mjs";



export default class Asembler {

    numberRegex = /(0x)?[0-9]+/gm;


    /**
     * 
     * @param {DataView} mem System Memory
     */
    constructor(mem) {
        this.mem = mem;
        this.variables = {}
        this.labels = {}
        this.codeArray = [];
    }



    parse(code) {
        //code = this.replaceRegisters(code);
        //console.log("Stage 1 (Registers)");
        console.log(code)

        code = this.convertVariables(code);
        console.log("Stage 2 (Variables): ")
        console.log(this.variables);

        this.convertInstructions(code);
        console.log("Stage 3 (Instructions): ");
        console.log(this.codeArray)



        this.buildCode()

        console.log("Done")
    }


    replaceRegisters(code) {
        Object.keys(Registers).forEach((reg) => {
            code = code.replaceAll("#"+ reg, Registers[reg])
        })
        return code
    }

    convertVariables(code) {
        const lines = code.split("\n");
        code = ""
        lines.forEach((line) => {
            if (line.startsWith("@var")) {
                
                let varDef = line.substr(4).split("=");

                if (varDef.length == 2) {
                    this.variables[varDef[0].trim()] = this.parseVariable(varDef[1].trim())
                } 
            } else {
                code += line + "\n"
            }
        })

        return code
    }

    convertInstructions(code) {
        const lines = code.split("\n");
        code = ""
        lines.forEach((line,lineNum) => {
            if (line.startsWith(":")) {
                let varDef = line.substr(1);
                this.labels[varDef[0].trim()]
                console.log("Label " + varDef);
                this.codeArray.push({
                    line: lineNum + 1,
                    label: varDef,
                })
            } else {
                this.convertInstruction(line,lineNum + 1);
            }
        })
    }

    convertInstruction(line,lineNum) {
        const [inst,...rawargs] = line.split(" ");
        const args = []
        const argTypes = []

        console.log(line)
        if (rawargs && rawargs.length > 0) {
            rawargs.join(" ").split(",").forEach((arg) => {
                var vardef = this.getVarDef(arg.trim())
                console.log(vardef);
                args.push(vardef);
                argTypes.push(vardef.type);
            })
        }
        if (inst == "") {
            return;
        }
        if (InstructionMap[inst] && InstructionMap[inst](argTypes.join("")) != false) {
            var instnum = InstructionMap[inst](argTypes.join(""));
            if (instnum && instnum != false) {
                this.codeArray.push({
                    line: lineNum,
                    inst: instnum,
                    args: args
                })
                return
            } 
        } 
        throw new Error("L:"+lineNum+ " : Can't find instruction: " + inst + " (types: " + argTypes.join(", ") + " )\nLINE: " + line )

    }

    parseLabels(code) {
        const lines = code.split("\n");
        code = ""
        lines.forEach((line) => {
            if (line.startsWith("@var")) {
                
                let varDef = line.substr(4).split("=");

                console.log("Var " + varDef);
                if (varDef.length == 2) {
                    this.variables[varDef[0].trim()] = this.parseVariable(varDef[1].trim())
                } 
            } else {
                code += line + "\n"
            }
        })

        return code
    }

    /**
     * 
     * @param {string} data 
     * @returns 
     */
    getVarDef(data) {
        if (data.startsWith('"') && data.endsWith('"')) {
            return {
                type: VarTypes.STR,
                val: data.substring(1,data.length - 2)
            }
        } else if (data.startsWith('#') && data.endsWith("*")) {
            return {
                type: VarTypes.MEMPNT,
                val: data.substring(1)
            }
        } else if (data.startsWith('#')) {
            return {
                type: VarTypes.REG,
                val: data.substring(1)
            }
        } else if (data.startsWith(':')) {
            return {
                type: VarTypes.LABEL,
                val: data.substring(1)
            }
        } else if (data.startsWith('@')) {
            return {
                type: VarTypes.VAR,
                val: data.substring(1)
            }
        } else if (data.match(this.numberRegex) != null) {
            return {
                type: VarTypes.NUM,
                val: parseInt(data)
            }
        } else {
            return {}
        }
    }


    parseVariable(data) {
        if (data.startsWith('"') && data.endsWith('"')) {
            return data.substr(1, data.length - 2)
        }
    }



    buildCode() {
        var ip = 0;
        var mem = this.mem;

        function pushI(code) {
            mem.setUint8(ip,code.inst);
            ip+=1
        }

        function pushA(arg,size) {
            if (size == 1) {
                mem.setUint8(ip,arg);
                ip+=1
            } else if (size == 2) {
                mem.setUint16(ip,arg);
                ip+=2
            }

            
        }


        this.codeArray.forEach((code)=> {

            if (code.label) {
                this.labels[code.label] = ip;
            } else {
                pushI(code)
                let a = code.args;
                switch(code.inst) {
                    case Instructions.MOV_LIT_REG: {
                        pushA(a[0],2);
                        pushA(a[1],1);
                        break;
                    }
                    case Instructions.BUS_SELECT: {
                        pushA(a[0],2);
                        break;
                    }
                    case Instructions.BUS_WITE_LIT: {
                        pushA(a[0],2);
                        pushA(a[1],2);
                        break;
                    }
                    case Instructions.ADD_REG_LIT: {
                        pushA(a[0],2);
                        pushA(a[1],1);
                        break;
                    }
                    case Instructions.MOV_LIT_REG: {
                        pushA(a[0],2);
                        pushA(a[1],1);
                        break;
                    }
                }
            }


        })


        console.log(mem.buffer)
    }
}