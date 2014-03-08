/*
 * js/navigation.js
 *
 * This script is part of the JavaScript interface used to interact with
 * the Google Music page, adding back and forward buttons to the page.
 *
 * Created by Sajid Anwar.
 *
 * Subject to terms and conditions in LICENSE.md.
 *
 */

// This check ensures that, even though this script is run multiple times, our code is only attached once.
if (typeof window.GMNavigation === 'undefined') {
    window.GMNavigation = true;
    
    var logoContainer = document.querySelector('#oneGoogleWrapper > div:first-child > div:first-child > div:nth-child(2) > div:first-child');
    
    // Remove the width constraints of the parent element.
    logoContainer.parentNode.style.cssText = '';
    
    // Make room for the forward and backward button.
    logoContainer.parentNode.style.width = "310px"
    
    // Change the styles of the sibling elements of the logo.
    document.querySelector('#oneGoogleWrapper > div:first-child > div:first-child > div:nth-child(1)').style.webkitFlexGrow = 0;
    document.querySelector('#oneGoogleWrapper > div:first-child > div:first-child > div:nth-child(3)').style.webkitFlexGrow = 1;
    
    // Create back and forward buttons.
    var backButton = document.createElement('button');
    backButton.className = 'gm-nav-button';
    backButton.title = 'Back';
    backButton.id = 'gm-back';
    backButton.addEventListener('click', function() { window.history.back(); });
    
    var forwardButton = document.createElement('button');
    forwardButton.className = 'gm-nav-button';
    forwardButton.title = 'Forward';
    forwardButton.id = 'gm-forward';
    forwardButton.addEventListener('click', function() { window.history.forward(); });
    
    // Add the back and forward buttons.
    logoContainer.appendChild(backButton);
    logoContainer.appendChild(forwardButton);
}