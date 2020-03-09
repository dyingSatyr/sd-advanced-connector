// Complex types

let genericIdentification = [
  "p3:TicketType", //  0 = SKIDATA™ ticket | 1 = Credit card | 2 = Unknown | 3 = Electronic purse | 4 = External card system
  "p3:CardKey",
  "p3:CardCompany",
  "p3:CreditCardExpiryDate",
  "p3:MediaType" //0 = Barcode | 1 = Magnetic ticket | 2 = Keycard | 3 = Smartcard | 4 = Optical | 5 = Tag | 6 = License plate | 7 = External reader | 8 = Standard
];

// let barcodeIdentification = [
//   "p3:BarcodeType", //0 = Interleaved 2Of5 | 1 = EAN | 2 = Code 39 | 3 = Code 128 | 4 = DataMatrix 2D | 5 = QR | 6 = PDF 417 | 7 = Aztec
//   "p3:Barcode"
// ];

// let licensePlateIdentification = [
//   "PlateNo",
//   "Country",
//   "Province",
//   "Type" //number depends on the LPR-system
// ];

let validation = [
  "type", //0..TimeValue, 1..CashValue, 2..Percentage, 3..FlatRatePayment, 4..Rate, 5..CashValueExtraCharge, 6..PercentageExtraCharge , 7..PaidUntil, 8..BonusTime
  "value", //Contains the value for all types except paid until. Range time value: 1 – 999 (time in minutes). Range cash value: 1 – 99999.99 (amount). Range percentage: 1 – 100 (no decimals). Range rate: 1-99 (must be a valid rate number).
  "valueDateTime" //Contains the value for type paid until. 1900-01-01T01:01:01+01:00
];

// Data
export default {
  protocols: [
    {
      id: 1,
      name: "common"
    },
    {
      id: 2,
      name: "configuration"
    },
    {
      id: 3,
      name: "counting"
    },
    { id: 4, name: "countingmanagement" },
    {
      id: 5,
      name: "events"
    },
    {
      id: 6,
      name: "commands"
    },
    {
      id: 7,
      name: "cashlevels"
    },
    {
      id: 8,
      name: "validations"
    }
  ],
  commands: [
    [
      {
        id: 1,
        name: "requestSupportedCommands"
      },
      {
        id: 2,
        name: "requestSupportedProtocols"
      }
    ],
    [
      {
        id: 1,
        name: "requestCarParks"
      },
      {
        id: 2,
        name: "requestCountingAreas"
      },
      {
        id: 3,
        name: "requestCountingCategories"
      },
      {
        id: 4,
        name: "requestDeviceComponents",
        mandatory: ["deviceId"]
      },
      {
        id: 5,
        name: "requestDevices"
      },
      {
        id: 6,
        name: "requestFacilityInformation"
      },
      {
        id: 7,
        name: "requestSections"
      },
      {
        id: 8,
        name: "requestArticles"
      },
      {
        id: 9,
        name: "requestRateCategories"
      },
      {
        id: 10,
        name: "requestValidationProviders"
      }
    ],
    [
      {
        id: 1,
        name: "triggerCounters"
      }
    ],
    [
      {
        id: 1,
        name: "countCountingArea",
        mandatory: ["carParkId", "countingAreaId", "value"]
      },
      {
        id: 2,
        name: "countCountingCategory",
        mandatory: ["carParkId", "countingCategoryId", "value"]
      },
      {
        id: 3,
        name: "manageCountingArea",
        mandatory: [
          "carParkId",
          "countingAreaId",
          "capacity",
          "occupancyLimit",
          "freeLimit"
        ]
      },
      {
        id: 4,
        name: "manageCountingCategory",
        mandatory: [
          "carParkId",
          "countingCategoryId",
          "capacity",
          "occupancyLimit",
          "freeLimit"
        ]
      },
      {
        id: 5,
        name: "setCountingArea",
        mandatory: ["carParkId", "countingAreaId", "level", "trafficSignalMode"]
      },
      {
        id: 6,
        name: "setCountingCategory",
        mandatory: [
          "carParkId",
          "countingCategoryId",
          "level",
          "trafficSignalMode",
          "externalCounting"
        ]
      }
    ],
    [
      {
        id: 1,
        name: "triggerDeviceState",
        mandatory: ["deviceId"]
      }
    ],
    [
      {
        id: 1,
        name: "carParkActivateEventMode",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 2,
        name: "carParkActivateExtendedExitGracePeriod",
        mandatory: ["carParkId", "justification"],
        optional: ["gracePeriod"]
      },
      {
        id: 3,
        name: "carParkAutomaticOpenActivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 4,
        name: "carParkAutomaticOpenDeactivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 5,
        name: "carParkDeactivateEventMode",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 6,
        name: "carParkDeactivateExtendedExitGracePeriod",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 7,
        name: "carParkFireDepartmentKeepLockedActivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 8,
        name: "carParkFireDepartmentKeepLockedDeactivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 9,
        name: "carParkKeepClosedActivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 10,
        name: "carParkKeepClosedDeactivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 11,
        name: "carParkKeepLockedActivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 12,
        name: "carParkKeepLockedDeactivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 13,
        name: "carParkKeepOpenActivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 14,
        name: "carParkKeepOpenDeactivate",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 15,
        name: "carParkSectionTransactionNeutral",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 16,
        name: "carParkTransactionNeutral",
        mandatory: ["carParkId", "justification"]
      },
      {
        id: 17,
        name: "deviceActivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 18,
        name: "deviceActivateCardViaLicensePlate",
        mandatory: [
          "deviceId",
          "justification",
          "PlateNo",
          "Country",
          "Province",
          "Type"
        ]
      },
      {
        id: 19,
        name: "deviceActivateEventMode",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 20,
        name: "deviceActivateExtendedExitGracePeriod",
        mandatory: ["deviceId", "justification"],
        optional: ["gracePeriod"]
      },
      {
        id: 21,
        name: "deviceActivateLicensePlateRecognition",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 22,
        name: "deviceActivateLostTicketWithFixedPrice",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 23,
        name: "deviceActivateLostTicketWithVariablePrice",
        mandatory: ["deviceId", "justification", "price"]
      },
      {
        id: 24,
        name: "deviceActivateNILPayment",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 25,
        name: "deviceActivateOperatorVideo",
        mandatory: [
          "deviceId",
          "justification",
          "url",
          "user",
          "password",
          "cameraType",
          "rotation",
          "caching"
        ]
      },
      {
        id: 26,
        name: "deviceActivateRespite",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 27,
        name: "deviceActivateVariableSubstituteTicket",
        mandatory: ["deviceId", "justification", "dateTime"]
      },
      {
        id: 28,
        name: "deviceAutomaticOpenActivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 29,
        name: "deviceAutomaticOpenDeactivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 30,
        name: "deviceCashUpTerminal",
        mandatory: ["deviceId", "justification", "terminalType"]
      },
      {
        id: 31,
        name: "deviceCreateLicensePlateParkingTransaction",
        mandatory: [
          "deviceId",
          "justification",
          "plateNo",
          "Country",
          "Province",
          "Type",
          "carParkId",
          "entryDateTime"
        ]
      },
      {
        id: 32,
        name: "deviceDeactivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 33,
        name: "deviceDeactivateEventMode",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 34,
        name: "deviceDeactivateExtendedExitGracePeriod",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 35,
        name: "deviceDeactivateLicensePlateRecognition",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 36,
        name: "deviceDeactivateOperatorVideo",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 37,
        name: "deviceDisableTicketIssuingMode",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 38,
        name: "deviceDoorKeepOpenActivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 39,
        name: "deviceDoorKeepOpenDeactivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 40,
        name: "deviceDoorManualOpen",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 41,
        name: "deviceEnableTicketIssuingMode",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 42,
        name: "deviceEndOfDayFiscal",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 43,
        name: "deviceIgnoreQuotaOnNextTransaction",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 44,
        name: "deviceInitiateLicensePlateEntryTransaction",
        mandatory: [
          "deviceId",
          "justification",
          "PlateNo",
          "Country",
          "Province",
          "Type"
        ]
      },
      {
        id: 45,
        name: "deviceInitiateLicensePlatePaymentTransaction",
        mandatory: [
          "deviceId",
          "justification",
          "PlateNo",
          "Country",
          "Province",
          "Type"
        ]
      },
      {
        id: 46,
        name: "deviceKeepLockedActivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 47,
        name: "deviceKeepLockedDeactivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 48,
        name: "deviceKeepOpenActivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 49,
        name: "deviceKeepOpenDeactivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 50,
        name: "deviceManualOpen",
        mandatory: ["deviceId", "justification"],
        optional: ["countingCategoryId"]
      },
      {
        id: 51,
        name: "deviceNextCardNeutral",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 52,
        name: "deviceProduceEntranceTicket",
        mandatory: ["deviceId", "justification", "articleId"]
      },
      {
        id: 53,
        name: "deviceProduceShortParkTicket",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 54,
        name: "deviceRemoteValidation",
        mandatory: ["deviceId", "justification", "validationProviderId"]
      },
      {
        id: 55,
        name: "deviceRestart",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 56,
        name: "deviceReversibleLaneActivateEntry",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 57,
        name: "deviceReversibleLaneActivateExit",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 58,
        name: "deviceShutDown",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 59,
        name: "deviceTerminateSecurityAlarm",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 60,
        name: "deviceTrafficJamModeActivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 61,
        name: "deviceTrafficJamModeDeactivate",
        mandatory: ["deviceId", "justification"]
      },
      {
        id: 62,
        name: "deviceUnlockTerminal",
        mandatory: ["deviceId", "justification", "terminalType"]
      },
      {
        id: 63,
        name: "requestSupportedCarParkCommands",
        mandatory: ["carParkId"]
      },
      {
        id: 64,
        name: "requestSupportedDeviceCommands",
        mandatory: ["deviceId"]
      }
    ],
    [
      {
        id: 1,
        name: "requestCashLevels",
        mandatory: ["deviceId"]
      }
    ],
    [
      {
        id: 1,
        name: "deleteValidation",
        mandatory: [genericIdentification, "validationProviderId", "dateTime"]
      },
      {
        id: 2,
        name: "insertValidation",
        mandatory: [
          "validationProviderId",
          "dateTime",
          "presenceRequired",
          "externalValidationId",
          "expirationDateTime"
        ],
        complex: [
          { name: "identification", fields: genericIdentification },
          { name: "validation", fields: validation }
        ]
      },
      {
        id: 3,
        name: "requestValidationsOfProvider",
        mandatory: ["validationProviderId"]
      },
      {
        id: 4,
        name: "requestValidationsOfTicket",
        mandatory: [genericIdentification]
      },
      {
        id: 5,
        name: "updateValidation",
        mandatory: [
          genericIdentification,
          "validationProviderId",
          "dateTime",
          "presenceRequired",
          "externalValidationId",
          validation,
          "expirationDateTime"
        ]
      }
    ]
  ]
};
