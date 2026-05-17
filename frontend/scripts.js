const inputBox = document.getElementById('inputBox');
const outputBox = document.getElementById('outputBox');
const inputLang = document.getElementById('inputLang');
const outputLang = document.getElementById('outputLang');
const langSwitch = document.getElementById('langSwitch');
const clearInput = document.getElementById('clearInput');
const copyOutput = document.getElementById('copyOutput');
const inputTTS = document.getElementById('inputTTS');
const outputTTS = document.getElementById('outputTTS');

const inputFlag = document.getElementById('inputFlag');
const outputFlag = document.getElementById('outputFlag');

let languages = {};


// Loads languages.json and adds them into the selector slider
async function loadLanguages() {
    try {
        const response = await fetch('languages.json');
        if (!response.ok) throw new Error('ERROR: Language file failed to load');

        languages = await response.json()

        Object.entries(languages).forEach(([langCode, langData]) => {
            const optionIn = document.createElement('option');
            optionIn.value = langCode;
            optionIn.textContent = langData.name;
            inputLang.appendChild(optionIn);

            const optionOut = document.createElement('option');
            optionOut.value = langCode;
            optionOut.textContent = langData.name;
            outputLang.appendChild(optionOut);

        });

        // Set default languages on the slider to minimise problems
        inputLang.value = 'en';
        outputLang.value = 'fr';

    } catch (error) {
        console.error("Error loading languages for dropdown menu", error);
    }
}

function updateFlagIcon() {

    // Do nothing if JSON file not read
    if (!languages[inputLang.value] || !languages[outputLang.value]) return;

    const inputCountry = languages[inputLang.value].imageCode;
    const outputCountry = languages[outputLang.value].imageCode;

    inputFlag.src = `https://flagcdn.com/w80/${inputCountry}.png`;
    outputFlag.src = `https://flagcdn.com/w80/${outputCountry}.png`;

}

async function translate() {
    const text = inputBox.value;
    const targetLanguage = outputLang.value;

    if (text.trim() === '') return;

    outputBox.textContent = 'Translating...';

    try {
        const response = await fetch('http://localhost:8080/translation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                targetLanguage: targetLanguage
            })
        });

        const data = await response.json();
        outputBox.textContent = data.translation;

    } catch (error) {
        outputBox.textContent = 'Error connecting to server';
    }
}

// Translate when user stops typing
inputBox.addEventListener('input', translate);

// Clear button
clearInput.addEventListener('click', () => {
    inputBox.value = '';
    outputBox.textContent = '';
});

// Copy button
copyOutput.addEventListener('click', () => {
    navigator.clipboard.writeText(outputBox.textContent);
});

// Swap languages
langSwitch.addEventListener('click', () => {
    const temp = inputLang.value;
    inputLang.value = outputLang.value;
    outputLang.value = temp;
    updateFlagIcon();
    translate();
});

// Text to speech
inputTTS.addEventListener('click', () => {
    const speech = new SpeechSynthesisUtterance(inputBox.value);
    speech.lang = inputLang.value;
    window.speechSynthesis.speak(speech);
});

outputTTS.addEventListener('click', () => {
    const speech = new SpeechSynthesisUtterance(outputBox.textContent);
    speech.lang = outputLang.value;
    window.speechSynthesis.speak(speech);
});

// Dropdown Menu Updater
inputLang.addEventListener('change', updateFlagIcon);
outputLang.addEventListener('change', updateFlagIcon);

loadLanguages()