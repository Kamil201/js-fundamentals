/* zadanie
// Stwórz tablicę z 15 losowymi, wybranymi przez ciebie wyrazami”(Muszą być typu string)
// Stwórz funkcję, która jako pierwszy argument przyjmuje tablicę wyrazów, a jako drugą wartość frazę, którą chcemy znaleźć w tej tablicy
// Jeżeli szukana przez nas fraza istnieje w tablicy to funkcja ma zwrócić jej wartość, a także indeks(pozycję) w tablicy.
// Jeżeli szukana fraza nie istnieje to funkcja ma zwrócić informację, że szukanej frazy nie ma w tablicy.
*/

const arr = [
	"cześć",
	"hello",
	"hi",
	"siema",
	"kakao",
	"mleko",
	"woda",
	"dzem",
	"niebo",
	"piekło",
	"javascript",
	"react",
	"vue",
	"angular",
	"react native",
];

function findPhraseInArray(array, phrase) {
	try {
		if (!Array.isArray(array)) {
			throw new TypeError("Podany atrybut arr nie jest tablicą");
		}

		if (array.some((item) => typeof item !== "string")) {
			return "Elementy muszą być typu string";
		}

		if (typeof phrase !== "string") {
			throw new error("Drugi argument musi być typu string");
		}

		// Przekształcamy frazę i wszystkie elementy tablicy na małe litery
		phrase = phrase.toLowerCase();
		const lowerCaseArray = array.map((item) => item.toLowerCase());

		const index = lowerCaseArray.indexOf(phrase);

		// const index = arr.indexOf(phrase);

		if (index !== -1) {
			return `znaleziono wyraz: "${phrase}" o indexie ${index}`;
		} else {
			return "szukanego słowa nie ma w tablicy";
		}
	} catch (error) {
		// error = "nie znaleziono szukanej frazy";
		return error;
	}
}

const searchedPhrase = "VUE";

const result = findPhraseInArray(arr, searchedPhrase);
console.log(result); //szukanego słowa nie ma w tablicy

// const result2 = findPhraseInArray({}); // podany atrybut nie jest tablicą
// console.log(result2);

// const result3 = findPhraseInArray([1,2,3,"apple", "banana"]);
// console.log(result3); //all elements has to be a string

/*------------------- zadanie 2-----------------
Utwórz funkcję, która jako argument przyjmuje Twój rok urodzenia. Funkcja powinna zwrócić Twój aktualny wiek niezależnie od typu inputa, który otrzyma
*/

function getMyAge(input) {
	if (typeof input === "number") {
		// Jeśli input jest liczbą, zakładamy, że jest to rok urodzenia
		const currentYear = new Date().getFullYear();
		return currentYear - input;
	} else if (typeof input === "string") {
		// Jeśli input jest stringiem, próbujemy przekształcić go na liczbę i obliczyć wiek
		const birthYear = parseInt(input, 10);
		if (!isNaN(birthYear)) {
			const currentYear = new Date().getFullYear();
			return currentYear - birthYear;
		} else {
			throw new Error("Nieprawidłowy format daty urodzenia");
		}
	} else if (input instanceof Date) {
		// Jeśli input jest obiektem typu Date, obliczamy wiek na podstawie daty urodzenia
		const currentYear = new Date().getFullYear();
		const birthYear = input.getFullYear();
		return currentYear - birthYear;
	} else {
		throw new Error(
			"Nieprawidłowy typ inputa. Akceptowane typy to: liczba, string (RRRR), obiekt Date"
		);
	}
}

try {
	const result1 = getMyAge(new Date(1990, 1, 1));
	const result2 = getMyAge("1990");
	const result3 = getMyAge(1990);

	console.log(result1, result2, result3);
} catch (error) {
	console.error(error.message);
}

/*---------------   zadanie 3------------
 Stwórz funkcję paginateArray, która przyjmuje jako 1 argument tablicę, a jako 2 argument obiekt settings z następującymi kluczami :
„actualPageIndex” - numer strony
„entriesOnPage” – ilośc obiektów na pojedynczej stronie
 Funkcja zwraca entriesOnSelectedPage, który jest arrayem podzielonym według ustawień z settings

*/

const paginateArray = (dataEntries, settings) => {
	// Walidacja settings
	if (
		typeof settings !== "object" ||
		!("actualPageIdx" in settings) ||
		!("entriesOnPage" in settings) ||
		typeof settings.actualPageIdx !== "number" ||
		typeof settings.entriesOnPage !== "number" ||
		settings.actualPageIdx < 0 ||
		settings.entriesOnPage < 0
	) {
		throw new Error("Nieprawidłowe ustawienia paginacji.");
	}

	const { actualPageIdx, entriesOnPage } = settings;
	const startIndex = actualPageIdx * entriesOnPage;
	const endIndex = startIndex + entriesOnPage;

	// Sprawdź, czy startIndex nie przekracza długości tablicy danych
	if (startIndex >= dataEntries.length) {
		return [];
	}

	// Obetnij tablicę danych do wybranej strony
	const entriesOnSelectedPage = dataEntries.slice(startIndex, endIndex);

	return entriesOnSelectedPage;
};

const data = [1, 2, 3, 4, 5, 6]; // Przykładowe dane
const settings = { actualPageIdx: 1, entriesOnPage: 2 }; // Ustawienia paginacji

try {
	const result = paginateArray(data, settings);
	console.log(result); // Wynik: [3, 4]
} catch (error) {
	console.error(error.message);
}
