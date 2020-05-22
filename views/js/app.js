let state = {
    table_links: [],
    img_sources: [],
    texts: []
}

function filterByTitle() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search_titles');
    filter = input.value.toUpperCase();
    ul = document.getElementById('titles_ul');
    li = ul.getElementsByTagName('li');
  
    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

let stateModule = (function() {

    function setTexts(callback) {
        let url = '?texts';
        let promise = new Promise(function(resolve, reject){
            let req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('POST', url, true);
            req.onload = function() {
                resolve(req.response)
            }
            req.onerror = function() {
                reject(req.statusText)
            }
            req.send();
        });

        promise.then(function(response) {
            for (let i = 0; i < response.length; i++) {
                let obj = {
                    id: response[i].id,
                    text: response[i].text 
                };
                state.texts.push(obj);
            }
        });

        promise.then(function() {
            if (callback) {
                callback(state.texts); 
                //callback(state.texts); // the way to return a result
                // callback() will be executed just after the ending of setIframeSources
            }
        });
    }

    function displayLandingPageText() {
        let lpt = document.querySelector('#lp_text_holder');
        lpt.innerHTML = state.texts[0].text;
    }

    function setImgSources(callback) {
        let url = '?img_sources';
        let promise = new Promise(function(resolve, reject){
            let req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('POST', url, true);
            req.onload = function() {
                resolve(req.response)
            }
            req.onerror = function() {
                reject(req.statusText)
            }
            req.send();
        });
        promise.then(function(response){
            for (let i = 0; i < response.length; i++) {
                let obj = {
                    id: response[i].id,
                    src: response[i].src
                }
                state.img_sources.push(obj);
            }

        });
        promise.then(function(){
            if (callback){
                callback();
                //callback(state.img_sources); // the way to return a result
                // callback() will be executed just after the ending of setIframeSources
            }
        });
        
    }

    function displayMainImg() { 
        let displ = document.querySelector('#main_img');
        displ.src = state.img_sources[0].src;
    }

    function setStateLinks() {
        let url = '?links';
        let promise = new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('POST', url, true);
            req.onload = function() {
                resolve(req.response)
            }
            req.onerror = function() {
                reject(req.statusText)
            }
            req.send();
        });

        promise.then(function(response){
            for (let i = 0; i < response.length; i++) {
                let obj = {
                    id: response[i].id,
                    project_name: response[i].project_name,
                    href: response[i].href
                }
                state.table_links.push(obj);
            }
        });
        
        return promise;
    }

    function displayLinks(table_links) {
        let table_holder = document.querySelector('#table_holder');
        let out = '';
        out += '<table>';
        out += '<tr>';
        out += '<th> Project </th>';
        out += '<th> Link </th>';
        out += '</tr>';

        for (let i = 0; i < table_links.length; i++) {
            out += '<tr>';
            out += '<td>';
            out += '<a href="' + table_links[i].href +'">'
            out += table_links[i].project_name;
            out += '</a>';
            out += '</td>';
            out += '<td>';
            out += table_links[i].href;
            out += '</td>';
            out += '</tr>';
        }
        out += '</table>';
        table_holder.innerHTML = out;
    }

    function setGitExampleTxt(selector) {
        let out = `
            <style>
            b {
                color: red;
            }
            </style>
            <pre>
            <h4> 1) On Remote Server via SSH Connection (using PuTTy): </h4>

            Using username "bate_vanyo".
            bate_vanyo@***.***.***.***'s password:
            Last login: Fri May 15 09:02:17 2020 from **.***.***.***
            bate_vanyo@bate_vanyod.com [~]# cd a****n.com/remote_test_folder
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]#
            
            ====================== 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git config --global user.email "bate_vanyo@andonovsd.com" </b>
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git config --global user.name "Bate Vanyo" </b>
            
            ====================== 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> echo "First file made directly on remote server" > first-file.txt </b>
            
            ====================== 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git add </b> first-file.txt 
            
            ====================== 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git commit -m "first-file.txt made on remote server" </b>
            [master (root-commit) 6511f8c] first-file.txt made on remote server
                1 file changed, 1 insertion(+)
                create mode 100644 first-file.txt
            
            ====================== 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git status </b>
            On branch master
            nothing to commit, working tree clean
            
            ====================== 
            
            <h4> 2) On Local PC (using GitBash): </h4> 
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop
            $ <b> git clone ssh://bate_vanyo@bate_vanyod.com:****/***...***/a****n.com/remote_test_folder </b>
            Cloning into 'remote_test_folder'...
            bate_vanyo@bate_vanyod.com's password:
            stdin: is not a tty
            remote: Enumerating objects: 3, done.
            remote: Counting objects: 100% (3/3), done.
            remote: Total 3 (delta 0), reused 0 (delta 0)
            Receiving objects: 100% (3/3), done.
            
            ====================== 
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop
            $ cd remote_test_folder
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ ls -la
            total 29
            drwxr-xr-x 1 Ivan 197121  0 May 15 13:39 ./
            drwxr-xr-x 1 Ivan 197121  0 May 15 13:39 ../
            drwxr-xr-x 1 Ivan 197121  0 May 15 13:39 .git/
            -rw-r--r-- 1 Ivan 197121 43 May 15 13:39 first-file.txt
            
            ====================== 
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ echo "This file is made at local PC" > second-file.txt
            
            ====================== 
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ <b> git add </b> second-file.txt
            warning: LF will be replaced by CRLF in second-file.txt.
            The file will have its original line endings in your working directory
            
            ======================
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ <b> git commit -m "second-file.txt created on local PC" </b>
            [master a13a843] second-file.txt created on local PC
                1 file changed, 1 insertion(+)
                create mode 100644 second-file.txt
            
            ====================== 
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ <b> git push origin master </b>
            bate_vanyo@bate_vanyod.com's password:
            stdin: is not a tty
            Enumerating objects: 4, done.
            Counting objects: 100% (4/4), done.
            Delta compression using up to 2 threads
            Compressing objects: 100% (2/2), done.
            Writing objects: 100% (3/3), 334 bytes | 334.00 KiB/s, done.
            Total 3 (delta 0), reused 0 (delta 0)
            remote: Recieved update on checked-out branch, queueing deployment.
            remote: ---
            remote: apiversion: 3
            remote: func: create
            remote: module: VersionControlDeployment
            remote: result:
            remote:   data: ~
            remote:   errors: ~
            remote:   messages: ~
            remote:   metadata: {}
            remote:
            remote:   status: 1
            remote:   warnings: ~
            To ssh://bate_vanyod.com:****/***...***/a****n.com/remote_test_folder
                6511f8c..a13a843  master -> master
            
            ====================== 
            
            <h4> 3) On Remote Server via SSH Connection (using PuTTy): </h4> 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# echo "Third file created directly on remote master" > third-file.txt
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git add </b> third-file.txt 
            
            bate_vanyo@bate_vanyod.com [~/a****n.com/remote_test_folder]# <b> git commit -m "third-file.txt created directly on remote master" </b>
            [master d715a10] third-file.txt created directly on remote master
                1 file changed, 1 insertion(+)
                create mode 100644 third-file.txt
                
            ====================== 
            
            <h4> 4) On Local PC (using GitBash): </h4> 
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ ls -la
            total 34
            drwxr-xr-x 1 Ivan 197121  0 May 15 13:44 ./
            drwxr-xr-x 1 Ivan 197121  0 May 15 13:39 ../
            drwxr-xr-x 1 Ivan 197121  0 May 15 13:47 .git/
            -rw-r--r-- 1 Ivan 197121 43 May 15 13:39 first-file.txt
            -rw-r--r-- 1 Ivan 197121 30 May 15 13:44 second-file.txt
            
            Ivan@DESKTOP-IV22GOM MINGW64 ~/desktop/remote_test_folder (master)
            $ <b> git pull origin master </b>
            bate_vanyo@bate_vanyod.com's password:
            stdin: is not a tty
            remote: Enumerating objects: 4, done.
            remote: Counting objects: 100% (4/4), done.
            remote: Compressing objects: 100% (2/2), done.
            remote: Total 3 (delta 0), reused 0 (delta 0)
            Unpacking objects: 100% (3/3), done.
            From ssh://bate_vanyod.com:****/home/bate_vanyo/a****n.com/remote_test_folder
                * branch            master     -> FETCH_HEAD
                a13a843..d715a10  master     -> origin/master
            Updating a13a843..d715a10
            Fast-forward
                third-file.txt | 1 +
                1 file changed, 1 insertion(+)
                create mode 100644 third-file.txt
            <pre>
             `;
        selector.innerHTML = out;
        
    };

    return {
        init: function() {

            let gth = document.querySelector('#git_txt_holder');
            setGitExampleTxt(gth);

            // callback - 1st way of dealing with
            setTexts(displayLandingPageText); 

            // callback - 2nd way of dealing with
            setImgSources(function() {
                displayMainImg();
            });

            setStateLinks().then(function() {
                displayLinks(state.table_links);
            }); 

        }
    }
})();

stateModule.init();


let sliderModule = (function() {

    let sl_images = [
        './views/images/1.jpg',
        './views/images/2.jpg',
        './views/images/3.jpg',
        './views/images/4.jpg'
    ];

    let i = 0;

    function next() {
        i++;
    }

    function prev() {
        i--;
    }

    return {
        init: function() {
            
            let slider_holder = document.querySelector('#slider_1');
            let out = '<table>';
            out += '<tr>';
            out += '<td> <div id="s1_prev"> <span class="glyphicon glyphicon-chevron-left"><span> </div></td>';
            out += '<td>' + '<img src=' + sl_images[0] + ' id="main_sl_img">' + '</td>';
            out += '<td> <div id="s1_next"> <span class="glyphicon glyphicon-chevron-right"><span> </div></td>';
            slider_holder.innerHTML = out;

            let main_sl_img = document.querySelector('#main_sl_img');
            let prev_btn = document.querySelector('#s1_prev');
            let next_btn = document.querySelector('#s1_next');

            prev_btn.style.backgroundColor = '#337ab7';
            prev_btn.style.height = '40px';
            prev_btn.style.width = '40px';
            prev_btn.style.padding = '10px';
            prev_btn.style.borderRadius = '5px';

            next_btn.style.backgroundColor = '#337ab7';
            next_btn.style.height = '40px';
            next_btn.style.width = '40px';
            next_btn.style.padding = '10px';
            next_btn.style.borderRadius = '5px';
            
            prev_btn.addEventListener('click', function(event) {
                if (i > 0) {
                    prev();                   
                }
                main_sl_img.setAttribute('src', sl_images[i]);
                event.preventDefault();
            });

            next_btn.addEventListener('click', function(event) {
                if (i < sl_images.length -1) {
                    next();
                }
                main_sl_img.setAttribute('src', sl_images[i]);
                event.preventDefault();
            });

        }
    }

})();

sliderModule.init();
    

