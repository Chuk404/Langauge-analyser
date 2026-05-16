const inputBox = document.getElementById('inputBox');
const outputBox = document.getElementById('outputBox');
const inputLang = document.getElementById('inputLang');
const outputLang = document.getElementById('outputLang');
const langSwitch = document.getElementById('langSwitch');
const clearInput = document.getElementById('clearInput');
const copyOutput = document.getElementById('copyOutput');
const inputTTS = document.getElementById('inputTTS');
const outputTTS = document.getElementById('outputTTS');

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