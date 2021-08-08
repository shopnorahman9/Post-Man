console.log('Bismillah.This is post man re-coding');
// Add counter was created as an element counter
let addCounter = 0;
// Creating an utility function for repliciting by clicking "+" button
function toGetString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('jsonText').style.display = 'block'
    document.getElementById('parametersBox').style.display = 'none'

})
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'block'
    document.getElementById('jsonText').style.display = 'none'

})
// By clicking "+" button the element will be replicated
let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params')
    let string = `<div id="parametersBox">
    <div class="form-row my-2">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${addCounter +2}</label>
        <div class="col-md-4">
            <input type="text" class="form-control" id="parameterKey${addCounter +2}" placeholder="Enter Parameter ${addCounter +2} Key">
        </div>
        <div class="col-md-4">
            <input type="text" class="form-control" id="parameterValue${addCounter +2}" placeholder="Enter Parameter ${addCounter +2} Value">
        </div>
        <button class="deleteParam btn btn-primary">-</button>
    </div>
    <div id="params"></div>
</div>`
    let paramsElement = toGetString(string);
    params.appendChild(paramsElement);
    addCounter ++;
    // Writing an event listener for deleting the parametersBox
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove()
        })
    }
});

// Doing all the important work.Adding event on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    let responseText = document.getElementById('code');
    // Showing please wait for geting patience from the user
    responseText.innerHTML = 'Please wait request is proccesing'
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i <addCounter; i++) {
    if(document.getElementById('parameterKey'+(i+1))!=undefined){
        let key = document.getElementById('parameterKey'+(i+1)).value
        let value = document.getElementById('parameterValue'+(i+1)).value
        data = key[value];
    }            
        }
        data = JSON.stringify(data)
    }
    else{
        data = document.getElementById('jsonText').value
    }
    console.log('URL is' , url);
    console.log('requestType is' , requestType);
    console.log('contentType is' , contentType);
    console.log('data is' , data);
    if (requestType == "GET") {
        fetch(url,{
        method : "GET"
        })
        .then(response=>(response.text()))
        .then((text)=>{
            responseText.innerHTML = text;
            Prism.highlightAll()
        })
    }
    else{
        fetch(url,{
            method:"GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=>(response.text()))
        .then((text)=>{
            responseText.innerHTML = text;
            Prism.highlightAll()
        })
    }
})