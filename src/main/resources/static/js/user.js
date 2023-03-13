const url = "http://localhost:8080/admin/user"
fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))

let userPageInfo = ' '
const showUserInfo = (user) => {
    const container = document.getElementById("tbody-user")
    userPageInfo +=
        `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => role.name)}</td>
        </tr>`
    container.innerHTML = userPageInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => {
        showUserInfo(data)
        detailsUser(data)
    })
    .catch(error => console.log(error))

let userNavbar = '';
const detailsUser = (user) => {
    const containerNavbar = document.getElementById("navbar-admin");
    userNavbar += `
         <span class="navbar-brand mb-0 h1" style="color:white; margin-right: 20px">${user.email}</span>
         <span class="navbar-brand mb-0 h1" style="color:white">${user.roles.map(role => role.name)}</span>
         <a href="/logout">
         <button type="button" class="btn btn-link mr float-right" style="color:white; style="margin-left: 800px">
         Logout
         </button>
         </a>                                         
    `
    containerNavbar.innerHTML = userNavbar
}