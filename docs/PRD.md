# PRD: ESHYFT nurse page, earnings-first

**Owner:** Joseph Fan · **Status:** concept, built and deployed ([live demo](https://josephfanpm.github.io/eshyft-landing-redesign/)) · Reasoning and sources: [CASE_STUDY.md](CASE_STUDY.md)

## Goal

Get CNAs, LPNs and RNs to install the nurse app by answering their first two questions on the first screen: what would I make, and is there work near me?

**Primary metric:** app-store click-through per visitor (proxy), then installs attributed through the Branch link. Full KPI list: [README](../README.md#success-metrics).

## Non-goals

- Facility acquisition (consults, agency-cost tools). Facility links stay in the footer.
- Showing real ESHYFT shifts, rates or partner facilities. This public version uses only public data.
- Account creation or sign-up on the web. The conversion is the app install.

## Requirements

| # | Requirement | Priority |
|---|---|---|
| R1 | Headline shows an estimated monthly earning for the visitor's shifts, city, license and shift length | Must |
| R2 | The estimate method, with the visitor's own numbers and the data source, is one tap from the number | Must |
| R3 | A map shows certified nursing homes within 15 miles of the selected city, without implying partnership | Must |
| R4 | One primary action, "Get the app", on every screen size | Must |
| R5 | Estimate state is shareable through the URL | Should |
| R6 | Every funnel interaction emits an analytics event | Should |
| R7 | WCAG AA contrast, keyboard access, reduced motion respected | Must |
| R8 | Mobile Lighthouse performance ≥ 90 | Should |

<!-- TODO(Joseph): R8's threshold is inferred from the measured 97, not from a documented target. Adjust or remove. -->

## User stories

### 1. Personalize the estimate (R1, R6)

```gherkin
Feature: Personal earnings estimate

  Scenario: First visit with no parameters
    Given a nurse opens the page with no query string
    Then the estimate uses Philadelphia, RN, 8-hour shifts and 20 shifts a month
    And the headline shows the monthly estimate as a whole-dollar amount

  Scenario: Changing shifts per month
    Given the nurse is on the page
    When they move the shifts slider to 12
    Then the headline updates to 12 × hours per shift × the estimated hourly rate
    And an "estimate_changed" event is sent once per page view

  Scenario: Changing city, license or shift length
    Given the nurse opens the location pill
    When they choose Pittsburgh, LPN and 12-hour shifts
    Then the headline, the hourly rate and the map update for Pittsburgh
    And a "location_changed" event is sent with the new city, role and hours
```

### 2. Check how the number is calculated (R2)

```gherkin
Feature: Estimate method

  Scenario: Opening the method
    Given the nurse sees an estimate for RN in Philadelphia at 20 eight-hour shifts
    When they tap "estimate earnings"
    Then a dialog shows the estimated hourly rate, hours per shift, shifts per month and the monthly total
    And it states the rate is estimated from BLS wage data for their metro
    And it states that estimates are before taxes, not guaranteed, and that facilities set their own rates
    And an "estimate_method_opened" event is sent
```

### 3. See work nearby (R3)

```gherkin
Feature: Nursing home map

  Scenario: Map for the selected city
    Given the nurse has selected a city
    Then the map centers on that city
    And it shows the count of nursing homes within 15 miles
    And about ten pins are labelled with their distance in miles
    And no pin shows a facility name or claims to be an ESHYFT partner

  Scenario: Opening a nursing home
    When the nurse taps a nursing home
    Then a card shows its bed count, CMS star rating and one shift's estimated pay for the selected license and shift length
    And a "map_home_opened" event is sent

  Scenario: Reduced motion
    Given the nurse's device prefers reduced motion
    When they change city
    Then the map jumps to the new city without the fly-to animation
```

### 4. Get the app (R4, R6)

```gherkin
Feature: Get the app

  Scenario: On a phone
    Given the nurse is on a phone-width screen
    Then a "Get the app" button is pinned to the bottom of the screen
    When they tap it on Android
    Then they go to ESHYFT's Google Play link
    When they tap it on any other phone
    Then they go to ESHYFT's App Store link

  Scenario: On a desktop
    Given the nurse is on a desktop
    When they click "Get the app" in the header
    Then a dialog shows a QR code for the app link and both store badges
    And a "get_app_clicked" event is sent with the location "header"
```

### 5. Share a local estimate (R5)

```gherkin
Feature: Shareable estimate

  Scenario: Opening a shared link
    Given a recruiter shares "?city=pittsburgh-pa&role=RN&shifts=12&hours=12"
    When a nurse opens it
    Then the estimate shows Pittsburgh, RN, 12 shifts and 12-hour shifts

  Scenario: Invalid parameters
    Given a link has an unknown city, an unknown role, shifts outside 0–30 or hours other than 8 or 12
    When a nurse opens it
    Then each invalid value falls back to its default
```

## Assumptions and open questions

| Item | Status |
|---|---|
| 15% per diem uplift on BLS staff medians | Product assumption; replace with ESHYFT's median posted rate ([§6](CASE_STUDY.md#6-the-earnings-estimate)) |
| 20 shifts is the right default | Untested; planned A/B against 4, 8 and 12 ([§11](CASE_STUDY.md#11-how-id-measure-it)) |
| An estimate lifts installs for nurses as it did for Airbnb hosts | Untested; planned A/B against the current hero |
| Esri demo tiles | Fine for a demo; production needs licensed tiles ([§12](CASE_STUDY.md#12-limitations-and-next-steps), [§13](CASE_STUDY.md#13-what-it-would-cost-on-google-maps-platform)) |
