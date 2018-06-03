var autisUrl = null;
var options = [];
var autisYT = 0;
var autisbuttoncreated = false;

function start() {
    if (document.URL.indexOf('youtube.com/watch') != -1) {
        console.clear();
        console.log("Script started!");

        var url = new URL(document.URL);
        autisUrl = document.URL;
        var id_video = url.searchParams.get("v");
        autis_panel();
    }
    function autis_panel() {
        var autisframe = $("<iframe hidden style=\"width:0;height:0;border:0; border:none;\" class=\"t_inject_container\" id=\"autisFrame\" src=\"https://www.yt-download.org/pt/@api/button/mp3/" + id_video + "&type=\">");
        $('body').append(autisframe);
    }
    if (autisYT == 0) {
        var austisinterval = setInterval(function () {
            try {
                if (document.URL.indexOf('https://www.yt-download.org/') != -1 && options.length == 0) {
                    var yt_id = document.URL.replace('https://www.yt-download.org/pt/@api/button/mp3/', "").replace('&type=', "");
                    var autisidentifier = "AUTIS_" + yt_id;
                    options[0] = autisidentifier;
                    options[1] = document.all[17].href;
                    options[2] = document.all[22].href;
                    options[3] = document.all[27].href;
                    options[4] = document.all[32].href;
                    var autisvalue = JSON.stringify(options);
                    chrome.storage.local.set({ 'Autisdown': autisvalue });
                    clearInterval(austisinterval);
                    console.log(options);
                    autisYT++;
                }
            } catch (error) { };
        }, 1000);
    }
}

setInterval(function () {
    if (document.URL.indexOf('youtube.com/watch') != -1 && autisbuttoncreated == false) {
        var url = new URL(document.URL);
        var video_id = url.searchParams.get("v");
        var autisidentifier = "AUTIS_" + video_id;
        var autisget = null;
        chrome.storage.local.get('Autisdown', function (result) {
            if (result['Autisdown'] != undefined) {
                var autisget = JSON.parse(JSON.stringify(result['Autisdown']));
                if (autisget != null) {
                    console.log(autisget);
                    var autislocal = JSON.parse(autisget);
                    if (autislocal != null && autisidentifier == autislocal[0]) {
                        var autis_title = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0]
                        var btn = document.createElement("a");
                        var t = document.createTextNode("Download MP3");
                        btn.appendChild(t);
                        btn.id = "autisbutton";
                        btn.classList.add("autisbutton");
                        btn.href = autislocal[2];
                        autis_title.appendChild(btn);
                        autisbuttoncreated = true;
                        chrome.storage.local.clear();
                    }
                }
            }
        });
    }

    if (autisUrl != document.URL) {
        var elem = document.getElementById('autisbutton');
        if (elem != null) { elem.parentNode.removeChild(elem); }
        autisbuttoncreated = false;
        start();
    }
}, 1000);