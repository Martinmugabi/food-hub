/* javascript for the cafe website */
document.addEventListener("DOMContentLoaded", function() {
    const footerBtn = document.querySelector(".footer-btn");
    footerBtn.addEventListener("click", function() {
        alert("Thank you for your interest! We will get in touch with you soon.");
    });
});


document.getElementById("offer").addEventListener("click", function() {
    alert("Thank you for your interest in our special offer! We will contact you soon.");
});