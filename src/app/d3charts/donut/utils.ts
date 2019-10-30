export class Utils {
    static randomNumber(from: number, to: number ){
        return ~~(Math.random() * (to - from)) + from;
    };
    static getColors() {
        const COLORS = [];
        while (COLORS.length < 4) {
            COLORS.push(`rgb(${Utils.randomNumber(0, 255)},
       ${Utils.randomNumber(0, 255)},
       ${Utils.randomNumber(0, 255)})`);
        }
        return COLORS;
    }
}
