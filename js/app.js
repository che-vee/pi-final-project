const logo = document.getElementById("logo");
const gridContainer = document.getElementById("grid-container");
const toggleMode = document.getElementById("toggle-mode");
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const sortSelect = document.getElementById("sort");
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const imageElement = document.getElementById("random-image");
const toggleView = document.getElementById("toggle-view");
const carouselContainer = document.getElementById("carousel-container");
const carousel = document.getElementById("carousel");

// Set inital variables
const logoText = "mara • studios • mara • studios • ";
const body = document.body;
const categories = ["safari", "wildlife", "nature"];
const imagesData = [];
let currentImageIndex = 0;
let startX = 0;
let endX = 0;

const APIKey =
	"c3ba5fa8e844fc1b4ef1ca56625e6e625aa111c6f8d5a0a68ff985fe5f001866"; //not best practice but no .env support on github pages

// Function to fetch random image from Unsplash API
async function fetchRandomImage() {
	try {
		const response = await fetch(
			`https://api.unsplash.com/photos/random/?client_id=${APIKey}&orientation=landscape&query=wildlife`
		);
		const data = await response.json();

		imageElement.src = data.urls.regular;
		imageElement.alt = data.alt_description || "Random wildlife image";
	} catch (error) {
		console.error("Error fetching images:", error);
	}
}

// Function to search images from Unsplash API
const fetchImages = async () => {
	try {
		for (const category of categories) {
			const response = await fetch(
				`https://api.unsplash.com/search/photos?query=${encodeURIComponent(
					category
				)}&client_id=${APIKey}&orientation=portrait&per_page=5`
			);

			const data = await response.json();

			const imagesWithCategory = data.results.map((image) => ({
				...image,
				customCategory: category,
			}));
			imagesData.push(...imagesWithCategory);
		}
		displayGridImages(imagesData);
	} catch (error) {
		console.error("Error fetching images:", error);
	}
};

// Function to display images in grid
const displayGridImages = (images) => {
	gridContainer.innerHTML = "";

	images.forEach((image) => {
		const gridItem = document.createElement("div");
		gridItem.className = "grid-item";
		gridItem.innerHTML = `<img src="${image.urls.regular}" alt="${
			image.alt_description || "Wildlife image"
		}" />`;
		gridContainer.appendChild(gridItem);
	});
};

// Function to display images in carousel
const displayCarouselImages = () => {
	imagesData.forEach((image) => {
		const carouselItem = document.createElement("div");
		carouselItem.className = "carousel-item";
		carouselItem.innerHTML = `<img src="${image.urls.regular}" alt="${
			image.alt_description || "Wildlife image"
		}" />`;
		carousel.appendChild(carouselItem);
	});
};

const onPrevClick = () => {
	carousel.scrollTo({
		left: carousel.scrollLeft - carousel.offsetWidth,
		behavior: "smooth",
	});
};

const onNextClick = () => {
	carousel.scrollTo({
		left: carousel.scrollLeft + carousel.offsetWidth,
		behavior: "smooth",
	});
};

// Filter images based on selected categories
const filterImagesByCategories = (images, selectedCategories) => {
	return selectedCategories.length === 0
		? images
		: images.filter((image) =>
				selectedCategories.some(
					(category) => image.customCategory === category
				)
		  );
};

// Sort images by date
const sortImages = (images, sortOrder) => {
	return sortOrder === "latest"
		? [...images].sort(
				(a, b) => new Date(b.created_at) - new Date(a.created_at)
		  )
		: sortOrder === "oldest"
		? [...images].sort(
				(a, b) => new Date(a.created_at) - new Date(b.created_at)
		  )
		: images;
};

// Event Listeners
toggleMode.addEventListener("click", function () {
	body.classList.toggle("dark-mode");

	toggleMode.classList.toggle("bxs-sun");
});

categoryCheckboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", () => {
		const categories = Array.from(categoryCheckboxes)
			.filter((checkbox) => checkbox.checked)
			.map((checkbox) => checkbox.value);

		const filteredImages = filterImagesByCategories(imagesData, categories);
		displayGridImages(filteredImages);
	});
});

sortSelect.addEventListener("change", () => {
	const sortOrder = sortSelect.value;
	const sortedImages = sortImages(imagesData, sortOrder);
	displayGridImages(sortedImages);
});

form.addEventListener("submit", (event) => {
	event.preventDefault();

	let formData = {
		name: form.elements.name.value,
		email: form.elements.email.value,
		message: form.elements.message.value,
	};

	const processFormData = (data) => {
		console.log("Form submitted with", data);
		formMessage.textContent = "Email sent successfully!";
		formMessage.style.display = "block";
		setTimeout(() => {
			formMessage.style.display = "none";
		}, 5000);
	};

	processFormData(formData);
});

toggleView.addEventListener("click", () => {
	if (gridContainer.style.display !== "none") {
		gridContainer.style.display = "none";
		carouselContainer.style.display = "block";
		displayCarouselImages();
	} else {
		gridContainer.style.display = "grid";
		carouselContainer.style.display = "none";
	}

	toggleView.classList.toggle("bxs-grid-alt");
});

carousel.addEventListener("click", (event) => {
	let carouselRect = carousel.getBoundingClientRect();
	let clickPosition = event.clientX - carouselRect.left;
	let thirdOfCarousel = carouselRect.width / 3;

	if (clickPosition < thirdOfCarousel) {
		onNextClick();
	} else if (clickPosition > 2 * thirdOfCarousel) {
		onPrevClick();
	}
});

carousel.addEventListener(
	"touchstart",
	(event) => {
		event.preventDefault();
		startX = event.changedTouches[0].screenX;
	},
	{ passive: false }
);

carousel.addEventListener("touchend", (event) => {
	endX = event.changedTouches[0].screenX;
	if (endX < startX) {
		onNextClick();
	} else if (endX > startX) {
		onPrevClick();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		onPrevClick();
	} else if (event.key === "ArrowRight") {
		onNextClick();
	}
});

// GSAP timelines
let tlOnLoad = gsap.timeline();

tlOnLoad
	.from(
		"header",
		{
			x: -150,
			autoAlpha: 0,
			duration: 1.5,
		},
		"<"
	)
	.from(
		"#hero-container",
		{ y: window.innerHeight, autoAlpha: 0, duration: 1.5 },
		"<"
	)
	.from(
		"#image-container",
		{ y: window.innerHeight, autoAlpha: 0, duration: 1.5 },
		"<+0.5"
	);

gsap.to("#image-container img", {
	width: "100%",
	scrollTrigger: {
		scroller: "body",
		start: "top top",
		end: "bottom top",
		scrub: 3,
	},
});

const initScript = () => {
	// Logo with rotated characters
	[...logoText].forEach((char, i) => {
		const span = document.createElement("span");
		span.innerHTML = char;
		logo.appendChild(span);
		span.style.transform = `rotate(${10.5 * i}deg)`;
	});

	fetchRandomImage();
	fetchImages();

	tlOnLoad.play();
};

initScript();
