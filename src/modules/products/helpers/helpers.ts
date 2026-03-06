export function formatPrice(value: number): string {
    const [intPart, decPart] = value.toFixed(2).split(".")
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return `${formattedInt}.${decPart}`
}
