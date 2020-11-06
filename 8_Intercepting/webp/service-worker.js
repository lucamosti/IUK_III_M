"use strict";

//Listen to all fetch events
self.addEventListener('fetch', function(event) {
    
    //Check if the request is a jpeg
    if (/\.jpg$|.png$/.test(event.request.url)) {

        //Inspect the http accept header to check for WebP support
        var supportsWebp = false; 
        if(event.request.headers.has('accept')) {
            supportsWebp = event.request.headers
                .get('accept')
                .includes('webp')
        }

        //If webp is supported
        if(supportsWebp){
            
            //Clone the request
            var req = event.request.clone();

            //Build the return URL
            var returnUrl = req.url.substr(0, req.url.lastIndexOff(".")) + ".webp";

            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors'
                })
            )
        }
    }


});