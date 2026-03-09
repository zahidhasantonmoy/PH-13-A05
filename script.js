function toggleButton(value) {
    const allBtn = document.getElementById('all-btn');
    const openBtn = document.getElementById('open-btn');
    const closedBtn = document.getElementById('closed-btn');
    
    document.getElementById('issues-container').innerHTML = '<div class="flex justify-center col-span-4 my-10"><span class="loading loading-bars loading-xl text-primary"></span></div>';

    if (value === 'all-btn') {
        allBtn.classList.add('btn-primary');
        openBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
        
        displayIssues(allData);
    } else if (value === 'open-btn') {
        openBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
        
        let openData = [];
        for (let item of allData) {
            if (item.status === 'open') {
                openData.push(item);
            }
        }
        displayIssues(openData);
    } else if (value === 'closed-btn') {
        closedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        openBtn.classList.remove('btn-primary');
        
        let closedData = [];
        for (let item of allData) {
            if (item.status === 'closed') {
                closedData.push(item);
            }
        }
        displayIssues(closedData);
    }
}




let allData = [];

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

document.getElementById('issues-container').innerHTML = '<div class="flex justify-center col-span-4 my-10"><span class="loading loading-bars loading-xl text-primary"></span></div>';

fetch(url)
    .then(response => response.json())
    .then(data => {
        allData = data.data;
        displayIssues(allData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



function displayIssues(issues) {
    const countElement = document.getElementById('total-issues-count');
    if (countElement) {
        countElement.innerText = issues.length + " Issues";
    }

    const container = document.getElementById('issues-container');
    container.innerHTML = '';

    for (let isshue of issues) {
        const formattedDate = new Date(isshue.createdAt).toLocaleDateString();
        
        let borderColor = "";
        let statusIcon = "";

        if (isshue.status === "open") {
            borderColor = "border-green-500";
            statusIcon = "./assets/Open-Status.png";
        } else {
            borderColor = "border-purple-500";
            statusIcon = "./assets/Closed- Status .png";
        }

        let priorityClass = "bg-gray-100 text-gray-500";

        if (isshue.priority === "high") {
            priorityClass = "bg-red-100 text-red-500";
        } else if (isshue.priority === "medium") {
            priorityClass = "bg-yellow-100 text-yellow-600";
        } else if (isshue.priority === "low") {
            priorityClass = "bg-gray-100 text-gray-700";
        }

         let labelsHTML = "";
           for (let label of isshue.labels) {
            let labelClass = "bg-gray-100 text-gray-700 border-gray-200";
            let icon = "";
            
            if (label === "bug") {
                labelClass = "bg-[#FECACA] text-[#EF4444] border-red-200 ";
                icon = '<i class="fa-solid fa-bug mr-1"></i> ';
            } else if (label === "help wanted") {
                labelClass = "bg-[#FDE68A] text-[#D97706] border-yellow-200";
                icon = '<i class="fa-solid fa-life-ring mr-1"></i> ';
            } else if (label === "enhancement") {
                labelClass = "bg-[#BBF7D0] text-[#00A96E] border-green-200";
                icon = '<i class="fa-solid fa-rocket mr-1"></i> ';
            } else if (label === "documentation") {
                labelClass = "bg-[#FDE68A] text-[#D97706] border-blue-200";
                icon = '<i class="fa-solid fa-file-lines mr-1"></i> ';
            } else if (label === "good first issue") {
                labelClass = "bg-purple-100 text-purple-700 border-purple-200";
                icon = '<i class="fa-solid fa-thumbs-up mr-1"></i> ';
            } else {
                labelClass = "bg-blue-100 text-blue-700 border-gray-200";
            }
            
            labelsHTML = labelsHTML + `<span class="badge ${labelClass} font-bold p-3 capitalize border">${icon}${label}</span> `;
        }

        const cardHTML = `
        <div onclick="openModal(${isshue.id})" class="card bg-white shadow-md rounded-lg mb-4 border-t-4 ${borderColor} cursor-pointer">
            <div class="card-body p-5">
              
              <div class="flex justify-between items-center mb-2">
               <img src="${statusIcon}" alt="status">
                <span class="badge ${priorityClass} font-bold border-none px-3 py-3 capitalize">
                    ${isshue.priority}
                </span>
              </div>
              
              <h2 class="card-title text-[16px] leading-tight">${isshue.title}</h2>
              <p class="text-gray-500 text-sm mt-2">${isshue.description}</p>
              
              <div class="flex gap-2 mt-4 flex-wrap">
                 ${labelsHTML}
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 border-t border-gray-100 text-sm text-gray-500 rounded-b-lg">
              <p>#${isshue.id} by ${isshue.author}</p>
              <p>${formattedDate}</p>
            </div>
        </div>
        `;

        container.innerHTML = container.innerHTML + cardHTML;
    }
}

toggleButton('all-btn');


function searchIssues(searchText) {
    if (searchText === "") {
        displayIssues(allData);
        return;
    }

    const searchUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=" + searchText;
    
    document.getElementById('issues-container').innerHTML = '<div class="flex justify-center col-span-4 my-10"><span class="loading loading-bars loading-xl text-primary"></span></div>';

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displayIssues(data.data);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}


function openModal(id) {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issue/" + id;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let isshue = data.data;
            let formattedDate = new Date(isshue.createdAt).toLocaleDateString();

            let labelsHTML = "";
            for (let label of isshue.labels) {
                labelsHTML = labelsHTML + `<div class="badge badge-outline p-3 font-bold mr-2 uppercase">${label}</div>`;
            }

            let assigneeName = isshue.assignee;
            if (assigneeName === "") {
                assigneeName = "Not Assigned";
            }

            let modalBox = document.querySelector('#my_modal_5 .modal-box');
            
            modalBox.innerHTML = `
                <h3 class="text-2xl font-bold text-black">${isshue.title}</h3>
                
                <div class="mt-2 mb-4">
                  <div class="badge badge-success text-white font-bold p-3 uppercase">${isshue.status}</div>
                  <span class="text-gray-500 ml-2"> • Opened by ${isshue.author} • ${formattedDate}</span>
                </div>

                <div class="mb-6">
                  ${labelsHTML}
                </div>

                <p class="text-gray-500 text-lg mb-4">
                  ${isshue.description}
                </p>

                <div class="bg-gray-100 p-4 rounded-xl flex justify-between mt-6">
                  <div>
                    <p class="text-gray-500 text-sm">Assignee:</p>
                    <p class="font-bold text-black text-xl">${assigneeName}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-gray-500 text-sm">Priority:</p>
                    <div class="badge bg-red-500 text-white font-bold border-none p-3 uppercase">${isshue.priority}</div>
                  </div>
                </div>

                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn bg-purple-600 hover:bg-purple-700 text-white border-none w-24">Close</button>
                  </form>
                </div>
            `;
            
            document.getElementById('my_modal_5').showModal();
        })
        
}