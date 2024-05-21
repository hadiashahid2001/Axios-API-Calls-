// Axios Global
axios.defaults.headers.common['X-Auth-Token'] = 'someToken';

// get Data
function getTodos(res1){
    /*axios({
        method: 'get',
        url: "https://jsonplaceholder.typicode.com/todos",
        params: {
            _limit : 5
        }
    }).then( res => showOutput(res))
    .catch( err => console.error(err));
    console.log("Get Request");*/
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5", {timeout : 50000})
    .then( res => showOutput(res, res1))
    .catch( err => console.error(err.message));
}

// Post Data
function addTodo(targetId2){
    /*axios({
        method : "post",
        url : "https://jsonplaceholder.typicode.com/todos",
        data : {
            title : 'New Todo',
            completed : false,
        }
    }).then( res => showOutput(res))
    .catch( err => console.log(err));*/

    axios.post("https://jsonplaceholder.typicode.com/todos?_limit=5", {
        title : 'New Todo',
        completed : false,
    }).then( res => showOutput(res, targetId2))
    .catch( err => console.error(err));

    console.log("Add Request");
}

// Update Data
function updateTodo(targetId){
    axios.put("https://jsonplaceholder.typicode.com/todos/1",{
        title : 'New Todo',
        completed : false,
    }).then( res => showOutput(res , targetId))
    .catch( err => console.error(err));
    console.log("Put/Patch Request");
    axios.patch("https://jsonplaceholder.typicode.com/todos/2",{
        title : 'New Todo',
        completed : false,
    }).then( res => showOutput(res))
    .catch( err => console.error(err));
}

// Delete Data
function deleteTodo(targetId){
    axios.delete("https://jsonplaceholder.typicode.com/todos/3")
    .then( res => showOutput(res , targetId))
    .catch( err => console.error(err));
    console.log("Delete Request");
}

// Simultaneous Data
function getData(targetId){
    axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
    ]).then( axios.spread( (todos, posts) => showOutput(posts , targetId))
        /*res => {
        console.log(res[0]);
        console.log(res[1]);
        showOutput(res[0])
    } No*/   ).catch( err => console.error(err));

    console.log("Simultaneuos Request");
}

// Header Data
function customHeaders(targetId){
    const config = {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'sometoken'
        }
    };
    axios.post("https://jsonplaceholder.typicode.com/todos", {
        title : "New Todo",
        completed: false,
    }, config )
    .then( res => showOutput(res , targetId))
    .catch( err => console.log(err))
    console.log("Custom Headers");
}

// Transform Data
function transformResponse(targetId){
    const options = {
        method : 'post',
        url : "https://jsonplaceholder.typicode.com/todos",
        data : {
            title : "New Todo",
            completed: false,
        },
        transformResponse : axios.defaults.transformResponse.concat( data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };

    axios(options).then( res => showOutput(res , targetId))
    .catch( err => console.error(err));

    console.log("Transform Response");
}

// Error Handling
function errorHandling(targetId){
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
        validateStatus : function(status) {
            return status < 500; // reject only if status is greater or equal to 500
        }
    })
    .then( res => showOutput(res , targetId))
    .catch( err => {
        if(err.response){
            //Server responded with a status other than 200 range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if(err.response.status === 404){
                alert("Error : Page not Found")
            }
        } else if (err.request) {
            // Request was made but no response
            console.log(err.request);
        } else {
            console.error(err.message);
        }
    });
    console.log("Error Handling");
}

// Cancel Data
function cancelToken(targetId){
    const source = axios.CancelToken.source();

    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
        cancelToken : source.token
    })
    .then( res => showOutput(res , targetId))
    .catch( thrown => {
        if(axios.isCancel(thrown)){
            console.log("Request Canceled", thrown.message);
        }
    });
    if(true) {
        source.cancel("Request is Canceled");
    }
    console.log("Cancel Request");
    
}

// Interceptor request and response
// we can make interceptor which takes a function with parameter 'config' present in our data
axios.interceptors.request.use( config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

    return config
    // if an error so we can put another parameter for error message

} , error => {
    return Promise.reject(error);
});

// Axios Instance
const axiosInstance = axios.create( {
    baseURL : "https://jsonplaceholder.typicode.com/todos?_limit=5"
});

axiosInstance.get('/comments').then( res => showOutput(res));

// Output in Browser

function showOutput( res , targetId ) {
    let ele = document.getElementById(targetId);
    if(ele){
        ele.innerHTML = `
    <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
    `;
    }
    
}

let res1 = document.getElementById('res1')

// Event Listeners for Data
document.getElementById('get').addEventListener('click', e => {
    const targetId1 = e.target.getAttribute('data-target');
    getTodos(targetId1)
;});
document.getElementById('post').addEventListener('click', e => {
    const targetId2 = e.target.getAttribute('data-target');
    addTodo(targetId2)
});
document.getElementById('update').addEventListener('click', e => {
    const targetId3 = e.target.getAttribute('data-target');
    updateTodo(targetId3)
});
document.getElementById('delete').addEventListener('click', e => {
    const targetId4 = e.target.getAttribute('data-target');
    deleteTodo(targetId4)
});
document.getElementById('sim').addEventListener('click', e => {
    const targetId5 = e.target.getAttribute('data-target');
    getData(targetId5)
});
document.getElementById('headers').addEventListener('click', e => {
    const targetId6 = e.target.getAttribute('data-target');
    customHeaders(targetId6)
});
document.getElementById('transform').addEventListener('click', e => {
    const targetId7 = e.target.getAttribute('data-target');
    transformResponse(targetId7)
});
document.getElementById('error').addEventListener('click', e => {
    const targetId8 = e.target.getAttribute('data-target');
    errorHandling(targetId8)
});
document.getElementById('cancel').addEventListener('click', e => {
    const targetId9 = e.target.getAttribute('data-target');
    cancelToken(targetId9)
});