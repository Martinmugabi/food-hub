document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling; // Get the next element (faq-answer)
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block'; // Show the answer
            } else {
                answer.style.display = 'none'; // Hide the answer
            }
        });
    });
});