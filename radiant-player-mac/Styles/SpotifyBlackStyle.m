/*
 * SpotifyBlackStyle.m
 *
 * Created by Sajid Anwar.
 *
 * Subject to terms and conditions in LICENSE.md.
 *
 */

#import "SpotifyBlackStyle.h"

@implementation SpotifyBlackStyle

- (id)init
{
    if (self = [super init]) {
        [self setName:@"Black"];
        [self setAuthor:@"Anthony Barone"];
        [self setDescription:@"A deep black style."];
        [self setWindowColor:[NSColor colorWithSRGBRed:0.133f green:0.137f blue:0.149f alpha:1.0f]];
        [self setTitleColor:[NSColor colorWithDeviceWhite:0.7f alpha:1.0f]];
        [self setCss:[ApplicationStyle cssNamed:@"spotify-black"]];
        [self setJs:[ApplicationStyle jsNamed:@"spotify-black"]];
    }
    
    return self;
}

- (void)applyToWebView:(WebView *)webView window:(NSWindow *)window
{
    if (floor(NSAppKitVersionNumber) > NSAppKitVersionNumber10_9) {
        [ApplicationStyle applyYosemiteVisualEffects:webView window:window appearance:NSAppearanceNameVibrantDark];
        [self setCss:[NSString stringWithFormat:@"%@%@", [self css], [ApplicationStyle cssNamed:@"spotify-black-yosemite"]]];
    }
    
    [super applyToWebView:webView window:window];
}

@end
