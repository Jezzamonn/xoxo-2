import matrixMultiplication from 'matrix-multiplication';

export function easeInOut(t, amt=2) {
    let tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}

export function sinEaseInOut(t) {
	return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

export function slurp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}

export function experp(val1, val2, amt) {
    return Math.exp(
        slurp(
            Math.log(val1),
            Math.log(val2),
            amt
        )
    )
}

export function clampedSlurp(val1, val2, amt) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return slurp(val1, val2, amt);
}

export function clamp(amt, val1, val2) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return amt;
}

export function to2dIsometric(x, y, z, xzAngle=0, yAngle=0) {
    const mul = matrixMultiplication()(3);
    // s/o to wikipedia for these rotation matrices
    const xzRotateMatrix = [
        Math.cos(xzAngle), 0, -Math.sin(xzAngle),
        0, 1, 0,
        Math.sin(xzAngle), 0, Math.cos(xzAngle)
    ];
    const yRotateMatrix = [
        1, 0, 0,
        0, Math.cos(yAngle), Math.sin(yAngle),
        0, -Math.sin(yAngle), Math.cos(yAngle)
    ];
    const transformMatrix = mul(yRotateMatrix, xzRotateMatrix);

    const transformed = mul(transformMatrix, [x, y, z]);
    // Just return the x and y
    return {x: transformed[0], y: transformed[1]};
}