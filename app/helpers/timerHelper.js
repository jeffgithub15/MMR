
export function ComputeMinute(minutes, seconds) {
    if (minutes == 0 && seconds <= 1)
        return 0;
    return seconds <= 1 ? minutes - 1 : minutes;
}

export function ComputeSecond(minutes, seconds) {
    if (minutes == 0 && seconds <= 1)
        return 0;
    return seconds <= 1 ? 59 : seconds - 1;
}
