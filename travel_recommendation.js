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