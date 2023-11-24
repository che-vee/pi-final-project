import { translations } from "./translations.js";

const toggleLanguageButton = document.getElementById("toggle-language");

// Function to toggle the language
const toggleLanguage = () => {
	const currentLanguage = toggleLanguageButton.textContent;

	if (currentLanguage === "English") {
		changePageLanguage("en");
		toggleLanguageButton.textContent = "Swahili";
	} else {
		changePageLanguage("sw");
		toggleLanguageButton.textContent = "English";
	}
};

// Function to change the page language
const changePageLanguage = (language) => {
	// Find all elements with the "translate-key" attribute
	document.querySelectorAll("[translate-key]").forEach((element) => {
		// Get the translation key from the element's attribute
		const key = element.getAttribute("translate-key");

		// Find the translated string for the given language
		const translatedString = translations[language][key];
		element.innerText = translatedString || `${key}`;
	});
};

const init = () => {
	changePageLanguage("en");
};

//Event listeners
toggleLanguageButton.addEventListener("click", toggleLanguage);

init();
