function rawErrorMessageToNormal(errorMsg) {
    const words = errorMsg.split('_');
    words.splice(0,1);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    
    return words.join(" ");
    
}

export {rawErrorMessageToNormal};