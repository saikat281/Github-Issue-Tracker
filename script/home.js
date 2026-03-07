const loadAllIssue = () =>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") //promise
    .then((res) => res.json())//promise
    .then((json) => displayAllIssue(json.data));
}
loadAllIssue();

const displayAllIssue = (Alldata) =>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = '';

    Alldata.forEach(data=>{
        const card = document.createElement("div");
        card.innerHTML = `
        <div id="card" class="space-y-4 shadow-xl rounded-lg border-t-4 border-green-500 py-4">
                    <div class="flex justify-between items-center gap-6 p-4 ">
                        <img class="size-9" src="assets/Open-Status.png" alt="">
                        <p class="text-red-500 bg-red-100 py-2 px-12 rounded-full font-semibold">HIGH</p>
                    </div>
                    <div class="px-5 space-y-2">
                        <h1 class="text-2xl selectedColor font-semibold">Fix navigation menu on mobile devices</h1>
                        <p class="text-gray-600">The navigation menu doesn't collapse properly on mobile devices...</p>
                    </div>
                    <div class="flex gap-2 px-5 py-3">
                        <div
                            class="flex items-center gap-2 text-red-500 bg-red-100 py-2 px-7 w-max rounded-full font-semibold border-3 border-red-200">
                            <i class="fa-solid fa-bug"></i>
                            <p>BUG</p>
                        </div>
                        <div class="flex items-center   bg-[#FDE68A95]  w-max p-3 rounded-full font-semibold border-3 border-[#FDE68A]">
                            <i class="fa-regular fa-life-ring text-[#D97706]"></i>
                            <p class="text-[#D97706]">HELP WANTED</p>
                        </div>
                    </div>

                    <hr class="opacity-[30%]">
                    <div class=" px-5 pb-5 ">
                        <p class="text-[18px] text-gray-600 pb-2">#1 by john_doe</p>
                        <p class="text-[18px] text-gray-600">1/15/2024</p>
                    </div>

                </div>`
                cardContainer.appendChild(card);
    })

}