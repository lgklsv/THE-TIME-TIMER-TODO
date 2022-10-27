export const formatFromCamel = function(name) {
    let formatedName = name.replace(/([A-Z])/g, ' $1');
    formatedName = formatedName.toLowerCase();
    formatedName = formatedName[0].toUpperCase() + formatedName.slice(1);
    return formatedName;
}