/*
 * js/styles.js
 *
 * This script is part of the JavaScript interface used to interact with
 * the Google Play Music page, allowing custom styles to be applied.
 *
 * Created by Sajid Anwar.
 *
 * Subject to terms and conditions in LICENSE.md.
 *
 */

if (typeof window.Styles === 'undefined') {
    window.Styles = {
        appliedStyles: {},
        
        applyStyle: function(key, css) {
            if (Styles.appliedStyles[key]) {
                Styles.appliedStyles[key].disabled = false;
            }
            else {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = css;
                style.id = 'style-' + key;
                
                document.getElementsByTagName('head')[0].appendChild(style);
                Styles.appliedStyles[key] = style;
            }
        },
        
        disableStyle: function(key) {
            if (Styles.appliedStyles[key]) {
                Styles.appliedStyles[key].disabled = true;
            }
        },
        
        removeStyle: function(key) {
            if (Styles.appliedStyles[key] && Styles.appliedStyles[key].parentNode) {
                Styles.appliedStyles[key].parentNode.removeChild(Styles.appliedStyles[key]);
                delete Styles.appliedStyles[key];
            }
        },
        
        Callbacks: {
            onEnterFullScreen: function() {
                document.body.classList.add('full-screen');
            },
            onExitFullScreen: function() {
                document.body.classList.remove('full-screen');
            },
            onWindowDidBecomeActive: function() {
                document.body.classList.remove('inactive');
            },
            onWindowDidBecomeInactive: function() {
                document.body.classList.add('inactive');
            },
        }
    };
    
    // Apply a quick Safari fix.
    Object.defineProperty(document.querySelector('#material-hero-image').style, 'transform', {
        get: function() { return this.webkitTransform; },
        set: function(val) { this.webkitTransform = val; },
        enumerable: true,
        configurable: true
    });
}