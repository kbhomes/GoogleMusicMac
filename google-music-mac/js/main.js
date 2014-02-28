/*
 * js/main.js
 *
 * This script is part of the JavaScript interface used to interact with
 * the Google Music page, in order to provide notifications functionality.
 *
 * Created by Sajid Anwar.
 *
 * Subject to terms and conditions in LICENSE.md.
 *
 */

// This check ensures that, even though this script is run multiple times, our code is only attached once.
if (typeof window.MusicAPI === 'undefined') {
    window.MusicAPI = {};

    /* Create a volume API. */
    window.MusicAPI.Volume = {

        // A reference to the volume slider element.
        slider: document.querySelector('#vslider'),

        // Get the current volume level.
        getVolume: function() {
            return parseInt(window.MusicAPI.Volume.slider.getAttribute('aria-valuenow'));
        },

        // Set the volume level (0 - 100).
        setVolume: function(vol) {
            var current = window.MusicAPI.Volume.getVolume();

            if (vol > current) {
                window.MusicAPI.Volume.increaseVolume(vol - current);
            }
            else if (vol < current) {
                window.MusicAPI.Volume.decreaseVolume(current - vol);
            }
        },

        // Increase the volume by an amount (default of 1).
        increaseVolume: function(amount) {
            if (typeof amount === 'undefined') 
                amount = 1;

            for (var i = 0; i < amount; i++) {
                window.Keyboard.sendKey(window.MusicAPI.Volume.slider, window.Keyboard.KEY_UP);
            }
        },

        // Decrease the volume by an amount (default of 1).
        decreaseVolume: function(amount) {
            if (typeof amount === 'undefined') 
                amount = 1;

            for (var i = 0; i < amount; i++) {
                window.Keyboard.sendKey(window.MusicAPI.Volume.slider, window.Keyboard.KEY_DOWN);
            }
        }
    };

    /* Create a playback API. */
    window.MusicAPI.Playback = {

        // References to the media playback elements.
        _eplayPause:  document.querySelector('button[data-id="play-pause"]'),
        _eforward:    document.querySelector('button[data-id="forward"]'),
        _erewind:     document.querySelector('button[data-id="rewind"]'),
        _eshuffle:    document.querySelector('button[data-id="shuffle"]'),
        _erepeat:     document.querySelector('button[data-id="repeat"]'),

        // Repeat modes.
        LIST_REPEAT:    'LIST_REPEAT',
        SINGLE_REPEAT:  'SINGLE_REPEAT',
        NO_REPEAT:      'NO_REPEAT',

        // Shuffle modes.
        ALL_SHUFFLE:    'ALL_SHUFFLE',
        NO_SHUFFLE:     'NO_SHUFFLE',

        // Playback functions.
        playPause:      function() { MusicAPI.Playback._eplayPause.click(); },
        forward:        function() { MusicAPI.Playback._eforward.click(); },
        rewind:         function() { MusicAPI.Playback._erewind.click(); },

        getShuffle:     function() { return MusicAPI.Playback._eshuffle.value; }, 
        toggleShuffle:  function() { MusicAPI.Playback._eshuffle.click(); },

        getRepeat:      function() {
            return MusicAPI.Playback._erepeat.value;
        },

        changeRepeat:   function(mode) { 
            if (!mode) {
                // Toggle between repeat modes once.
                MusicAPI.Playback._erepeat.click(); 
            }
            else {
                // Toggle between repeat modes until the desired mode is activated.
                while (MusicAPI.Playback.getRepeat() !== mode) {
                    MusicAPI.Playback._erepeat.click();
                }
            }
        },

        // Taken from the Google Music page.
        toggleVisualization: function() {
            SJBpost('toggleVisualization');
        }

    };

    /* Create a rating API. */
    window.MusicAPI.Rating = {

        // Get current rating.
        getRating: function() {
            var el = document.querySelector('.player-rating-container li.selected');

            if (el) {
                return el.value;
            }
            else {
                return 0;
            }
        },

        // Thumbs up.
        toggleThumbsUp: function() {
            var el = document.querySelector('.player-rating-container li[data-rating="5"]');

            if (el)
                el.click();
        },

        // Thumbs down.
        toggleThumbsDown: function() {
            var el = document.querySelector('.player-rating-container li[data-rating="1"]');

            if (el)
                el.click();
        }
    };

    var lastTitle = "";
    var lastArtist = "";
    var lastAlbum = "";

    /* Convert a time string like "01:24" to seconds. From https://github.com/cgravolet/scroblr/blob/master/src/js/scroblr-injection.js */
    function calculateDuration(timestring) {
        var i, j, max, pow, seconds, timeSegments;
        if (!timestring) {
            return 0;
        }
        seconds = 0;
        for (i = 0, max = arguments.length; i < max; i += 1) {
            if (arguments[i].toString()) {
                timeSegments = arguments[i].split(":");
                for (j = timeSegments.length - 1, pow = 0;
                     j >= 0 && j >= (timeSegments.length - 3);
                     j -= 1, pow += 1) {
                    seconds += parseFloat(timeSegments[j].replace("-", "")) *
                    Math.pow(60, pow);
                }
            }
        }
        return seconds;
    }
    
    var addObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            for (var i = 0; i < m.addedNodes.length; i++) {
                var target = m.addedNodes[i];
                var name = target.id || target.className;

                if (name == 'text-wrapper')  {
                    var now = new Date();

                    var title = document.querySelector('#playerSongTitle');
                    var artist = document.querySelector('#player-artist');
                    var album = document.querySelector('.player-album');
                    var art = document.querySelector('#playingAlbumArt');
                    var duration = calculateDuration(document.querySelector('#time_container_duration').textContent || '');

                    title = (title) ? title.innerText : 'Unknown';
                    artist = (artist) ? artist.innerText : 'Unknown';
                    album = (album) ? album.innerText : 'Unknown';
                    art = (art) ? art.src : null;

                    // The art may be a protocol-relative URL, so normalize it to HTTPS.
                    if (art && art.slice(0, 2) === '//') {
                        art = 'https:' + art;
                    }

                    // Make sure that this is the first of the notifications for the
                    // insertion of the song information elements.
                    if (lastTitle != title || lastArtist != artist || lastAlbum != album) {
                        window.googleMusicApp.notifySong(title, artist, album, art, duration);

                        lastTitle = title;
                        lastArtist = artist;
                        lastAlbum = album;
                    }
                }
            }
        });
    });

    addObserver.observe(document.querySelector('#playerSongInfo'), { childList: true, subtree: true });
}