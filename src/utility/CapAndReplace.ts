export const CapAndReplace = (inputText: string): string => {
    const regex = /[_-]/g;
    let str = inputText.replace(regex, " ");

    let newRegex = /^\w/;
    let capStr = str.replace(newRegex, letter => letter.toUpperCase());

    return capStr;
};
