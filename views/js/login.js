let loginModule = (function() {

    let login = function(input) {

        let getCookie = function() {
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        }

        let data = JSON.stringify(input);
        let url = '?login';
        
        let promise = new Promise(function(resolve, reject) { 
            let req = new XMLHttpRequest();					
            req.responseType = 'json';
            req.open('POST', url, true);
            req.onload = function() { 
                resolve(req.response)
            }; 
            req.onerror = function() { 
                reject(req.statusText);
            }; 
            req.send(data);
        });

        promise.then(function(response) {
            if (response.jwt !== getCookie('jwt_cookie')) {
                window.alert("Incorrect Credentials!");  
                window.location.href = "https://www.andonovsd.com";               
            } else {
                let sl_1 = document.querySelector('#slider_1');
                sl_1.style.display = "block";
                let git_txt = document.querySelector('#git_txt_holder');
                git_txt.style.display = "block";

            }
        });

        promise.then(function() {
            let login_icon = document.querySelector('#login-icon');
            login_icon.style.display = "none";

            let logout_icon = document.querySelector('#logout-icon');
            logout_icon.style.display="block";
            
            let login_logout = document.querySelector('#login-out-btn-txt');
            login_logout.innerHTML = "Logout";            
        });

        promise.then(function() {
            let login_logout = document.querySelector('#login-out-btn-txt');
            if (login_logout.innerHTML === "Logout") {

                let out_lnk = document.querySelector('#login-link');            
                out_lnk.addEventListener('click', function(event) {

                    $('#loginModal').modal('toggle');
                    
                    let lm = document.querySelector('#loginModal');
                    lm.style.display = "none";

                    document.cookie = "jwt_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = "";
                    event.preventDefault();
                });
            }
        });

        return promise;
    }

    return {
        init: function() {

            let logout_icon = document.querySelector('#logout-icon');
            logout_icon.style.display="none";
            
            let login_logout = document.querySelector('#login-out-btn-txt');
            login_logout.innerHTML = "Login";

            let subm = document.querySelector('#login-btn');
            subm.addEventListener('click', function(event){
                let email = document.querySelector('#email').value;
                let pass = document.querySelector('#password').value;
                let input = {
                    email: email,
                    pass: pass
                };
                login(input);
                $('#loginModal').modal('toggle');
            });
        }
    }
})();

loginModule.init();