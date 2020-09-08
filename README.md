# sd-advanced-connector

### Skidata Advanced Connector Test Client Application

## Setup

App is running on nodejs backend with vuejs frontend.

To run both apps execute the following command in application root directory:

```
npm run app
```

## Supported Protocols

1. commands
2. common
3. configuration
4. counting (counting + counting management)
5. events
6. validations
7. cash levels
8. transaction history

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

### Transaction History

- requestTransactionHistory

### Transaction Management

- requestParkingTransaction
- updateParkingTransaction
- manualEntry
- manualExit
- manualTransfer

## Author

Boris Grabovac
