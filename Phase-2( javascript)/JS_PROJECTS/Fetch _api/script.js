


// fatch api with jsonplaceholder....
let table = document.getElementById("tableData");

fetch("https://jsonplaceholder.typicode.com/users") // demo api url for json placeholder

.then(function(response){
return response.json();
})

.then(function(data){

data.forEach(function(user){

let row = `
<tr>
<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.username}</td>
<td>${user.address.street}</td>
<td>${user.address.city}</td>
<td>${user.address.zipcode}</td>
<td>${user.company.name}</td>

<td>
<button class="edit" onclick="editRow(this)">Edit</button> 
<button class="delete" onclick="deleteRow(this)">Delete</button>
</td>

</tr>
`;

table.innerHTML += row;

});

});

// remove function 
function deleteRow(btn){

let row = btn.parentNode.parentNode;

row.remove();

}

// edit function 
function editRow(btn){

let row = btn.parentNode.parentNode;

let name = row.children[1].innerText;

let newName = prompt("Edit Name", name);

if(newName !== null){

row.children[1].innerText = newName;

}

}


// keyword  serching .... 
document.getElementById("search").addEventListener("keyup",function(){

let value = this.value.toLowerCase();

let rows = document.querySelectorAll("#tableData tr");

rows.forEach(function(row){

let text = row.innerText.toLowerCase();

if(text.includes(value)){
row.style.display="";
}
else{
row.style.display="none";
}

});

});
