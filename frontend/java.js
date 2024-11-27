// import  Convert from 'xml-js';

// const Convert = require('xml-js');
document.getElementById('fetch-data').addEventListener('click', function() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = '<h2>Fetched Data:</h2>';
            data.forEach(user=>{
                dataDiv.innerHTML+=`
                <p>Id:  ${user.id}</p>
                <p>FirstName:  ${user.firstName}</p>
                <p>LastName: ${user.lastName}</p>
                <p>Age : ${user.age}</p>
                `;
            })
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

document.getElementById('post-data').addEventListener('click', () =>{
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;


    const user = {firstName, lastName, age};

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.text())
    .then(data =>{
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML+=`<p>${data}</p>`;
    })
       .catch(error => {
            console.error('Error posting data:', error);
        });
})

document.getElementById('delete-data').addEventListener('click', () =>{
    const Id = document.getElementById('deleteId').value;
    fetch(`/users/${Id}`,{
        method: 'DELETE',
    })
    .then(response => response.text())
    .then(data =>{
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML+=`<p>${data}</p>`;
    })
});



document.getElementById('get-json').addEventListener('click', () => {
     fetch('/users')
    .then((response) =>response.json())
    .then(data => {
        displayResult(JSON.stringify(data,null,2),'json');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

document.getElementById('get-html').addEventListener('click', () => {
    fetch('/users')
    .then(response=>response.text())
    .then(data => {
        displayResult(data,'html');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

});


document.getElementById('get-xml').addEventListener('click', () => {
    fetch('/users/get')
    .then((response) => response.text()) // Ensure you're parsing as JSON first
    .then(data => {
        displayResult(data, 'xml');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


const displayResult =(data,format)=> {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 
    
    if(format === 'json'){
        const pre = document.createElement('pre');
        pre.textContent = data;
        outputDiv.appendChild(pre);
    }
    else if(format === 'html'){
        const pre = document.createElement('pre');
        outputDiv.innerHTML = data;
        outputDiv.appendChild(pre);
    }
    else if(format === 'xml'){
        const pre = document.createElement('pre');
        pre.textContent = data;
        outputDiv.appendChild(pre);
    }
}




































// document.getElementById('get-xml').addEventListener('click', () => {
//     fetchData('xml');
// });


// function fetchData(){
//     fetch('/users')
//     .then((response) =>{
//         if(!response.ok){
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         if(format ==='json'){
//             return response.json();
//         } else {
//             return response.text();
//         }
//     })
//     .then(data => {
//                     const outputDiv = document.getElementById('output');
//                     outputDiv.innerHTML = ''; // Clear previous output
//                     if (format === 'json') {
//                         outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//                     } else {
//                         outputDiv.innerHTML = data; // Directly insert HTML or XML
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching data:', error);
//                 });
// }