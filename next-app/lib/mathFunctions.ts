
class MathFunctions {
	public round = (value: number, precision: number) => {
		return parseFloat(Number(value).toFixed(precision))
	}

	public clamp(value:number,min:number,max:number) {
		return Math.min(Math.max(value, min), max);
	}
}

export const Functions = new MathFunctions()
export default Functions;

