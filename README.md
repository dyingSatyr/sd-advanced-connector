# sd-advanced-connector

### Skidata Advanced Connector Test Client Application

## Setup

App is running on nodejs backend with vuejs frontend.

```
npm run serve
```

in root dir

```
npm run dev
```

in server dir

## Supported Protocols

1. commands
2. common
3. configuration
4. counting (counting + counting management)
5. events
6. validations
7. cash levels

### Commands:

- todo

### Common:

- requestSupportedCommands
- requestSupportedProtocols

### Configuration

- requestArticles
- requestCarParks
- requestCountingAreas
- requestCountingCategories
- requestDeviceComponents
- requestDevices
- requestFacilityInformation
- requestRateCategories
- requestSections
- requestValidationProviders

### Counting

- triggerCounters

### Counting Management

- countCountingArea
- countCountingCategory
- manageCountingArea
- manageCountingCategory
- setCountingArea
- setCountingCategory

### Events

- triggerDeviceState

### Validations

- insertValidation
- updateValidation
- deleteValidation
- requestValidationsOfProvider
- requestValidationsOfTicket

### Cash Levels

- requestCashLevels

## Author

Boris Grabovac
