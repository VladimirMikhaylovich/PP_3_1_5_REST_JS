const url = "http://localhost:8080/api/admin/"
const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}]


fetch('url').then(res => {
    res.json().then(data => {
        console.log(data);


        let usersTable = "";
        data.map((user) => {
            usersTable+=`
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
            </tr>`

        });
        document.getElementById("users-table").innerHTML = usersTable;
    })
})

//---------------------

fetch('/admin')
    .then(response => response.json())
    .catch(error => console.log(error))

let usersTable = ''
const showUsers = (users) => {
    const container = document.getElementById("users-table")
    const arr = Array.from(users)
    arr.forEach(user => {
        usersTable += `
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
    container.innerHTML = usersTable
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersTable = ''
            showUsers(data)
        })
}
// // //----------------
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
fetch('api/user/')
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))

// edit modal

const modalEdit = new bootstrap.Modal(document.getElementById('editModal'))
const editForm = document.getElementById('editForm')
const editId = document.getElementById('editId')
const nameEdit = document.getElementById('nameEdit')
const lastnameEdit = document.getElementById('lastnameEdit')
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
        editId.value = user.id
        nameEdit.value = user.firstname
        lastnameEdit.value = user.lastname
        ageEdit.value = user.age
        emailEdit.value = user.email
        usernameEdit.value = user.username
        passwordEdit.value = ''
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
    fetch(url +idForm, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            firstname: nameEdit.value,
            lastname: lastnameEdit.value,
            age: ageEdit.value,
            email: emailEdit.value,
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

//-------new user

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
