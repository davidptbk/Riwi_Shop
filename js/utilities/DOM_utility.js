export function cleanInformation(tag) {
    tag.innerHTML = ` `;
  }

export function setLocal(name, obj){
    localStorage.setItem(name, JSON.stringify(obj))
}

export function getLocal(name){
    const data = localStorage.getItem(name);
    return JSON.parse(data)
}

