let obj = {
    title: '',
    amount: '',
    type: '',
    Category: '',
    date: '',
    note: '',
    id: ''
}
// target object keys and value..

function handleChange(event) {
    let key = event.target.name;   // title, Amount, Type ...
    let value = event.target.value;
    obj[key] = value;
    obj.id = Math.random() * 100 + 1
}

// Show data in Html


function showdata() {
    let tablebody = document.getElementById('tbody');
    tablebody.innerHTML = '';
    let data = JSON.parse(localStorage.getItem('transaction')) || [];
    data.forEach(items => {
        tablebody.innerHTML += `
        <tr class="text-secondary">
        <td onclick="Model(${items.id})" scope="col" class="text-start"  data-bs-toggle="modal"
      data-bs-target="#mewModal">${items.title}</td>
        <td scope="col" class="text-start">${items.amount}</td>
        <td scope="col" class="text-start">${items.type}</td>
        <td scope="col" class="text-start">${items.Category}</td>
        <td scope="col" class="text-start">${items.date}</td>
        <td scope="col" class="text-start">${items.note}</td>
        <td scope="col" class="text-start">
        <svg onclick="edit(${items.id})" class="text-primary" data-bs-toggle="modal" data-bs-target="#EditBox"
              data-bs-whatever="@getbootstrap"   xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2L2 11.207V13h1.793L14 3.793 11.207 2zM15 1.5L13.5 0 12 1.5 13.5 3 15 1.5z"/>
</svg>
<svg onclick="deleteicon(${items.id})"  id"deleteicon" class="ms-3 text-danger" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm-1-1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1H4.5v-1z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a.5.5 0 0 1 .5-.5H5.5l.5-.5h4l.5.5h3.5a.5.5 0 0 1 .5.5v1zM4.118 4 4 14.5A1.5 1.5 0 0 0 5.5 16h5a1.5 1.5 0 0 0 1.5-1.5L11.882 4H4.118z"/>
</svg>
</td> </tr>
  
`
            ;
    });
}

// Edit Form..


// if (!item || !ele) return;
// if (item.type === 'Income') {
//     ele.value = item.type;
//     ele.classList.add('IncomeActive');
// } else {
//     ele.classList.remove('IncomeActive');
//     if (ele2) {
//         ele2.value = item.type;
//     }
// }

function edit(id) {
    let data = JSON.parse(localStorage.getItem("transaction")) || [];
    let item = data.find(obj => obj.id === id);
    // input fields me set karo
    document.getElementById("E-title").value = item.title;
    document.getElementById("E-amount").value = item.amount;
    document.getElementById("E-type1").value = item.amount;
    document.getElementById("E-type2").value = item.amount;
    document.getElementById("E-Category").value = item.Category;
    document.getElementById("E-date").value = item.date;
    document.getElementById("E-note").value = item.note;
    document.getElementById("id").value = item.id;
    console.log(item);
}

// Update Data...

function update() {
    let id = document.getElementById("id").value;
    console.log("id", id);
    let data = JSON.parse(localStorage.getItem("transaction")) || [];
    let item = data.find(obj => obj.id == id);
    console.log("item", item);
    item.title = document.getElementById("E-title").value;
    item.amount = document.getElementById('E-amount').value;
    item.type = document.getElementById('E-type1').value;
    item.type = document.getElementById('E-type2').value;
    item.Category = document.getElementById('E-Category').value;
    item.date = document.getElementById('E-date').value;
    item.note = document.getElementById('E-note').value;
    localStorage.setItem('transaction', JSON.stringify(data));
    // document.getElementById("E-title").value = '';
    // document.getElementById("E-amount").value = '';
    // document.getElementById("E-Category").value = '';
    // document.getElementById("E-date").value = '';
    // document.getElementById("E-note").value = '';
    showdata();
}

// Trasaction button

function transaction() {
    let data = JSON.parse(localStorage.getItem('transaction')) || [];
    data.push(obj);
    localStorage.setItem('transaction', JSON.stringify(data));
    showdata();
    // console.log(data);
    document.getElementById("title").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("Category").value = '';
    document.getElementById("date").value = '';
    document.getElementById("note").value = '';
    console.log(obj);
    Summary();
}

window.onload = function () {
    showdata();
};

// Delete id

function deleteicon(id) {
    let data = JSON.parse(localStorage.getItem('transaction')) || [];
    let updatedata = data.filter(item => item.id !== id);
    localStorage.setItem('transaction', JSON.stringify(updatedata));
    showdata();
}

// Display Income

function Summary() {
    let data = JSON.parse(localStorage.getItem('transaction')) || []
    let totalIncome = data.filter(item => item.type === 'Income')
        .reduce((RedNum, item) => RedNum + Number(item.amount), 0)

    // Total-Exprense

    let totalExpense = data.filter(item => item.type === 'Expense')
        .reduce((RedNum, item) => RedNum + Number(item.amount), 0)

    // Total-Exprense

    let NetBalance = totalIncome - totalExpense;

    // Display Code

    document.getElementById('T-Income').innerHTML = '$' + totalIncome.toFixed(2)
    document.getElementById('T-Expense').innerHTML = '$' + totalExpense.toFixed(2)
    document.getElementById('N-balance').innerHTML = '$' + NetBalance.toFixed(2)

}
Summary()


// Model...

function Model(id) {
    let data = JSON.parse(localStorage.getItem("transaction")) || [];
    let item = data.find(obj => obj.id === id);
    // input fields me set karo
    document.getElementById("S-title").value = item.title;
    document.getElementById("S-amount").value = item.amount;
    if (item.type === 'Income') {
        // document.getElementById("S-type1").value = item.type;
        document.getElementById('types').innerHTML =
            `<input class='bg-success btn text-light p-2 w-100'  name="type" type="button" value="Income"
            class=" text-center p-2  text-light border rounded " id="S-type1" readonly>`

    }
    else {
        document.getElementById('types').innerHTML =
            `<input  class='bg-danger btn text-light p-2 w-100'  name="type" type="button" value="Expense"
                class=" p-2 bg-danger text-light border rounded" id="S-type2" readonly>`

    }
    console.log(item.type);
    document.getElementById("S-Category").value = item.Category;
    document.getElementById("S-date").value = item.date;
    document.getElementById("S-note").value = item.note;
    document.getElementById("id").value = item.id;

}



function changetypes(selectedType) {
    let data = JSON.parse(localStorage.getItem('transaction')) || [];
    let tablebody = document.getElementById('tbody');
    tablebody.innerHTML = '';
    let Alldata = selectedType === 'All'
        ? data
        : data.filter(item => item.type.toLowerCase() === selectedType.toLowerCase());
    Alldata.forEach(items => {
        tablebody.innerHTML += `
        <tr class="text-secondary">
        <td onclick="Model(${items.id})" scope="col" class="text-start"  data-bs-toggle="modal"
      data-bs-target="#mewModal">${items.title}</td>
        <td scope="col" class="text-start">${items.amount}</td>
        <td scope="col" class="text-start">${items.type}</td>
        <td scope="col" class="text-start">${items.Category}</td>
        <td scope="col" class="text-start">${items.date}</td>
        <td scope="col" class="text-start">${items.note}</td>
        <td scope="col" class="text-start">
        <svg onclick="edit(${items.id})" class="text-primary" data-bs-toggle="modal" data-bs-target="#EditBox"
              data-bs-whatever="@getbootstrap"   xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2L2 11.207V13h1.793L14 3.793 11.207 2zM15 1.5L13.5 0 12 1.5 13.5 3 15 1.5z"/>
</svg>
<svg onclick="deleteicon(${items.id})"  id"deleteicon" class="ms-3 text-danger" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm-1-1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1H4.5v-1z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a.5.5 0 0 1 .5-.5H5.5l.5-.5h4l.5.5h3.5a.5.5 0 0 1 .5.5v1zM4.118 4 4 14.5A1.5 1.5 0 0 0 5.5 16h5a1.5 1.5 0 0 0 1.5-1.5L11.882 4H4.118z"/>
</svg>
</td> </tr>
  
`   ;
    });
}

function ChangeCategory(selectedType) {
    let data = JSON.parse(localStorage.getItem('transaction')) || [];
    let tablebody = document.getElementById('tbody');
    tablebody.innerHTML = '';
    let Alldata = selectedType === 'All'
        ? data
        : data.filter(item => item.Category.toLowerCase() === selectedType.toLowerCase());
    Alldata.forEach(items => {
        tablebody.innerHTML += `
        <tr class="text-secondary">
        <td onclick="Model(${items.id})" scope="col" class="text-start"  data-bs-toggle="modal"
      data-bs-target="#mewModal">${items.title}</td>
        <td scope="col" class="text-start">${items.amount}</td>
        <td scope="col" class="text-start">${items.type}</td>
        <td scope="col" class="text-start">${items.Category}</td>
        <td scope="col" class="text-start">${items.date}</td>
        <td scope="col" class="text-start">${items.note}</td>
        <td scope="col" class="text-start">
        <svg onclick="edit(${items.id})" class="text-primary" data-bs-toggle="modal" data-bs-target="#EditBox"
              data-bs-whatever="@getbootstrap"   xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2L2 11.207V13h1.793L14 3.793 11.207 2zM15 1.5L13.5 0 12 1.5 13.5 3 15 1.5z"/>
</svg>
<svg onclick="deleteicon(${items.id})"  id"deleteicon" class="ms-3 text-danger" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm-1-1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1H4.5v-1z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a.5.5 0 0 1 .5-.5H5.5l.5-.5h4l.5.5h3.5a.5.5 0 0 1 .5.5v1zM4.118 4 4 14.5A1.5 1.5 0 0 0 5.5 16h5a1.5 1.5 0 0 0 1.5-1.5L11.882 4H4.118z"/>
</svg>
</td> </tr>
  
`   ;
    });
}










