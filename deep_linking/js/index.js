
window.onload = function () {

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
          return 'iOS';
      
        }
        else if( userAgent.match( /Android/i ) )
        {
      
          return 'Android';
        }
        else
        {
          return 'unknown'; 
        }
      }

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

        const currentSystem = getMobileOperatingSystem()

        if (currentSystem === "Android") {
          alert(`orderId === ${orderId}`)
            // window.location.replace(`intent:#Intent;scheme=atmkz://orders/?orderId=${orderId};package=com.profit.patientcab;end`)
            window.location.replace(`intent:#Intent;scheme=atmkz://orders/?orderId=${orderId};package=com.electronic.electronic;end`)
            // window.location.replace(`exp://127.0.0.1:19000/--/path/into/app?orderId=${orderId}`)
            // window.location.replace(`intent:#Intent;package=com.profit.patientcab;end`)
        } else if (currentSystem === "iOS") {
            window.location.replace(`atmkz://orders/?orderId=${orderId}`)
        }
    }

}



