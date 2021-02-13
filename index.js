const request = require('request')

const PrePaidForge = {}

PrePaidForge.apiToken = "";
PrePaidForge.tokenValidUntil = 0;

PrePaidForge.signInWithApi = async (email,password) => {
    return new Promise(async (resolve, reject) => {
        request({
            method: "POST",
            uri: "https://api.prepaidforge.com/v1/1.0/signInWithApi",
            headers: {
                'Content-Type': "application/json"
            },
            json: {
                "email": email,
                "password": password
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }

            PrePaidForge.email = email;
            PrePaidForge.password = password;

            if(PrePaidForge.apiToken != body.apiToken) {
                console.log("PrePaid Forge API: New Token "+PrePaidForge.apiToken)
            }
            
            PrePaidForge.apiToken = body.apiToken
            PrePaidForge.tokenValidUntil = body.tokenValidUntil - 30000;

            
            resolve(body);
        });
    })
};

PrePaidForge.findAllProducts = async () => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        request({
            method: "GET",
            uri: "https://api.prepaidforge.com/v1/1.0/findAllProducts",
            headers: {
                'Content-Type': "application/json"
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }
            resolve(body);
        });
    });
};

PrePaidForge.findStocks = async (types,skus) => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        if(PrePaidForge.apiToken == "" || PrePaidForge.tokenValidUntil < new Date().getTime()) {
            reject("API Token invalid.");
        }
        request({
            method: "POST",
            uri: "https://api.prepaidforge.com/v1/1.0/findStocks",
            headers: {
                'Content-Type': "application/json",
                "X-PrepaidForge-Api-Token": PrePaidForge.apiToken
            },
            json: {
                "types": types,
                "skus": skus
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }
            resolve(body);
        });
    });
    
};

PrePaidForge.createOrder = async (sku, price, codeType, customOrderReference) => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        if(PrePaidForge.apiToken == "" || PrePaidForge.tokenValidUntil < new Date().getTime()) {
            reject("API Token invalid.");
        }
        request({
            method: "POST",
            uri: "https://api.prepaidforge.com/v1/1.0/createApiOrder",
            headers: {
                'Content-Type': "application/json",
                "X-PrepaidForge-Api-Token": PrePaidForge.apiToken
            },
            json: {
                "sku": sku,
                "price": price,
                "codeType": codeType,
                "customOrderReference": customOrderReference
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }
            resolve(body);
        });
    });
};

PrePaidForge.getOrders = async (page, startDate, endDate)  => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        if(PrePaidForge.apiToken == "" || PrePaidForge.tokenValidUntil < new Date().getTime()) {
            return reject("API Token invalid.");
        }
        request({
            method: "POST",
            uri: "https://api.prepaidforge.com/v1/1.0/getApiOrders",
            headers: {
                'Content-Type': "application/json",
                "X-PrepaidForge-Api-Token": PrePaidForge.apiToken
            },
            json: {
                "page": page,
                "startDate": startDate,
                "endDate": endDate
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                return reject(body);
            }
            return resolve(body);
        });
    });
    
};

PrePaidForge.getOrder = async (customOrderReference) => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        if(PrePaidForge.apiToken == "" || PrePaidForge.tokenValidUntil < new Date().getTime()) {
            reject("API Token invalid.");
        }
        request({
            method: "POST",
            uri: "https://api.prepaidforge.com/v1/1.0/getResponseOfSingleApiCodeRequest",
            headers: {
                'Content-Type': "application/json",
                "X-PrepaidForge-Api-Token": PrePaidForge.apiToken
            },
            json: {
                "customOrderReference": customOrderReference
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }
            resolve(body);
        });
    });
}

PrePaidForge.getBalance = async () => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        if(PrePaidForge.apiToken == "" || PrePaidForge.tokenValidUntil < new Date().getTime()) {
            reject("API Token invalid.");
        }
        request({
            method: "GET",
            uri: "https://api.prepaidforge.com/v1/1.0/balance",
            headers: {
                'Content-Type': "application/json",
                "X-PrepaidForge-Api-Token": PrePaidForge.apiToken
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }
            resolve(body);
        });
    });
    
}

PrePaidForge.getInvoice = async (invoiceId) => {
    while(PrePaidForge.tokenValidUntil < new Date().getTime()) {
        await PrePaidForge.signInWithApi(PrePaidForge.email,PrePaidForge.password).catch(err => {
            return Promise.reject(err);
        })
    }
    return new Promise((resolve, reject) => {
        if(PrePaidForge.apiToken == "" || PrePaidForge.tokenValidUntil < new Date().getTime()) {
            reject("API Token invalid.");
        }
        request({
            method: "GET",
            uri: "https://api.prepaidforge.com/v1/1.0/getInvoice/"+invoiceId,
            headers: {
                'Content-Type': "application/json",
                "X-PrepaidForge-Api-Token": PrePaidForge.apiToken
            }
        }, (error, response, body) => {
            if(error || response.statusCode !== 200) {
                if(error) {
                    console.error(error);
                }
                reject(body);
            }
            resolve(body);
        });
    });
}

module.exports = PrePaidForge