const lang = window.location.href.split("/")[3];

chrome.storage.sync.get({ first: false, second: false, third: false, fourth: false, fifth: false},(settings) => {
    if (settings.first){
        document.getElementById("noticeArea").remove();
        document.getElementsByTagName("body")[0].classList.add("cleaner");
    }if (settings.second){
        document.getElementsByTagName("body")[0].classList.add("no-btn");
    }if (settings.fifth){
        document.getElementsByTagName("body")[0].classList.add("dark-mode");
    }
    const header_read = document.getElementById("_toolBarRightArea");
    if (header_read){
        let link = document.createElement('a')
        link.setAttribute('href', `/${lang}/favorite`)
        link.setAttribute('title', 'Subscribed')
        link.className = "favorite-link-read"
        link.innerHTML = '<span class="material-symbols-rounded">favorite</span>';
        header_read.insertBefore(link, document.getElementsByClassName("spi_area")[0]);

        const next_url = document.getElementsByClassName("pg_next")[0].href;
        if(next_url){ 
            if(settings.third){
                let next_link = document.createElement('a');
                next_link.setAttribute('href', next_url);
                next_link.setAttribute('title', 'Next Episode');
                next_link.className = "next-ep-read";
                next_link.innerHTML = '<p class="next-btn arrow"><span class="material-symbols-rounded">arrow_forward</span></p><p class="next-btn next">NEXT</p>';
                document.getElementById("container").appendChild(next_link);
            }
        }else if (settings.fourth){
            let link2 = document.createElement('a');
            link2.setAttribute('href', '/'+lang+'/favorite');
            link2.setAttribute('title', 'Subscribed');
            link2.innerHTML = '<p style="line-height: 53px;"><span class="material-symbols-rounded">favorite</span></p>';
            link2.className = "next-ep-favorite-read";
            document.getElementById("container").appendChild(link2);
        }
        addEventListener('keypress', event => {
            if (event.key === "n") window.location.href = next_url ? next_url : `/${lang}/favorite`;
        })
    }
});

var Process = function(start) {
    this.start = start;
}

Process.prototype.run = function() {
    // Long-running loop
    let length = document.getElementsByClassName("card_item").length
    for (let i = 0; i< length; i++){
        let lastEp = getLastEp(document.getElementsByClassName("card_item")[i].href);
        let text = document.getElementsByClassName("update")[i].innerHTML
        document.getElementsByClassName("update")[i].innerHTML = lastEp + text.slice(text.search("<br>"));
    }
}

var p = new Process(1);



function test(){
    let length = document.getElementsByClassName("card_item").length
    for (let i = 0; i< length; i++){
        let lastEp = getLastEp(document.getElementsByClassName("card_item")[i].href);
        let text = document.getElementsByClassName("update")[i].innerHTML
        document.getElementsByClassName("update")[i].innerHTML = lastEp + text.slice(text.search("<br>"));
    }
}

function getLastEp(url){
    return request(url).getElementsByClassName("_episodeItem")[0].getElementsByClassName("tx")[0].innerText
}

function request(url){
    const http = new XMLHttpRequest();
    const parser = new DOMParser();
    http.open("GET", url, false);
    http.send();
    return parser.parseFromString(http.responseText, "text/html");
}

window.onload = function() {
    //setTimeout(test(), 100);
    //test();
    //p.run();
};