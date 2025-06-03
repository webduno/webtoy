$(document).ready(function() {
    // Initialize confetti
    const jsConfetti = new JSConfetti();
    
    // Game data storage
    let gameData = {};
    
    // Data file mapping
    const dataFiles = {
        adjective1: '/idea/data/adjectives1.json',
        adjective2: '/idea/data/adjectives2.json',
        action: '/idea/data/actions.json',
        timeframe: '/idea/data/timeframes.json',
        npc: '/idea/data/npcs.json',
        scene: '/idea/data/scenes.json',
        stat: '/idea/data/stats.json',
        dream: '/idea/data/dreams.json',
        world: '/idea/data/worlds.json'
    };
    
    // Load all JSON data files
    async function loadGameData() {
        try {
            const loadPromises = Object.entries(dataFiles).map(async ([key, file]) => {
                const response = await fetch(file);
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}: ${response.status}`);
                }
                const data = await response.json();
                gameData[key] = data;
                return { key, data };
            });
            
            await Promise.all(loadPromises);
            populateSelects();
            console.log('All game data loaded successfully');
        } catch (error) {
            console.error('Error loading game data:', error);
            showError('Failed to load game data. Please refresh the page and try again.');
        }
    }
    
    // Populate all select elements with data
    function populateSelects() {
        Object.entries(gameData).forEach(([key, items]) => {
            const select = $(`#${key}`);
            if (select.length && Array.isArray(items)) {
                items.forEach(item => {
                    select.append(`<option value="${item}">${item}</option>`);
                });
            }
        });
    }
    
    // Generate random selection for a specific select element
    function getRandomOption(selectId) {
        const data = gameData[selectId];
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        }
        return '';
    }
    
    // Randomize all select elements
    function randomizeAll() {
        const selects = ['adjective1', 'adjective2', 'action', 'timeframe', 'npc', 'scene', 'stat', 'dream', 'world'];
        
        // Add loading animation
        selects.forEach(selectId => {
            $(`#${selectId}`).addClass('updating');
        });
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            selects.forEach(selectId => {
                const randomValue = getRandomOption(selectId);
                $(`#${selectId}`).val(randomValue).removeClass('updating');
            });
            
            // Generate the idea after randomization
            generateGameIdea();
        }, 800);
    }
    
    // Generate game idea sentence
    function generateGameIdea() {
        const values = {
            adjective1: $('#adjective1').val(),
            adjective2: $('#adjective2').val(),
            action: $('#action').val(),
            timeframe: $('#timeframe').val(),
            npc: $('#npc').val(),
            scene: $('#scene').val(),
            stat: $('#stat').val(),
            dream: $('#dream').val(),
            world: $('#world').val()
        };
        
        // Check if all required fields are filled
        const emptyFields = Object.entries(values).filter(([key, value]) => !value).map(([key]) => key);
        
        if (emptyFields.length === Object.keys(values).length) {
            // All fields are empty - show placeholder
            $('#gameIdea').html('<p class="placeholder-text">Select options above to generate your unique game idea...</p>');
            $('#copyIdea').hide();
            return;
        }
        
        if (emptyFields.length > 0) {
            // Some fields are empty - show partial idea with missing indicators
            const missingText = `<span style="color: hsl(var(--text-secondary)); font-style: italic;">[missing ${emptyFields.join(', ')}]</span>`;
            const idea = buildGameSentence(values, missingText);
            $('#gameIdea').html(`<p class="generated-text">${idea}</p>`);
            $('#copyIdea').show();
            return;
        }
        
        // All fields filled - generate complete idea
        const idea = buildGameSentence(values);
        $('#gameIdea').html(`<p class="generated-text">${idea}</p>`);
        $('#copyIdea').show();

        // Trigger confetti when all fields are filled
        jsConfetti.addConfetti({
            emojis: ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪'],
            emojiSize: 50,
            confettiNumber: 30,
        });
    }
    
    // Build the game sentence with proper formatting
    function buildGameSentence(values, missingPlaceholder = '') {
        const parts = [
            'A game about a',
            values.adjective1 || missingPlaceholder,
            values.adjective2 || missingPlaceholder,
            'role that needs to',
            values.action || missingPlaceholder,
            'in short term (' + (values.timeframe || missingPlaceholder) + '),',
            'with',
            values.npc || missingPlaceholder + ',',
            'at',
            values.scene || missingPlaceholder + ',',
            'to get',
            values.stat || missingPlaceholder + ',',
            'to fulfill the long term dream of',
            values.dream || missingPlaceholder + ',',
            'in',
            values.world || missingPlaceholder + '.'
        ];
        
        return parts.join(' ').replace(/\s+/g, ' ').trim();
    }
    
    // Copy game idea to clipboard
    async function copyToClipboard() {
        const ideaText = $('#gameIdea .generated-text').text();
        
        if (!ideaText) {
            showError('No game idea to copy!');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(ideaText);
            
            // Show success feedback
            const $copyBtn = $('#copyIdea');
            $copyBtn.addClass('copy-success');
            
            setTimeout(() => {
                $copyBtn.removeClass('copy-success');
            }, 2000);
            
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = ideaText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            showError('Game idea copied to clipboard!');
        }
    }
    
    // Show error message
    function showError(message) {
        // Create a temporary toast notification
        const toast = $(`
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #EF4444;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                z-index: 1000;
                max-width: 300px;
                font-size: 0.875rem;
                animation: slideIn 0.3s ease;
            ">
                <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
                ${message}
            </div>
        `);
        
        $('body').append(toast);
        
        setTimeout(() => {
            toast.fadeOut(300, () => toast.remove());
        }, 3000);
    }
    
    // Event Listeners
    $('#randomizeAll').on('click', randomizeAll);
    $('#copyIdea').on('click', copyToClipboard);
    
    // Listen for changes in any select element
    $('.form-select').on('change', generateGameIdea);
    
    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + R for randomize
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            randomizeAll();
        }
        
        // Ctrl/Cmd + C when focus is on result area
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && $('#gameIdea .generated-text').length) {
            if (!window.getSelection().toString()) {
                e.preventDefault();
                copyToClipboard();
            }
        }
    });
    
    // Add CSS animation for toast notifications
    if (!$('#toast-styles').length) {
        $('head').append(`
            <style id="toast-styles">
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
        `);
    }
    
    // Add scroll to bottom functionality for Randomize All button
    document.querySelector('.scroll-to-bottom').addEventListener('click', function() {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    });

    // Add go to top functionality
    document.getElementById('goToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide go to top button based on scroll position
    window.addEventListener('scroll', function() {
        const goToTopBtn = document.getElementById('goToTop');
        if (window.scrollY > 300) {
            goToTopBtn.style.display = 'flex';
        } else {
            goToTopBtn.style.display = 'none';
        }
    });
    
    // Initialize the application
    loadGameData();
});
