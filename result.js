const table = document.getElementById("results")

const results = JSON.parse(localStorage.getItem("results"))

const minTime = Math.min(...results.map(result => result.time));

results.forEach(i => {
    const tr = document.createElement("tr")
    const tdId = document.createElement("td")
    tdId.textContent = i.id
    const tdTime = document.createElement("td")
    tdTime.textContent = i.time
    tr.append(tdId)
    tr.append(tdTime)

    if(i.time == minTime) {
        tr.className = "bg-lime"
    }

    table.append(tr)
})
