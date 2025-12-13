/* ============================================
   F1 WEBSITE - MAIN JAVASCRIPT
   Dynamic rendering, interactivity, chat
   ============================================ */

// Team Statistics Data
var teamData = {
    mercedes: {
        championships: 8,
        wins: 104,
        podiums: 320,
        fastest: 140,
        performance: 88,
        reliability: 92,
        season2024: 85
    },
    redbull: {
        championships: 4,
        wins: 74,
        podiums: 258,
        fastest: 104,
        performance: 89,
        reliability: 85,
        season2024: 92
    },
    ferrari: {
        championships: 16,
        wins: 242,
        podiums: 634,
        fastest: 237,
        performance: 81,
        reliability: 78,
        season2024: 76
    },
    mclaren: {
        championships: 8,
        wins: 183,
        podiums: 510,
        fastest: 120,
        performance: 75,
        reliability: 72,
        season2024: 68
    },
    alpine: {
        championships: 2,
        wins: 10,
        podiums: 30,
        fastest: 4,
        performance: 60,
        reliability: 65,
        season2024: 50
    },
    aston: {
        championships: 0,
        wins: 1,
        podiums: 25,
        fastest: 1,
        performance: 58,
        reliability: 70,
        season2024: 55
    },
    williams: {
        championships: 7,
        wins: 114,
        podiums: 313,
        fastest: 128,
        performance: 52,
        reliability: 68,
        season2024: 45
    },
    alfa: {
        championships: 0,
        wins: 0,
        podiums: 11,
        fastest: 0,
        performance: 50,
        reliability: 62,
        season2024: 40
    },
    haas: {
        championships: 0,
        wins: 0,
        podiums: 0,
        fastest: 0,
        performance: 48,
        reliability: 60,
        season2024: 35
    },
    kick: {
        championships: 0,
        wins: 0,
        podiums: 0,
        fastest: 0,
        performance: 45,
        reliability: 55,
        season2024: 30
    }
};

// Initialize page on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeReadMore();
    initializeTeamStats();
    initializeChat();
    renderDrivers();
    renderTeams();
});

/* ============================================
   READ MORE FUNCTIONALITY
   ============================================ */

function initializeReadMore() {
    var btn = document.getElementById('rm-btn');
    var box = document.querySelector('.info-box');
    if (btn && box) {
        btn.addEventListener('click', function() {
            var expanded = box.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', expanded);
            btn.textContent = expanded ? 'Read less' : 'Read more';
        });
    }
}

/* ============================================
   RENDER DRIVERS DYNAMICALLY
   ============================================ */

function renderDrivers() {
    var driversData = [
        {
            name: "Max Verstappen",
            team: "Red Bull Racing",
            championships: 3,
            points: 437,
            image: "../assets/max-verstappen.jpg"
        },
        {
            name: "Lewis Hamilton",
            team: "Mercedes",
            championships: 7,
            points: 412,
            image: "../assets/lewis-hamilton.jpg"
        },
        {
            name: "Charles Leclerc",
            team: "Ferrari",
            championships: 0,
            points: 380,
            image: "../assets/charles-leclerc.png"
        },
        {
            name: "Lando Norris",
            team: "McLaren",
            championships: 0,
            points: 350,
            image: "../assets/lando-norris.jpg"
        },
        {
            name: "George Russell",
            team: "Mercedes",
            championships: 0,
            points: 340,
            image: "../assets/george russell.webp"
        },
        {
            name: "Carlos Sainz",
            team: "Ferrari",
            championships: 0,
            points: 320,
            image: "../assets/carlos seinz.png"
        }
    ];

    var driversGrid = document.querySelector('.drivers-grid');
    if (!driversGrid) return;

    driversGrid.innerHTML = '';
    driversData.forEach(function(driver) {
        var card = document.createElement('div');
        card.className = 'driver-card';
        card.innerHTML = '<img src="' + driver.image + '" alt="' + driver.name + '" class="driver-photo">' +
            '<div class="driver-info">' +
            '<h3>' + driver.name + '</h3>' +
            '<p class="team">' + driver.team + '</p>' +
            '<div class="driver-stats">' +
            '<span class="stat-badge">🏆 ' + driver.championships + 'x Champion</span>' +
            '<span class="stat-badge">⚡ 2024 Points: ' + driver.points + '</span>' +
            '</div>' +
            '</div>';
        driversGrid.appendChild(card);
    });
}

/* ============================================
   RENDER TEAMS DYNAMICALLY
   ============================================ */

function renderTeams() {
    var teamsData = [
        { name: "Red Bull Racing", country: "Milton Keynes, UK", championships: 4, wins: 74, logo: "../assets/red-bull-racing.jpg" },
        { name: "Mercedes", country: "Brackley, UK", championships: 8, wins: 104, logo: "../assets/mercedes.png" },
        { name: "Ferrari", country: "Maranello, Italy", championships: 16, wins: 242, logo: "../assets/ferrari.jpg" },
        { name: "McLaren", country: "Woking, UK", championships: 8, wins: 183, logo: "../assets/mclaren.jpg" },
        { name: "Aston Martin", country: "Silverstone, UK", championships: 0, wins: 1, logo: "../assets/aston-marin.jpg" },
        { name: "Alpine", country: "Enstone, UK", championships: 2, wins: 10, logo: "../assets/alpine.png" }
    ];

    var teamsGrid = document.querySelector('.teams-grid');
    if (!teamsGrid) return;

    teamsGrid.innerHTML = '';
    teamsData.forEach(function(team) {
        var card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = '<div class="team-logo"><img src="' + team.logo + '" alt="' + team.name + '"></div>' +
            '<h3>' + team.name + '</h3>' +
            '<p class="team-country">' + team.country + '</p>' +
            '<div class="team-quick-stats">' +
            '<div class="quick-stat"><span class="label">Championships</span><span class="value">' + team.championships + '</span></div>' ;
        teamsGrid.appendChild(card);
    });
}

/* ============================================
   TEAM STATS FUNCTIONALITY
   ============================================ */

function initializeTeamStats() {
    var teamButtons = document.querySelectorAll('.team-btn');
    teamButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var teamKey = this.getAttribute('data-team');
            teamButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            updateTeamStats(teamKey);
        });
    });

    // Initialize with default team
    updateTeamStats('mercedes');
}

function updateTeamStats(teamKey) {
    var stats = teamData[teamKey];
    if (!stats) return;

    var statElements = document.querySelectorAll('[data-stat]');
    statElements.forEach(function(elem) {
        var statName = elem.getAttribute('data-stat');
        var target = stats[statName] || 0;
        elem.setAttribute('data-target', target);
    });

    animateCounters();
    animateBars();
}

function animateCounters() {
    var counters = document.querySelectorAll('.stat-value[data-stat]');
    counters.forEach(function(counter) {
        var target = +counter.getAttribute('data-target') || 0;
        var duration = 800;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            var pct = Math.min(progress / duration, 1);
            var value = Math.floor(pct * target);
            counter.textContent = value;
            if (progress < duration) requestAnimationFrame(step);
            else counter.textContent = target;
        }

        requestAnimationFrame(step);
    });
}

function animateBars() {
    var fills = document.querySelectorAll('.bar-fill[data-stat]');
    fills.forEach(function(fill, i) {
        var statName = fill.getAttribute('data-stat');
        var teamBtn = document.querySelector('.team-btn.active');
        var teamKey = teamBtn ? teamBtn.getAttribute('data-team') : 'mercedes';
        var target = teamData[teamKey][statName] || 0;

        fill.style.width = '0%';
        fill.textContent = '0%';
        setTimeout(function() {
            fill.style.width = target + '%';
            fill.textContent = target + '%';
        }, 100 * i + 100);
    });
}

/* ============================================
   LIVE CHAT FUNCTIONALITY
   ============================================ */

function initializeChat() {
    var chatInput = document.getElementById('chatInput');
    var sendBtn = document.getElementById('sendBtn');
    var chatMessages = document.getElementById('chatMessages');

    var chatHistory = [];
    var STORAGE_KEY = 'f1_chat_history';

    function loadChatHistory() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                chatHistory = JSON.parse(stored) || [];
            } catch (e) {
                console.error('Error loading chat history:', e);
                chatHistory = [];
            }
        }
        renderChat();
    }

    function renderChat() {
        chatMessages.innerHTML = '';
        chatHistory.forEach(function(msg) {
            addMessageToDisplay(msg.sender, msg.text, msg.author, msg.ts);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMessageToDisplay(sender, text, author, ts) {
        var msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + (sender === 'user' ? 'user' : sender === 'bot' ? 'other' : 'system');

        var messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        msgDiv.appendChild(messageText);

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function saveChatHistory() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    }

    function appendMessage(sender, text, author) {
        var entry = { sender: sender, text: text, author: author || null, ts: Date.now() };
        chatHistory.push(entry);
        saveChatHistory();
        renderChat();
    }

    var botKnowledge = {
        'lewis|hamilton': 'Lewis Hamilton is a 7-time F1 World Champion and the most successful driver in F1 history. He races for Mercedes.',
        'max|verstappen': 'Max Verstappen is a 3-time F1 World Champion racing for Red Bull Racing. He\'s one of the greatest drivers on the grid.',
        'charles|leclerc': 'Charles Leclerc drives for Ferrari. He\'s known for his speed and smooth driving style.',
        'lando|norris': 'Lando Norris races for McLaren. The young British driver is rising through the ranks.',
        'ferrari': 'Ferrari is the legendary Italian team with the most championships in F1 history.',
        'mercedes': 'Mercedes is the dominant force in modern F1, with 8 Constructors\' Championships.',
        'red bull': 'Red Bull Racing is one of the top teams in F1, with 4 Constructors\' Championships.',
        'how many|races|season': 'A Formula 1 season typically consists of 24 races. Each race awards points based on finishing position.',
        'how many|points|win': 'The winner of a race receives 25 points in modern F1. Second place gets 18 points, third gets 15.',
        'what is|f1|formula 1': 'Formula 1 is the highest level of single-seater racing in the world.',
        'hello|hi|hey': 'Hello! Welcome to the F1 chat! Ask me anything about Formula 1!'
    };

    function getBotResponse(userMessage) {
        var lowerMsg = userMessage.toLowerCase();

        for (var key in botKnowledge) {
            var patterns = key.split('|');
            for (var i = 0; i < patterns.length; i++) {
                if (lowerMsg.indexOf(patterns[i]) !== -1) {
                    return botKnowledge[key];
                }
            }
        }

        var responses = [
            'That\'s interesting! Can you ask me about a specific driver or team?',
            'Good question! Try asking about drivers, teams, or F1 rules.',
            'I\'m here to help with F1 knowledge! Ask me about anything F1-related.',
            'That\'s a great topic! Do you have other F1 questions?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function sendMessage() {
        var text = chatInput.value.trim();
        if (!text) return;

        appendMessage('user', text, null);
        chatInput.value = '';

        setTimeout(function() {
            var response = getBotResponse(text);
            appendMessage('bot', response, 'F1 Bot');
        }, 500 + Math.random() * 300);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    var clearBtn = document.getElementById('clearChatBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all messages?')) {
                chatHistory = [];
                localStorage.removeItem(STORAGE_KEY);
                renderChat();
                appendMessage('bot', 'Chat cleared. Start a new conversation!', 'F1 Bot');
            }
        });
    }

    loadChatHistory();
    if (chatHistory.length === 0) {
        appendMessage('bot', 'Hi! Ask me anything about F1 - drivers, teams, rules, or race info!', 'F1 Bot');
    }
}

document.addEventListener('DOMContentLoaded', function(){ 
    var btn = document.getElementById('.read-more-btn');
    var box = document.querySelector('.info-box');
    if(btn && box){
        btn.addEventListener('click', function(){
            var expanded = box.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', expanded);
            btn.textContent = expanded ? 'Read less' : 'Read more';
        });
    }

    var teamButtons = document.querySelectorAll('.team-btn');
    teamButtons.forEach(function(btn){
        btn.addEventListener('click', function(){
            var teamKey = this.getAttribute('data-team');
            teamButtons.forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
            updateTeamStats(teamKey);
        });
    });

    function updateTeamStats(teamKey){
        var stats = teamData[teamKey];
        if(!stats) return;
        
        var statValues = document.querySelectorAll('[data-stat]');
        statValues.forEach(function(elem){
            var statName = elem.getAttribute('data-stat');
            var target = stats[statName] || 0;
            elem.setAttribute('data-target', target);
        });

        animateCounters();
        animateBars();
    }

    function animateCounters(){
        var counters = document.querySelectorAll('.stat-value[data-stat]');
        counters.forEach(function(counter){
            var target = +counter.getAttribute('data-target') || 0;
            var duration = 800;
            var startTime = null;
            function step(timestamp){
                if(!startTime) startTime = timestamp;
                var progress = timestamp - startTime;
                var pct = Math.min(progress / duration, 1);
                var value = Math.floor(pct * target);
                counter.textContent = value;
                if(progress < duration) requestAnimationFrame(step);
                else counter.textContent = target;
            }
            requestAnimationFrame(step);
        });
    }

    function animateBars(){
        var fills = document.querySelectorAll('.bar-fill[data-stat]');
        fills.forEach(function(fill, i){
            var statName = fill.getAttribute('data-stat');
            var teamBtn = document.querySelector('.team-btn.active');
            var teamKey = teamBtn ? teamBtn.getAttribute('data-team') : 'mercedes';
            var target = teamData[teamKey][statName] || 0;
            
            fill.style.width = '0%';
            fill.textContent = '0%';
            setTimeout(function(){ 
                fill.style.width = target + '%';
                fill.textContent = target + '%';
            }, 100 * i + 100);
        });
    }

    var statsSection = document.getElementById('stats');
    if(statsSection){
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    animateCounters();
                    animateBars();
                    io.disconnect();
                }
            });
        }, {threshold: 0.2});
        io.observe(statsSection);
    } else {
        animateCounters();
        animateBars();
    }

    var chatInput = document.getElementById('chatInput');
    var sendBtn = document.getElementById('sendBtn');
    var chatMessages = document.getElementById('chatMessages');
    
    var chatHistory = [];
    var STORAGE_KEY = 'f1_chat_history';
    
    function loadChatHistory(){
        var stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
            try{
                chatHistory = JSON.parse(stored) || [];
            } catch(e){
                console.error('Error loading chat history:', e);
                chatHistory = [];
            }
        } else {
            chatHistory = [];
        }
        renderChat();
    }

    function addMessageToDisplay(sender, text, author, ts){
        var msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + (sender === 'user' ? 'user' : 'other');

        var bubble = document.createElement('div');
        bubble.className = 'bubble';

        var metaRow = document.createElement('div');
        metaRow.className = 'message-meta';
        
        var nameSpan = document.createElement('span');
        nameSpan.className = 'message-author';
        nameSpan.textContent = sender === 'user' ? 'You' : (author || 'Guest');
        metaRow.appendChild(nameSpan);

        var timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        var date = ts ? new Date(ts) : new Date();
        timeSpan.textContent = date.getHours().toString().padStart(2,'0') + ':' + date.getMinutes().toString().padStart(2,'0');
        metaRow.appendChild(timeSpan);

        bubble.appendChild(metaRow);

        var msgText = document.createElement('div');
        msgText.className = 'message-text';
        msgText.textContent = text;
        bubble.appendChild(msgText);

        msgDiv.appendChild(bubble);

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderChat(){
        chatMessages.innerHTML = '';
        chatHistory.forEach(function(msg){
            addMessageToDisplay(msg.sender, msg.text, msg.author, msg.ts);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function saveChatHistory(){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    }

    function appendMessage(sender, text, author){
        var entry = { sender: sender, text: text, author: author || null, ts: Date.now() };
        chatHistory.push(entry);
        saveChatHistory();
        renderChat();
    }
    var botKnowledge = {
        'lewis|hamilton': 'Lewis Hamilton is a 7-time F1 World Champion and the most successful driver in F1 history. He races for Mercedes and is known for his incredible racecraft and speed.',
        'max|verstappen': 'Max Verstappen is a 3-time F1 World Champion racing for Red Bull Racing. At just 27, he\'s already one of the greatest drivers on the grid.',
        'charles|leclerc': 'Charles Leclerc drives for Ferrari. He\'s known for his speed and smooth driving style, and is considered one of the most exciting young talents in F1.',
        'lando|norris': 'Lando Norris races for McLaren. The young British driver is rising through the ranks and has shown great potential.',
        'ferrari': 'Ferrari is the legendary Italian team with the most championships in F1 history. They\'re known as the "Scuderia" and have a passionate fanbase worldwide.',
        'mercedes': 'Mercedes is the dominant force in modern F1, with 8 Constructors\' Championships. They\'re known for their engineering excellence and consistency.',
        'red bull': 'Red Bull Racing is one of the top teams in F1, with 4 Constructors\' Championships. They\'re famous for their innovation and aggressive strategy.',
        'mclaren': 'McLaren is a legendary F1 team with 8 Constructors\' Championships. Known for their history of innovation and great drivers.',
        'how many|races|season': 'A Formula 1 season typically consists of 24 races held around the world. Each race awards points based on finishing position.',
        'how many|points|win': 'In modern F1, the winner of a race receives 25 points. Second place gets 18 points, third gets 15, and so on down to the tenth place which receives 1 point.',
        'what is|f1|formula 1': 'Formula 1 is the highest level of single-seater racing in the world. It\'s known for cutting-edge technology, incredible speeds, and the world\'s best drivers competing for the championship.',
        'pit stop': 'A pit stop is when a car comes into the pit lane to change tires, refuel, or make repairs. Modern F1 pit stops are incredibly fast - often completed in under 2 seconds!',
        'drs|drag reduction': 'DRS (Drag Reduction System) is a device that reduces aerodynamic drag, allowing cars to go faster on straights. Drivers can use it when they\'re within 1 second of the car ahead.',
        'kers|hybrid': 'Modern F1 cars use hybrid power units combining a traditional engine with an electric motor. This recovers energy that would otherwise be wasted.',
        'qualify|qualifying': 'Qualifying determines the grid order for Sunday\'s race. Drivers complete fast laps on Saturday, with the fastest setting pole position on the front row.',
        'pole position': 'Pole position is the first place on the starting grid for the race, typically secured by the driver with the fastest lap in qualifying.',
        'fastest lap': 'The fastest lap is awarded to the driver who sets the quickest individual lap during the race. It now awards 1 championship point.',
        'safety car': 'The safety car comes out to neutralize the race during dangerous conditions. All drivers must stay behind it until the track is clear.',
        'penalty|flag': 'Drivers can receive penalties like time penalties, grid penalties, or disqualifications for breaking the rules or dangerous driving.',
        'thanks|thank you|appreciation': 'You\'re welcome! Feel free to ask me anything about Formula 1! 🏁',
        'hello|hi|hey': 'Hello! Welcome to the F1 chat! Ask me anything about Formula 1, drivers, teams, or rules!'
    };
    
    var botName = 'F1 Bot';
    
    
    function getBotResponse(userMessage){
        var lowerMsg = userMessage.toLowerCase();
        
        for(var key in botKnowledge){
            var patterns = key.split('|');
            for(var i = 0; i < patterns.length; i++){
                if(lowerMsg.indexOf(patterns[i]) !== -1){
                    return botKnowledge[key];
                }
            }
        }
        
        var defaultResponses = [
            'That\'s interesting! I\'m learning more about F1 every day. Can you ask me about a specific driver, team, or rule?',
            'Good question! For more details, check out the F1 official website or Wikipedia.',
            'I\'m here to help with F1 knowledge! Ask me about drivers, teams, or how the sport works.',
            'That\'s a great topic! Do you have any other F1-related questions?'
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    function sendMessage(){
        var text = chatInput.value.trim();
        if(!text) return;
        
        appendMessage('user', text, null);
        chatInput.value = '';
        
        setTimeout(function(){
            var response = getBotResponse(text);
            appendMessage('bot', response, botName);
        }, 500 + Math.random() * 300);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e){
        if(e.key === 'Enter') sendMessage();
    });

    var clearBtn = document.getElementById('clearChatBtn');
    if(clearBtn){
        clearBtn.addEventListener('click', function(){
            if(confirm('Are you sure you want to clear all messages? This cannot be undone.')){
                chatHistory = [];
                localStorage.removeItem(STORAGE_KEY);
                chatMessages.innerHTML = '';
                appendMessage('bot', 'Chat cleared. Start a new conversation!', botName);
            }
        });
    }

    loadChatHistory();
    
    if(chatHistory.length === 0){
        appendMessage('bot', 'Hi! Ask me anything about F1 - drivers, teams, rules, or race info!', botName);
    }
});
