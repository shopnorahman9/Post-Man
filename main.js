console.log('This is a postMan application cloning.');
//Creating first utily function
// For geting the dom Element
function toGetString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addCounter = 0;
// Grabing the parametersBox
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
// if clicks the jsonBox hide parametersBox
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('jsonText').style.display = 'block'
    document.getElementById('parametersBox').style.display = 'none'
})
// if clicks the parametersBox hide jsonBox
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('jsonText').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})

// If clicks the "+" button add more parametersBox
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addCounter + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addCounter + 2}" placeholder="Enter Parameter ${addCounter + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addCounter + 2}" placeholder="Enter Parameter ${addCounter + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
</div>`;
let paramsElement = toGetString(string);
params.appendChild(paramsElement);
//Add a function to delete the params
let deleteParam = document.getElementsByClassName('deleteParam');
for (item of deleteParam) {
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove()
    })
}
addCounter ++;
})

// Write what will happen during submiting
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    let responseText = document.getElementById('code')
    // Show please wait in the responseBox to request patience from the user
    responseText.innerHTML = 'Please wait request is processing...'
    let data = {};
    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value
    
    // If user selects instead of json add parameters value to an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addCounter + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
    }
    console.log('URL is'+ " "+url);
    console.log('requestType is'+ " "+requestType);
    console.log('contentType is'+ " "+contentType);
    console.log('data is'+ " "+data);

    // if requestType is get invoke fetch api to take the request
    if (requestType == "GET") {
        fetch(url,{
            method: "GET"
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('code').innerHTML = text;
            Prism.highlightAll()
        })
    }
    else{
        fetch(url,{
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('code').innerHTML = text;
            Prism.highlightAll()
        })
    }
})