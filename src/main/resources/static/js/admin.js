const url = "http://localhost:8080/admin/"
const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}]



fetch('/user')
    .then(response => response.json())
    .catch(error => console.log(error))

let usersInfo = ''
const showUsers = (users) => {
    const container = document.getElementById("tbody-admin")
    const arr = Array.from(users)
    arr.forEach(user => {
        usersInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => role.name)}</td>
            <td class="text text-white">
                <a class="btnEdit btn btn-info">Edit</a>
            </td>
            <td class="text text-white">
                <a class="btnDelete btn btn-danger">Delete</a>
            </td>
        </tr>
        `
    })
    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = '';
            console.log(data);
            showUsers(data);
            detailsUser(data);
        })
}
let userInfo = ''
const showUser = (user) => {
    const container = document.getElementById("tbody-user-info")
    userInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => role.name)}</td>
        </tr>`
    container.innerHTML = userInfo
}
fetch('/admin/user/')
    .then(response => response.json())
    .then(data => {
        showUser(data)
        detailsUser(data)
    })
    .catch(error => console.log(error))


//Create user
const newUserForm = document.getElementById('formNewUser');
const newRoles = document.getElementById('roles');

newRoles.innerHTML = `
                   <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                   `

newUserForm.addEventListener('submit', addNewUser);

async function addNewUser(event) {
    event.preventDefault();

    const newRole = document.querySelector('#roles').selectedOptions;
    let listOfRole = [];
    for (let i = 0; i < newRole.length; i++) {
        listOfRole.push({
            id: newRole[i].value
        });
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newUserForm.name.value,
            lastname: newUserForm.lastname.value,
            age: newUserForm.age.value,
            email: newUserForm.email.value,
            username: newUserForm.username.value,
            password: newUserForm.password.value,
            roles: listOfRole
        })
    }
    await fetch(url, method).then(() => {
        newUserForm.reset();
        $('[href="#nav-admin"]').tab('show');

    }).then(reloadShowUsers);

}


// Edit modal
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('editForm')
const idEdit = document.getElementById('idEdit')
const nameEdit = document.getElementById('nameEdit')
const lastnameEdit = document.getElementById('lastNameEdit')
const ageEdit = document.getElementById('ageEdit')
const emailEdit = document.getElementById('emailEdit')
const usernameEdit = document.getElementById('usernameEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('userRoleEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            console.log("btnEditClick")
            handler(e)
        }
    })
}

let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idEdit.value = user.id
        nameEdit.value = user.name
        lastnameEdit.value = user.lastname
        ageEdit.value = user.age
        emailEdit.value = user.email
        usernameEdit.value = user.username
        passwordEdit.value = user.password
        rolesEdit.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('userRoleEdit'))

    fetch(url+idForm, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            name: nameEdit.value,
            lastname: lastnameEdit.value,
            age: ageEdit.value,
            email:emailEdit.value,
            username: usernameEdit.value,
            password: passwordEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

//Delete modal
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const idDelete = document.getElementById('idDel')
const nameDelete = document.getElementById('nameDel')
const lastnameDelete = document.getElementById('lastNameDel')
const ageDelete = document.getElementById('ageDel')
const emailDelete = document.getElementById('emailDel')
const usernameDelete =document.getElementById('usernameDel')
const passwordDelete = document.getElementById('passwordDel')
const rolesDelete = document.getElementById('userRoleDel')


on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    }).then(response => response.json()).then(data => getUserById(data)).catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        nameDelete.value = user.name
        lastnameDelete.value = user.lastname
        ageDelete.value = user.age
        emailDelete.value = user.email
        usernameDelete.value = user.username
        passwordDelete.value = user.password
        rolesDelete.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show();
    }

})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

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

let roleArray = (options) => {
    let array = []
    for (let  i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array
}


