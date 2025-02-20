module.exports = {
    simpleLoginInfo: {
        username: "fawwaz.ahmad",
        password: "cypress",
    },
    simpleTransaction: {
        contact: "Ted Parisian",
        amount: 100,
        note: "I owe money for Air force 1s",
        elementPathCss: "p[class *='MuiTypography-body2']",
        elementPathXpath: "//*[contains(text(),'Fawwaz Ahmad')]//ancestor::*[contains(@class,'MuiListItem-root')]//*[contains(@data-test,'transaction-amount')]",
    },
    simpleUserSettings: {
        email: "newEmail2@outlook.com",
        phoneNr: "9051112221",
    },
    simpleBankAccount: {
        bankName: "CIBC Bank",
        routingNum: "111111111", 
        accountNum: "2222222222",
        elementPathXpath: "//*[(text()='CIBC Bank')]"
    },
    simpleDates: {
        from: "2025-01-01",
        to: "2025-02-08",
        latestTransactionElPath: "//*[contains(@data-test, 'transaction-amount')]",
        latestTransactionExpVal: "$100.00"
    }
}