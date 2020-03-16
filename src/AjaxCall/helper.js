 //  this method use to request Server API  call
 // it accept API url , body and method as parameters
 export const Http = (url,headers=null,body={},method = 'GET') => {
    let options = {
        method : method,
    }
    if(method == 'POST'){
        options.body = JSON.stringify(body)
    }
      if(headers){
        options.headers =headers;
      }
      
    return new  Promise((resolve,reject) => {
        return fetch(url,options)
                .then(res => res.json())
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
    })
}