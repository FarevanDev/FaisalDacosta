//  COPYRIGHT (c) 2024, Faisal Dacosta & Farevan Dev, All rights reserved. 


// JavaScript for loading more and previous posts
document.addEventListener('DOMContentLoaded', function () {
    const posts = document.querySelectorAll('.blog-post');
    let currentPage = 1;
    const postsPerPage = 4;

    function showPosts(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        // Hide all posts first
        posts.forEach((post) => {
            post.classList.add('hidden');
        });

        // Show the current posts for this page
        posts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.classList.remove('hidden');
            }
        });

        // Show or hide navigation buttons based on page
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loadPreviousBtn = document.getElementById('loadPreviousBtn');

        // Show or hide "Load More" button
        if (page * postsPerPage >= posts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // Show or hide "Load Previous" button
        if (page === 1) {
            loadPreviousBtn.style.display = 'none';
        } else {
            loadPreviousBtn.style.display = 'block';
        }
    }

    // Event listener for the "Load More" button
    document.getElementById('loadMoreBtn').addEventListener('click', function (e) {
        e.preventDefault();
        currentPage++;
        showPosts(currentPage);

        // Scroll to the first post of the new page
        const firstNewPostIndex = (currentPage - 1) * postsPerPage;
        const firstNewPost = posts[firstNewPostIndex];
        if (firstNewPost) {
            firstNewPost.scrollIntoView({ behavior: 'smooth' });
        }

    });

    // Event listener for the "Load Previous" button
    document.getElementById('loadPreviousBtn').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            showPosts(currentPage);

            // Scroll to the first post of the previous page
            const firstNewPostIndex = (currentPage - 1) * postsPerPage;
            const firstNewPost = posts[firstNewPostIndex];
            if (firstNewPost) {
                firstNewPost.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Initial posts load
    showPosts(currentPage);

    // Function to toggle "Read More" and "Read Less"
    function toggleContent(event) {
        event.preventDefault();
        const fullContent = event.target.previousElementSibling;
        const summaryContent = fullContent.previousElementSibling;

        if (fullContent.style.display === 'block') {
            fullContent.style.display = 'none';
            summaryContent.style.display = 'block';
            event.target.textContent = 'Read More';
        } else {
            fullContent.style.display = 'block';
            summaryContent.style.display = 'none';
            event.target.textContent = 'Read Less';
        }
    }

    // Add event listeners to all "Read More/Read Less" links
    const toggleLinks = document.querySelectorAll('.toggle-content');
    toggleLinks.forEach(link => {
        link.addEventListener('click', toggleContent);
    });
});


