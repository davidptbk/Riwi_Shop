document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
})

function toggleFAQ(id) {
    const faqContent = document.getElementById(id);
    if (!faqContent.style.maxHeight || faqContent.style.maxHeight === "0px") {
        faqContent.style.maxHeight = faqContent.scrollHeight + "px";
        faqContent.style.opacity = "1";
        faqContent.style.padding = "20px"; 
    } else {
        faqContent.style.maxHeight = "0";
        faqContent.style.opacity = "0";
        faqContent.style.padding = "0 20px"; 
    }
}

//Selectores
const typeOfPqrs = document.getElementById("tipo-de-pqr")
const textareaContent = document.getElementById("faq-content")

typeOfPqrs.addEventListener('change', function() {
    let textoSeleccionado = this.options[this.selectedIndex].text;
    textareaContent.placeholder = `Dejanos el motivo de tus ${textoSeleccionado}`; 
});