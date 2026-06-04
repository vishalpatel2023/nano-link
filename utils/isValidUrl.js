
function isValidUrl(input){
    let updatedUrl = input;

    //if it do not have htttp: or https: add it
    if((!updatedUrl.startsWith('https://')) && (!updatedUrl.startsWith('http://'))){
        updatedUrl = 'https://'+updatedUrl;
        console.log("Something added+ ",updatedUrl);
    }

    try{

        const parsedUrl = new URL(updatedUrl); //node.js builtin url constructor

        if(!parsedUrl.hostname.includes('.')){
            return null;
        }

        return updatedUrl; //update url
    }catch(err){
        console.log("Some error occured while parsing the url\n");
        return null;
    }
}

module.exports = {isValidUrl};
