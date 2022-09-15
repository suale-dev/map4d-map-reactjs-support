export class VariableTool {
    static hasValue = (variable: any) => {
        if (variable != undefined && variable != null) {
            return true
        }
        return false
    }
}