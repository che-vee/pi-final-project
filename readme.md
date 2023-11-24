# Programming Interactivity Final Project

## Completed Features

-   [x] Add interactive background
-   [x] Render image grids of some data (projects, tweets, products)
-   [x] Form to send emails
-   [x] Sort data in grid view
-   [x] Search or filter grid view
-   [x] Change background color (dark and light)
-   [x] Micro animations
-   [x] Scroll interactions
-   [ ] Download CV (if portfolio)
-   [x] Language translation
-   [ ] Drag list item or grid items around and reorder
-   [x] Deploy by Github Pages (or Vercel)
-   [x] Accessibility
-   [x] Responsive on all devices
-   [x] Fetch data from API
-   [x] Extra additions and creativity

## Feature Details

### Interactive Background

#### `draw(event)`

-   Triggered by mouse movements over the canvas.
-   Calculates mouse position within the canvas boundaries.
-   Records positions with gradient and opacity in an array.
-   Dynamically redraws fading lines between stored points.
-   Removes transparent points to free up memory.

#### `draw(event)`

-   Triggered by mouse movements over the canvas.
-   Calculates mouse position within the canvas boundaries.
-   Records positions with gradient and opacity in an array.
-   Dynamically redraws fading lines between stored points.
-   Removes transparent points to free up memory.

### Image Grids

#### `displayGridImages(images)`

-   Loops through the fetched `images`.
-   Creates a `.grid-item` with an `img` element for each.
-   Inserts image URL and alt text into `img`.
-   Appends to the grid container.
-   Called after fetching images from the API.

### Form Submission

#### `form.addEventListener`

-   Collects data from form fields: name, email, message.
-   Defines `processFormData` to log and display a success message.
-   Displays success message temporarily.
-   Simulates email sending via console log; no backend functionality.

### Grid Sorting

#### `sortImages(images, sortOrder)`

-   Sorts `images` array based on `sortOrder`.
-   "latest" sorts by date descending, "oldest" by ascending.
-   Returns sorted array without changing the original.
-   Triggered by change event on `sortSelect`.

### Grid Filtering

#### `filterImagesByCategories(images, selectedCategories)`

-   Filters `images` by `selectedCategories`.
-   Returns unfiltered images if no category is selected.
-   Triggered by category checkbox changes.

### Change Theme

#### `toggleMode.addEventListener`

-   Toggles `dark-mode` class on `body` for theme change.
-   CSS `.dark-mode` class applies style changes.

### Micro Animations

-   CSS transformations for subtle effects.
-   Dynamic character rotation in logo text.
-   Uses GSAP `tlOnLoad` timeline: animates elements from off-screen to their final positions on pageload.

### Scroll Interactions

-   GSAP with `ScrollTrigger` for scroll-based animations.

### Language Translation

#### Code from class example

-   `changePageLanguage` targets elements `translate-key=` attribute in HTML for language updates.

### Accessibility

-   Semantic HTML elements for structure. `<header>`, `<form>`
-   `alt` tags for image descriptions.
-   `rem` for responsive font sizing.

### Responsive Design

-   CSS `@media` queries to adapt UI for different screen sizes.

### Fetch data from API

-   Triggered on page load

#### `fetchRandomImage()`

-   Fetches a random landscape wildlife image from unsplash.
-   Updates the image source and alt description.

#### `fetchImages()`

-   Fetches images for each category.
-   Processes and appends fetched images with categories to `imagesData`.
-   Updates the grid display with new images.

### Extra Additions & Creativity

#### `displayCarouselImages()` - toggle between grid and carousel

-   For each image, creates a `carousel-item` with an `img` tag.
-   Sets image source and alt text.
-   Appends items to a carousel container.

#### `carousel.addEventListener`

-   Calculates click position to determine scroll direction.
-   Scrolls carousel left or right based on click position.
-   Determines swipe direction and scrolls carousel left or right based on swip gesture.
-   Scroll carousel with keyboard navigation.

### Deployment

-   Project is live at [Github Pages](https://che-vee.github.io/pi-final-project/).
