const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');
const resultsSection = document.getElementById('resultsSection');
const comparisonSection = document.getElementById('comparisonSection');

// Translation elements
const googleTranslation = document.getElementById('googleTranslation');
const openaiTranslation = document.getElementById('openaiTranslation');
const analysisResult = document.getElementById('analysisResult');

// Score elements
const googleScore = document.getElementById('googleScore');
const openaiScore = document.getElementById('openaiScore');
const analysisScore = document.getElementById('analysisScore');

// Insight elements
const googlePros = document.getElementById('googlePros');
const googleCons = document.getElementById('googleCons');
const openaiPros = document.getElementById('openaiPros');
const openaiCons = document.getElementById('openaiCons');
const recommendation = document.getElementById('recommendation');

// Metric elements
const toneScore = document.getElementById('toneScore');
const cultureScore = document.getElementById('cultureScore');
const meaningScore = document.getElementById('meaningScore');

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateCharCount();
    inputText.addEventListener('input', updateCharCount);

    // Load a default example
    setTimeout(() => {
        loadExample();
        setTimeout(() => analyzeTranslation(), 500);
    }, 1000);
});

// Character counter
function updateCharCount() {
    const count = inputText.value.length;
    charCount.textContent = count;
}

// Example texts
const examples = [
    "I'm gonna bounce, fr. That party was mid anyway.",
    "I'm absolutely chuffed to bits with the results! Proper bants!",
    "She's being extra sus about the whole situation, no cap.",
    "The weather is proper mingin' today, gonna stay in.",
    "This new game is bussin'! Dead ass the best release this year."
];

function loadExample() {
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    inputText.value = randomExample;
    updateCharCount();
}

// Main analysis function
async function analyzeTranslation() {
    const text = inputText.value.trim();

    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    if (text.length < 5) {
        alert('Please enter at least 5 characters.');
        return;
    }

    // Show loading state
    showLoading(true);

    // Simulate API calls (replace with actual API calls)
    setTimeout(() => {
        processResults(text);
        showLoading(false);

        // Show results sections
        resultsSection.style.display = 'grid';
        comparisonSection.style.display = 'block';

        // Add animations
        document.querySelectorAll('.result-card').forEach(card => {
            card.classList.add('fade-in');
        });

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// Slang analysis
async function analyzeSlang() {
    const text = inputText.value.trim();

    if (!text) {
        alert('Please enter text with slang to analyze.');
        return;
    }

    // For now, just run the main analysis
    analyzeTranslation();
}

// Process mock results (replace with actual API responses)
function processResults(text) {
    // Mock Google Translate result
    const googleResults = {
        translation: getMockGoogleTranslation(text),
        score: Math.floor(Math.random() * 30) + 60, // 60-90
        pros: "Accurate literal translation, fast processing",
        cons: "Misses cultural context and slang meaning"
    };

    // Mock OpenAI result
    const openaiResults = {
        translation: getMockOpenAITranslation(text),
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        pros: "Better context understanding, handles slang",
        cons: "Can be too creative, sometimes inaccurate"
    };

    // Mock analysis
    const analysisResults = {
        comparison: getMockAnalysis(text, googleResults.translation, openaiResults.translation),
        score: Math.max(googleResults.score, openaiResults.score) + 5,
        recommendation: getRecommendation(text, googleResults, openaiResults)
    };

    // Update UI with results
    updateUI(googleResults, openaiResults, analysisResults);
}

// Mock translation functions
function getMockGoogleTranslation(text) {
    const translations = {
        "I'm gonna bounce, fr. That party was mid anyway.":
            "I'm going to bounce, for real. That party was middle anyway.",

        "I'm absolutely chuffed to bits with the results! Proper bants!":
            "I'm absolutely pleased to pieces with the results! Proper pants!",

        "She's being extra sus about the whole situation, no cap.":
            "She's being extra suspicious about the whole situation, no cap.",

        "The weather is proper mingin' today, gonna stay in.":
            "The weather is proper bad today, going to stay in.",

        "This new game is bussin'! Dead ass the best release this year.":
            "This new game is busy! Dead donkey the best release this year."
    };

    return translations[text] || `Google Translation: "${text}"`;
}

function getMockOpenAITranslation(text) {
    const translations = {
        "I'm gonna bounce, fr. That party was mid anyway.":
            "I'm going to leave, honestly. That party was average anyway.",

        "I'm absolutely chuffed to bits with the results! Proper bants!":
            "I'm really delighted with the results! Great jokes!",

        "She's being extra sus about the whole situation, no cap.":
            "She's being really suspicious about the whole situation, honestly.",

        "The weather is proper mingin' today, gonna stay in.":
            "The weather is really awful today, I'm going to stay indoors.",

        "This new game is bussin'! Dead ass the best release this year.":
            "This new game is amazing! Seriously the best release this year."
    };

    return translations[text] || `GPT Translation: "${text}"`;
}

function getMockAnalysis(text, googleTrans, openaiTrans) {
    return `Google took a literal approach ("${googleTrans.split(' ')[1]}") while GPT understood the context ("${openaiTrans.split(' ')[1]}"). GPT better preserved the casual tone.`;
}

function getRecommendation(text, googleResults, openaiResults) {
    if (text.includes("gonna") || text.includes("sus") || text.includes("bussin") || text.includes("dead ass")) {
        return "For this slang-heavy text, OpenAI GPT provides a better translation that preserves the casual tone and meaning.";
    } else if (text.includes("chuffed") || text.includes("mingin") || text.includes("proper")) {
        return "For British slang, GPT better understands the cultural context and provides more accurate translations.";
    } else {
        return "For formal or simple texts, both perform well, but Google is faster for basic translations.";
    }
}

// Update UI with results
function updateUI(googleResults, openaiResults, analysisResults) {
    // Update translations
    googleTranslation.textContent = googleResults.translation;
    openaiTranslation.textContent = openaiResults.translation;
    analysisResult.textContent = analysisResults.comparison;

    // Update scores
    googleScore.textContent = `${googleResults.score}/100`;
    openaiScore.textContent = `${openaiResults.score}/100`;
    analysisScore.textContent = `${analysisResults.score}/100`;

    // Update score colors
    updateScoreColor(googleScore, googleResults.score);
    updateScoreColor(openaiScore, openaiResults.score);
    updateScoreColor(analysisScore, analysisResults.score);

    // Update insights
    googlePros.textContent = googleResults.pros;
    googleCons.textContent = googleResults.cons;
    openaiPros.textContent = openaiResults.pros;
    openaiCons.textContent = openaiResults.cons;
    recommendation.textContent = analysisResults.recommendation;

    // Update metrics
    toneScore.textContent = `${Math.floor((googleResults.score + openaiResults.score) / 2)}%`;
    cultureScore.textContent = `${Math.max(googleResults.score, openaiResults.score) - 10}%`;
    meaningScore.textContent = `${Math.floor((googleResults.score + openaiResults.score + 10) / 2)}%`;

    // Update progress bars
    updateProgressBars();
}

function updateScoreColor(element, score) {
    if (score >= 80) {
        element.className = 'score-badge score-excellent';
    } else if (score >= 70) {
        element.className = 'score-badge score-good';
    } else {
        element.className = 'score-badge score-poor';
    }
}

function updateProgressBars() {
    const tonePercent = parseInt(toneScore.textContent);
    const culturePercent = parseInt(cultureScore.textContent);
    const meaningPercent = parseInt(meaningScore.textContent);

    document.querySelectorAll('.progress-fill')[0].style.width = `${tonePercent}%`;
    document.querySelectorAll('.progress-fill')[1].style.width = `${culturePercent}%`;
    document.querySelectorAll('.progress-fill')[2].style.width = `${meaningPercent}%`;
}

function showLoading(isLoading) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.disabled = isLoading;
        if (isLoading) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Analyzing...`;
            btn.dataset.original = originalHTML;
        } else {
            if (btn.dataset.original) {
                btn.innerHTML = btn.dataset.original;
            }
        }
    });
}

function clearAll() {
    if (confirm('Clear all text and results?')) {
        inputText.value = '';
        updateCharCount();
        resultsSection.style.display = 'none';
        comparisonSection.style.display = 'none';
        inputText.focus();
    }
}