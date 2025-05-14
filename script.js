let saved=[]

const inEl=document.getElementById("in-el")
const inBtn=document.getElementById("in-btn")
const ulEl=document.getElementById("ul-el")
const delBtn=document.getElementById("del-btn")
const tabBtn = document.getElementById("sve-tab-btn")

const loaclLeads=JSON.parse(localStorage.getItem("myLeads"))

if(loaclLeads){
    saved=loaclLeads
    render(saved)
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        saved.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(saved) )
        render(saved)
    })
})


function render(Leads){
    let list=""
    for (let i = 0; i < Leads.length; i++) {
        list+= `
            <li>
                <a target='_blank' href='${Leads[i]}'>${Leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML=list
}

delBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    saved=[]
    render(saved)
})
inBtn.addEventListener("click",function(){
    handle()
})

inEl.addEventListener("keydown",function(event){
    if(event.key==='Enter')
        handle()
})

function handle(){
    saved.push(inEl.value)
    inEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(saved))
    render(saved)
}