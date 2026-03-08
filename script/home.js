// global
//Assign all data after load json.data
let allData = 0;



const loadAllIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") //promise
        .then((res) => res.json())//promise
        .then((json) => {
            allData = json.data;
            displayAllIssue(allData);
        })


}
loadAllIssue();


const loadDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}` //promise
    const res = await fetch(url); //promise
    const details = await res.json();
    displayDetails(details.data);
}


const cardStatusMsg = (status) =>{
    if(status == "open")
    {
        return `<p class="btn btn-success cursor-default rounded-full py-1 px-2 text-white">opened</p>`
    }
    else return `<p class="btn bg-[#A855F7] cursor-default rounded-full py-1 px-2 text-white">closed</p>`
}
//

const displayDetails = (detail) => {
    const detailsbox = document.getElementById("details-container");
    //detailsbox.innerHTML = '';
    detailsbox.innerHTML = `
    <div id="" class="space-y-7">
        <h1 class="text-2xl selectedColor font-bold">${detail.title}</h1>
        <div class="flex items-center gap-3">
            ${cardStatusMsg(detail.status)}
            <p class="text-gray-600">${detail.status} by ${detail.author}</p>
            <p class="text-gray-600">${detail.updatedAt}</p>
        </div>
        <div class="flex gap-2 items-center ">
            <div class = "flex gap-2">
                ${cardLabel(detail.labels)}
            </div>
        </div>
        <p class="text-gray-600">${detail.description}</p>
        <div class="flex justify-between items-center p-4 bg-[#F8FAFC] rounded-lg">
            <div>
                <p class="text-gray-600">Assignee:</p>
                <p class="font-bold">${detail.author}</p>
            </div>
            <div>
                <p class="text-gray-600">Priority:</p>
                <div class="">
                    ${cardPriority(detail.priority)}
                </div>
            </div>
        </div>


    </div>
    `;
    document.getElementById("details_modal").showModal()

}

const cardPriority = (priority) => {

    if (priority == "high") {

        return `
                 <p class="text-red-500 bg-red-100 py-2 px-12 rounded-full font-semibold">${priority}</p>`;
    }
    else if (priority == "medium") {

        return `
                 <p class="text-[#D97706] bg-[#FDE68A95] py-2 px-12 rounded-full font-semibold">${priority}</p>`;
    }
    else {

        return `
                 <p class="text-[#D97706] bg-[#FDE68A95] py-2 px-12 rounded-full font-semibold">${priority}</p>`;
    }
}


const cardStatusIcon = (status) => {
    if (status == "open") {
        return `<img class="size-9" src="assets/Open-Status.png" alt="">`;
    }
    else return `<img class="size-9" src="assets/Closed- Status .png" alt="">`;
}

const cardLabel = (labels) => {
    return labels.map(label => {
        if (label == "bug") {
            return `
            <div
                class="flex items-center gap-2 text-red-500 bg-red-100 p-3 w-max rounded-full font-semibold border-3 border-red-200">
                <i class="fa-solid fa-bug"></i>
                <p>${label}</p>
            </div>
            `;
        }
        else if (label == "help wanted" || label == "documentation") {

            return `
            <div class="flex items-center   bg-[#FDE68A95]  w-max p-3 rounded-full font-semibold border-3 border-[#FDE68A]">
                <i class="fa-regular fa-life-ring text-[#D97706]"></i>
                <p class="text-[#D97706]">${label}</p>
            </div>
           `;
        }
        else {
            return `
            <div class="flex items-center   bg-[#BBF7D0]  w-max p-3 rounded-full font-semibold border-3 border-[#08e756]">
                <i class="fa-regular fa-star text-[#00A96E]"></i>
                <p class="text-[#00A96E]">${label}</p>
            </div>
           `;
        }

    }).join(" ");
}


const borderStatus = (Status) => {
    if (Status == "open") {
        return "border-green-500";
    }
    else {
        return "border-[#A855F7]";
    }
}


const RemoveAllActive = () => {
    const AllToggleBtn = document.querySelectorAll(".toggle-btn");
    AllToggleBtn.forEach(btn => {
        btn.classList.remove("active");
    })
}



const displayAllIssue = (Alldata) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = '';



    Alldata.forEach(data => {

        const card = document.createElement("div");
        card.innerHTML = `
        <div onclick="loadDetails(${data.id})" id="card-${data.id}" class="h-full min-w-64 space-y-4 shadow-xl rounded-lg border-t-4 ${borderStatus(data.status)} py-4">
                    <div id="card-priority" class="flex justify-between items-center gap-6 p-4 ">
                        ${cardStatusIcon(data.status)}
                        ${cardPriority(data.priority)}
                    </div>
                    <div class="px-5 space-y-2">
                        <h1 class="text-2xl selectedColor font-semibold">${data.title}</h1>
                        <p class="text-gray-600">${data.description}</p>
                    </div>
                    <div class="flex flex-wrap justify-start gap-3 px-5 py-3">
                        ${cardLabel(data.labels)}
                    </div>

                    <hr class="opacity-[30%]">
                    <div class=" px-5 pb-5 ">
                        <p class="text-[18px] text-gray-600 pb-2">#${data.id} by ${data.author}</p>
                        <p class="text-[18px] text-gray-600">${data.updatedAt}</p>
                    </div>

                </div>
                `
        cardContainer.appendChild(card);
    })

    //show total issues:
    const Total_issues = document.getElementById("issues");
    const total = Alldata.length;
    Total_issues.innerText = `${total} Issues`;

}


const toggleButton = (id) => {

    //Toggle button
    RemoveAllActive();
    const toggleBtn = document.getElementById(id);
    toggleBtn.classList.add("active");

}


document.getElementById("toggle-open").addEventListener("click", () => {

    //Filtering
    const filterCard = allData.filter(data => data.status == "open")
    //console.log(filterCard);
    displayAllIssue(filterCard);
})
document.getElementById("toggle-close").addEventListener("click", () => {

    //Filtering
    const filterCard = allData.filter(data => data.status == "closed")
    //console.log(filterCard);
    displayAllIssue(filterCard);
})
document.getElementById("toggle-all").addEventListener("click", () => {

    displayAllIssue(allData);
})




