/* Manage header at each page : */
let header= `
    <h1><a href="./index.html"><image src="./Images/plane.png" width="70"/>Paper planes Company</a></h1>
    <ul>
    <li><a href="./index.html" id="home">Home </a></li>
    <li><a href="./travel_about_us.html" id="about">About Us </a></li>
    <li><a href="./travel_contact.html" id="contact">Contact Us </a></li>
`;

let search_bar= `
    <li id="searchBar"><input type="text" id="searchInput" size=35 placeholder="Enter a destination or keyword">
        <button id="btnSearch">Search</button>
        <button id="btnClear">Clear</button></li>
    </ul>
`;

function load_header(searchBar = true) {
    document.getElementById("navHeader").innerHTML = header;
    if (searchBar) {
        document.getElementById("navHeader").innerHTML += search_bar;
    }
}

/* Manage Social network icons : */
let social_icons=`
    <div class="iconbutton">
        <a href="https://x.com" target="_blank"><image src="./Images/x_logo.png" style="width:42px;height:42px;"/></a>
        <a href="https://www.facebook.com" target="_blank"><image src="./Images/facebook_logo.png" style="width:35px;height:35px;"/></a>
        <a href="https://www.instagram.com/" target="_blank"><image src="./Images/instagram_logo.png" style="width:35px;height:35px;"/></a>
        <a href="https://www.youtube.com/" target="_blank"><image src="./Images/youtube_logo.png" style="width:35px;height:35px;"/></a>
    </div>
`

function load_social_icons() {
    document.body.innerHTML += social_icons;
}

/* Fetch json file : */

function clearSearch() {
    document.getElementById('searchInput').value = "";
}

/* Header is added during load page. Thus, listener for search buttons should be added after
page loading : */
window.addEventListener("load", function(){
    const btnClear = document.getElementById("btnClear");
    btnClear.addEventListener('click', clearSearch);   
    
    const btnSearch = document.getElementById("btnSearch");
    btnSearch.addEventListener('click', searchCondition);
});

function displaySite(site, container) {
    container.innerHTML += `
        <div id="siteDescription">
        <image src="${site["imageUrl"]}" width="100%"/>
        <p><b>${site["name"]}</b><p>
        ${site["description"]}
        <p><button>Visit</button></p>
        </div>
    `

}

function searchCondition() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultTh = document.getElementById('results');
    resultTh.innerHTML = '';

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            for (var k in data) {
                if (k.toLocaleLowerCase().includes(input)) {
                    console.log(data[k]);
                    for (var i in data[k]) {
                        if (data[k][i]["cities"]) {
                            for(p in data[k][i]["cities"]) {
                                    displaySite(data[k][i]["cities"][p], resultTh);
                            }
                        } else {
                            displaySite(data[k][i], resultTh);
                        }
                    }
                } else {
                    tmp = data[k].find(item => item.name.toLowerCase().includes(input));
                    if(tmp) {
                        if (tmp["cities"]) {
                            for(p in tmp["cities"]) {
                                    displaySite(tmp["cities"][p], resultTh);
                            }
                        } else {
                            displaySite(tmp, resultTh);
                        }
                    } else {
                        for (var i in data[k]) {
                            if (data[k][i]["cities"]) {
                                tmp = data[k][i]["cities"].find(item => item.name.toLowerCase().includes(input));
                                if(tmp) displaySite(tmp, resultTh);
                            }
                        }
                    }
                }
            };
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
