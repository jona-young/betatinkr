export const boxShadowStyle = (xOff, yOff, shadowColor, shadowOpac, shadowRadius, elevation) => {
    if (Platform.OS === 'ios')
    {
        return {
            shadowColor: shadowColor,
            shadowOffset: { width: xOff, height: yOff },
            shadowOpacity: shadowOpac,
            shadowRadius: shadowRadius,
        }
    } else if (Platform.OS === 'android') {
        return {
            elevation: elevation,
            shadowColor: shadowColor
        }
    }
}