
// Search Bar Functionality
   const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');
    const symptoms = document.querySelectorAll('.symptom');
    const noResults = document.getElementById('noResults');

    function highlightText(element, query) {
        const text = element.textContent;
        if (!query) {
            element.innerHTML = text; // reset
            return;
        }
        const regex = new RegExp(`(${query})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    }

    function filterSymptoms() {
        const searchText = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        let visibleCount = 0;

        symptoms.forEach(symptom => {
            const category = symptom.getAttribute('data-category');
            const categoryElement = symptom.querySelector('.category');
            const descriptionElement = symptom.querySelector('p');

            // Check if matches search and category
            const matchesSearch = 
                categoryElement.textContent.toLowerCase().includes(searchText) ||
                descriptionElement.textContent.toLowerCase().includes(searchText);

            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                symptom.style.display = '';
                highlightText(categoryElement, searchText);
                highlightText(descriptionElement, searchText);
                visibleCount++;
            } else {
                symptom.style.display = 'none';
                highlightText(categoryElement, '');
                highlightText(descriptionElement, '');
            }
        });

        // Show or hide "No results found" message
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Event listeners
    searchBar.addEventListener('keyup', filterSymptoms);
    categoryFilter.addEventListener('change', filterSymptoms);


// ----------------------
// FAQ Toggle Functionality
// ----------------------
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
});

