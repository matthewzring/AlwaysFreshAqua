document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    let waterCount = 0;
    let bottlesPerClick = 1;
    let factoryUpgrades = 0;
    let robotWorkers = 0;
    let bottlesPerSecond = 0;
    let robotWorkerTimer; // Variable to store the timer reference

    const clickCountDisplay = document.getElementById('click-count');
    const waterCountDisplay = document.getElementById('water-count');
    const bottlesPerClickDisplay = document.getElementById('bottles-per-click');
    const robotsCountDisplay = document.getElementById('robots-count');
    const bottlesPerSecondDisplay = document.getElementById('bottles-per-second');
    const factoryUpgradePriceDisplay = document.getElementById('factory-upgrade-price');
    const robotWorkerPriceDisplay = document.getElementById('robot-worker-price');
    const quantumDuplicatorPriceDisplay = document.getElementById('quantum-duplicator-price');
    const celestialAquiferPriceDisplay = document.getElementById('celestial-aquifer-price');

    const waterContainer = document.getElementById('water-container');
    const buyFactoryUpgradeButton = document.getElementById('buy-factory-upgrade');
    const buyRobotWorkerButton = document.getElementById('buy-robot-worker');
    const celestialAquiferButton = document.getElementById('buy-celestial-aquifer');
    const quantumDuplicatorButton = document.getElementById('buy-quantum-duplicator');

    waterContainer.addEventListener('click', function() {
        incrementWaterCount();
    });

    buyFactoryUpgradeButton.addEventListener('click', function() {
        buyFactoryUpgrade();
    });

    buyRobotWorkerButton.addEventListener('click', function() {
        buyRobotWorker();
    });

    quantumDuplicatorButton.addEventListener('click', function() {
        buyQuantumDuplicator();
    });

    celestialAquiferButton.addEventListener('click', function() {
        buyCelestialAquifer();
    });

    function incrementWaterCount() {
        waterCount += bottlesPerClick;
        clickCount++;
        updateCounts();
    }

    function updateCounts() {
        clickCountDisplay.textContent = 'Clicks: ' + clickCount;
        waterCountDisplay.textContent = 'Water: ' + waterCount;
        bottlesPerClickDisplay.textContent = 'Bottles per Click: ' + bottlesPerClick;
        robotsCountDisplay.textContent = 'Robots: ' + robotWorkers;
        bottlesPerSecondDisplay.textContent = 'Bottles per Second: ' + bottlesPerSecond;
        factoryUpgradePriceDisplay.textContent = 'Price: ' + calculateFactoryUpgradePrice();
        robotWorkerPriceDisplay.textContent = 'Price: ' + calculateRobotWorkerPrice();
        quantumDuplicatorPriceDisplay.textContent = 'Price: ' + calculateQuantumDuplicatorPrice();
        celestialAquiferPriceDisplay.textContent = 'Price: ' + calculateCelestialAquiferPrice();

        // Save data to local storage
        saveData();
    }

    function calculateFactoryUpgradePrice() {
        return 5 * Math.pow(2, factoryUpgrades);
    }

    function calculateRobotWorkerPrice() {
        return 20 + (50 * robotWorkers);
    }

    function calculateQuantumDuplicatorPrice() {
        // Set a ridiculously high price
        return 1000000;
    }

    function calculateCelestialAquiferPrice() {
        const basePrice = 50000000;
        return Math.max(basePrice, waterCount + 1);
    }

    function buyFactoryUpgrade() {
        const upgradeCost = calculateFactoryUpgradePrice();
        if (waterCount >= upgradeCost && bottlesPerClick < 10) {
            waterCount -= upgradeCost;
            bottlesPerClick++;
            factoryUpgrades++;
            updateCounts();
        } else {
            alert('Not enough water bottles or maximum upgrades reached!');
        }
    }

    function buyRobotWorker() {
        const workerCost = calculateRobotWorkerPrice();
        if (waterCount >= workerCost) {
            waterCount -= workerCost;
            robotWorkers++;
            bottlesPerSecond += 1;
            updateCounts();
            startRobotWorkerTimer();
        } else {
            alert('Not enough water bottles!');
        }
    }

    function startRobotWorkerTimer() {
        if (!robotWorkerTimer) {
            robotWorkerTimer = setInterval(function() {
                waterCount += bottlesPerSecond;
                updateCounts();
            }, 1000);
        }
    }

    function buyQuantumDuplicator() {
        const duplicatorCost = calculateQuantumDuplicatorPrice();
        if (waterCount >= duplicatorCost) {
            waterCount -= duplicatorCost;
            bottlesPerClick *= 1000; // Adjust the multiplier as needed
            updateCounts();
        } else {
            alert('Not enough water bottles!');
        }
    }

    function buyCelestialAquifer() {
        const aquiferCost = calculateCelestialAquiferPrice();
        if (waterCount >= aquiferCost) {
            waterCount -= aquiferCost;
            bottlesPerClick = Infinity; // Infinite water bottles per click
            updateCounts();
        } else {
            alert('Not enough water bottles!');
        }
    }

    function saveData() {
        // Save data to local storage
        localStorage.setItem('clickCount', clickCount.toString());
        localStorage.setItem('waterCount', waterCount.toString());
        localStorage.setItem('bottlesPerClick', bottlesPerClick.toString());
        localStorage.setItem('factoryUpgrades', factoryUpgrades.toString());
        localStorage.setItem('robotWorkers', robotWorkers.toString());
        localStorage.setItem('bottlesPerSecond', bottlesPerSecond.toString());
    }

    function loadData() {
        // Load data from local storage
        clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
        waterCount = parseInt(localStorage.getItem('waterCount')) || 0;
        bottlesPerClick = parseInt(localStorage.getItem('bottlesPerClick')) || 1;
        factoryUpgrades = parseInt(localStorage.getItem('factoryUpgrades')) || 0;
        robotWorkers = parseInt(localStorage.getItem('robotWorkers')) || 0;
        bottlesPerSecond = parseInt(localStorage.getItem('bottlesPerSecond')) || 0;

        // Update the display with the loaded data
        updateCounts();

        // Start the robot worker timer if there are robots
        if (robotWorkers > 0) {
            startRobotWorkerTimer();
        }
    }

    const resetStatsButton = document.getElementById('reset-stats');

    resetStatsButton.addEventListener('click', function() {
        // Confirm the reset with the user
        const confirmReset = confirm("Are you sure you want to reset your stats? This action cannot be undone.");

        if (confirmReset) {
            // Reset all stats
            clickCount = 0;
            waterCount = 0;
            bottlesPerClick = 1;
            factoryUpgrades = 0;
            robotWorkers = 0;
            bottlesPerSecond = 0;

            // Clear local storage
            localStorage.clear();

            // Stop and clear the robot worker timer
            clearInterval(robotWorkerTimer);
            robotWorkerTimer = null;

            // Update the display
            updateCounts();
        }
    });

    // Load data when the page is loaded
    loadData();
});
