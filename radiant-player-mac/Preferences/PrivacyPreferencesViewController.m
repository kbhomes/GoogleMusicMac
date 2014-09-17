/*
 * PrivacyPreferencesViewController.m
 *
 * Created by Sajid Anwar.
 *
 * Subject to terms and conditions in LICENSE.md.
 *
 */

#import "PrivacyPreferencesViewController.h"
#import "../WebView/CookieStorage.h"

@implementation PrivacyPreferencesViewController

@synthesize useSafariCheckBox;
@synthesize saveCookiesCheckBox;
@synthesize removeCookiesButton;

- (IBAction)removeCookies:(id)sender
{
    [[CookieStorage instance] clearCookies];
    
    NSAlert *alert = [NSAlert alertWithMessageText:@"Success"
                                     defaultButton:@"OK"
                                   alternateButton:nil
                                       otherButton:nil
                         informativeTextWithFormat:@"Successfully cleared Radiant Player's cookies."];
    
    [alert beginSheetModalForWindow:self.view.window modalDelegate:nil didEndSelector:nil contextInfo:nil];
}

- (void)preferenceSaveCookiesChanged:(id)sender
{
    if ([sender isEqualTo:saveCookiesCheckBox])
    {
        if ([saveCookiesCheckBox state] == NSOnState)
        {
            NSAlert *alert = [NSAlert alertWithMessageText:@"Alert"
                                             defaultButton:@"OK"
                                           alternateButton:@"Cancel"
                                               otherButton:nil
                                 informativeTextWithFormat:@"You have chosen not to save cookies. Would you also like to clear all currently stored cookies?"];
            
            [alert beginSheetModalForWindow:self.view.window modalDelegate:self didEndSelector:@selector(preferenceChangedAlertDidEnd:returnCode:contextInfo:) contextInfo:nil];
        }
    }
}

- (void)preferenceChangedAlertDidEnd:(NSAlert *)alert returnCode:(NSInteger)returnCode contextInfo:(void *)contextInfo
{
    if (returnCode == NSAlertDefaultReturn)
    {
        [self removeCookies:alert];
    }
}

- (void)awakeFromNib
{
    if ([[NSHTTPCookieStorage sharedHTTPCookieStorage] respondsToSelector:@selector(_initWithCFHTTPCookieStorage:)] == NO)
    {
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"cookies.use-safari"];
        [[NSUserDefaults standardUserDefaults] synchronize];
        
        [useSafariCheckBox setState:NSOnState];
        [useSafariCheckBox setEnabled:NO];
        [saveCookiesCheckBox setEnabled:NO];
        [removeCookiesButton setEnabled:NO];
    }
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    return [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
}

- (NSString *)identifier
{
    return @"PrivacyPreferences";
}

- (NSImage *)toolbarItemImage
{
    return [NSImage imageNamed:NSImageNameUser];
}

- (NSString *)toolbarItemLabel
{
    return @"Privacy";
}

@end
