
// Match user entered password to hashed password in database
export const mathPassword = async function (enteredPassword: string, hashedPassword: string) {
    return Bun.password.verifySync(enteredPassword, hashedPassword)
}


export const hashPasswordSync = function (password: string) {
    return Bun.password.hashSync(password, {
        algorithm: 'bcrypt',
        cost: 4, // number between 4-31
    })
}


export const hashPassword = async function (password: string) {
    return await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 4, // number between 4-31
    })
}