
  // Wait for the entire HTML document to load before running scripts
document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------------------
    // Search Bar + Category Filter Functionality (Symptoms)
    // ----------------------------------------------------

    // Get references to search bar, category dropdown, symptom items, and "no results" message
    const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');
    const symptoms = document.querySelectorAll('.symptom');
    const noResults = document.getElementById('noResults');

    /**
     * Highlights matching text inside an element using <mark>.
     * If no query is provided, the text resets to its original state.
     */
    function highlightText(element, query) {
        const text = element.textContent;

        // If search box is empty, remove highlights
        if (!query) {
            element.innerHTML = text;
            return;
        }

        // Create a case‑insensitive regex to wrap matches in <mark>
        const regex = new RegExp(`(${query})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Filters symptoms based on search text and selected category.
     * Shows only matching items and displays a "no results" message when needed.
     */
    function filterSymptoms() {
        const searchText = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        let visibleCount = 0;

        symptoms.forEach(symptom => {
            const category = symptom.getAttribute('data-category');
            const categoryElement = symptom.querySelector('.category');
            const descriptionElement = symptom.querySelector('p');

            // Check if search text appears in category or description
            const matchesSearch =
                categoryElement.textContent.toLowerCase().includes(searchText) ||
                descriptionElement.textContent.toLowerCase().includes(searchText);

            // Check if selected category matches or if "all" is selected
            const matchesCategory =
                selectedCategory === 'all' || category === selectedCategory;

            // Show or hide symptom based on filters
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

        // Display "No results found" if nothing matches
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Attach event listeners only if elements exist
    if (searchBar) searchBar.addEventListener('keyup', filterSymptoms);
    if (categoryFilter) categoryFilter.addEventListener('change', filterSymptoms);


    // ---------------------------------------
    // Mobile Hamburger Menu Toggle
    // ---------------------------------------

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Toggle navigation visibility on mobile when hamburger is clicked
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }


    // ---------------------------------------
    // FAQ Expand/Collapse Functionality
    // ---------------------------------------

    // Add click event to each FAQ question to show/hide its answer
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            // Toggle between showing and hiding the answer
            answer.style.display =
                (answer.style.display === 'block') ? 'none' : 'block';
        });
    });

});
