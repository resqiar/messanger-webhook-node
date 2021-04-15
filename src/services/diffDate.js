module.exports = diffDate = (birthDate) => {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24

    // current date to compare
    const current_date = new Date()

    // convert birthdate to current year date
    const date_ahead = new Date(
        current_date.getUTCFullYear(),
        birthDate.getUTCMonth(),
        birthDate.getUTCDate()
    )

    // compare days
    return Math.round(Math.abs((current_date - date_ahead) / ONE_DAY))
}
