export const getFormatedTime = (duration: number): string => {
    const minutes = Math.floor(duration / 60)
    const seconds = `${Math.round(duration % 60)}`
    return `${minutes}:${seconds.padStart(2, '0')}`
}