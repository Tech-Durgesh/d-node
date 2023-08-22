const sendResponse = (status=true, code=null, data=null, message=null) => {
    let response = {
        status: status,
        code: code,
        data: data,
        message: message,
    }

    return response;
}

module.exports = sendResponse;