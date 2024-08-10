document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.querySelector(".hero");
    const uploadBtn = document.querySelector(".upload-btn");
    let uploadedImagesCount = 0;
    const maxImages = 10;

    function addImageToGallery(imageUrl) {
        const galleryContainer = document.querySelector(".gallery-container");
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        const img = document.createElement("img");
        img.src = imageUrl;
        galleryItem.appendChild(img);

        // Add process button
        const processBtn = document.createElement('button');
        processBtn.className = 'process-btn';
        processBtn.textContent = 'Process Image';
        processBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50px" height="50px">
                <circle cx="50" cy="50" r="35" stroke-width="10" fill="none" stroke-linecap="round">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 50 50"
                      to="360 50 50"
                      dur="1s"
                      repeatCount="indefinite" />
                    <animate 
                      attributeName="stroke" 
                      values="#ff0000; #00ff00; #0000ff; #ff0000" 
                      dur="3s" 
                      repeatCount="indefinite" />
                </circle>
            </svg>
            Process Image
        `;
        processBtn.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 15px 30px;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            text-transform: uppercase;
            color: #fff;
            background: #00665c;
            transition: background 0.3s, color 0.3s;
            outline: none;
            margin-top: 20px;
            border-radius: 5px;
        `;
        processBtn.addEventListener('click', () => startProcessing(galleryItem));
        galleryItem.appendChild(processBtn);

        galleryContainer.appendChild(galleryItem);
    }

    function startProcessing(galleryItem) {
        const img = galleryItem.querySelector('img');
        const processBtn = galleryItem.querySelector('.process-btn');
        heroSection.querySelector("p").textContent = "Processing started...";

        // Disable process button during processing
        processBtn.disabled = true;
        processBtn.textContent = 'Processing...';

        // Simulate processing for 5 seconds
        setTimeout(() => {
            img.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            heroSection.querySelector("p").textContent = "Image Processing Successful";
            addDownloadButton(galleryItem);
            processBtn.remove(); // Remove process button after processing
        }, 5000);
    }

    function addDownloadButton(galleryItem) {
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download
        `;
        downloadBtn.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 15px 30px;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            text-transform: uppercase;
            color: #fff;
            background: #00665c;
            transition: background 0.3s, color 0.3s;
            outline: none;
            margin-top: 20px;
            border-radius: 5px;
        `;
        downloadBtn.addEventListener('click', () => downloadImage(galleryItem.querySelector('img')));
        galleryItem.appendChild(downloadBtn);
    }

    function downloadImage(img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = `processed_image_${Date.now()}.jpg`;
        link.click();
        addToDownloadsPage(img.src, link.download);
    }

    let downloads = JSON.parse(localStorage.getItem('downloads')) || []; // Initialize from localStorage

    function addToDownloadsPage(imageUrl, fileName) {
        downloads.push({ url: imageUrl, name: fileName });
        localStorage.setItem('downloads', JSON.stringify(downloads)); // Store downloads in localStorage
        updateDownloadsPage();
    }

    function updateDownloadsPage() {
        const downloadsContainer = document.querySelector(".downloads-container");
        if (!downloadsContainer) return;

        downloadsContainer.innerHTML = '';
        const storedDownloads = JSON.parse(localStorage.getItem('downloads')) || [];
        storedDownloads.forEach(download => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
            const img = document.createElement('img');
            img.src = download.url;
            img.alt = download.name;
            img.style.width = '100px';
            const name = document.createElement('p');
            name.textContent = download.name;
            downloadItem.appendChild(img);
            downloadItem.appendChild(name);
            downloadsContainer.appendChild(downloadItem);
        });
    }

    uploadBtn.addEventListener("click", function () {
        if (uploadedImagesCount >= maxImages) {
            alert("You can upload up to 10 images only.");
            return;
        }

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.onchange = function () {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    addImageToGallery(e.target.result);
                    uploadedImagesCount++;
                    alert("Image uploaded successfully!");
                };
                reader.readAsDataURL(file);
            }
        };

        fileInput.click();
    });

    // Navigation buttons
    const homeBtn = document.querySelector(".home-btn");
    const profileBtn = document.querySelector(".profile-btn");
    const shareBtn = document.querySelector(".share-btn");
    const downloadsBtn = document.querySelector(".downloads-btn"); // New Downloads button
    const navMenuDownloadsBtn = document.querySelector(".nav-menu-downloads-btn"); // New Nav menu Downloads button

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "#home";
        });
    }

    if (profileBtn) {
        profileBtn.addEventListener("click", function () {
            alert("Showing profile information.");
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener("click", function () {
            sharePopup.style.display = "block";
        });
    }

    const sharePopup = document.querySelector(".share-popup");
    const closePopupBtn = document.querySelector(".close-popup");

    if (sharePopup && closePopupBtn) {
        closePopupBtn.addEventListener("click", function () {
            sharePopup.style.display = "none";
        });
    }

    if (downloadsBtn) {
        downloadsBtn.addEventListener("click", function () {
            window.location.href = "downloads.html"; // Redirect to downloads page
        });
    }

    if (navMenuDownloadsBtn) {
        navMenuDownloadsBtn.addEventListener("click", function () {
            window.location.href = "downloads.html"; // Redirect to downloads page
        });
    }

    // Footer buttons
    const footerHomeBtn = document.querySelector(".footer-home-btn");
    const footerProfileBtn = document.querySelector(".footer-profile-btn");
    const footerShareBtn = document.querySelector(".footer-share-btn");

    if (footerHomeBtn) {
        footerHomeBtn.addEventListener("click", function () {
            window.location.href = "#home";
        });
    }

    if (footerProfileBtn) {
        footerProfileBtn.addEventListener("click", function () {
            alert("Showing profile information.");
        });
    }

    if (footerShareBtn && sharePopup && closePopupBtn) {
        footerShareBtn.addEventListener("click", function () {
            sharePopup.style.display = "block";
        });

        closePopupBtn.addEventListener("click", function () {
            sharePopup.style.display = "none";
        });
    }

    // Hamburger menu for mobile responsiveness
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-menu ul");

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            hamburgerMenu.classList.toggle("open");
        });

        const navLinks = document.querySelectorAll(".nav-menu ul li a");

        navLinks.forEach(link => {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                hamburgerMenu.classList.remove("open");
            });
        });
    }

    // Load downloads on the downloads page
    if (window.location.pathname.includes('downloads.html')) {
        updateDownloadsPage();
    }
});
