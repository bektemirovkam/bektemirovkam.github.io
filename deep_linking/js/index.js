
window.onload = function () {

    function getOrderId() {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        if (vars) {
            const orderId = vars[0].split("=")[1];
            return orderId
        } else {
            return null
        }
    }

    const orderId = getOrderId()

    if (orderId) {
        window.location.replace(`atmkz://orders/?orderId=${orderId}`)
    }

}



