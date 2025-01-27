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


function searchCondition() {
    const input = document.getElementById('searchInput').value.toLowerCase();
/*    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
*/
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let result = null;
            /* First : test if input is a known keyword : */
            for (var k in data) {
                if (k.toLocaleLowerCase().includes(input)) {
                    result = data[k];
                    break;
                } else {
                    tmp = data[k].find(item => item.name.toLowerCase().includes(input));
                    if(tmp) {
                        result = tmp;
                        break;
                    }
                }
            };
            if (result) {
                console.log(result);
            };
/*            const condition = data.countries.find(item => item.name.toLowerCase().includes(input));
            console.log(condition);
*/
/*            if (condition) {
                const symptoms = condition.symptoms.join(', ');
                const prevention = condition.prevention.join(', ');
                const treatment = condition.treatment;

                resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

                resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
*/        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
