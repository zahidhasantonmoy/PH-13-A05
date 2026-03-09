function toggleButton(value) {
    const allBtn = document.getElementById('all-btn');
    const openBtn = document.getElementById('open-btn');
    const closedBtn = document.getElementById('closed-btn');
    
    if (value === 'all-btn') {
        allBtn.classList.add('btn-primary');
        openBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
        
        displayIssues(allData);
        
    } else if (value === 'open-btn') {
        openBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
        
       
    } else if (value === 'closed-btn') {
        closedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        openBtn.classList.remove('btn-primary');
        
        
        }
        displayIssues(closedData);
    }



let allData = [];

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

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
            
            if (label === "bug") {
                labelClass = "bg-red-50 text-red-500 border-red-200";
            } else if (label === "help wanted") {
                labelClass = "bg-yellow-50 text-yellow-600 border-yellow-200";
            } else if (label === "enhancement") {
                labelClass = "bg-green-50 text-green-600 border-green-200";
            } else if (label === "documentation") {
                labelClass = "bg-blue-50 text-blue-600 border-blue-200";
            }
            
            labelsHTML = labelsHTML + `<span class="badge ${labelClass} font-bold p-3 capitalize border">${label}</span> `;
        }

        const cardHTML = `
        <div class="card bg-white shadow-md rounded-lg mb-4 border-t-4 ${borderColor}">
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