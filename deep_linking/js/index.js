try {
    window.location.replace("atm://")
} catch (error) {
    window.alert(JSON.stringify(error))
}